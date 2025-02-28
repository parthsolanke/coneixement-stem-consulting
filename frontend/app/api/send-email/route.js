import { Resend } from "resend";
import ContactFormEmail from "@/templates/emails/contact-form";
import ReportFormEmail from "@/templates/emails/report-form";

const resend = new Resend(process.env.RESEND_API_KEY);

const chunksStorage = new Map();

export async function POST(req) {
    try {
        const body = await req.json();
        const { type } = body;

        if (type === 'report') {
            const { name, email, pdfChunk, chunkIndex, totalChunks, uploadId, finalizeUpload } = body;

            if (!name || !email) {
                return new Response(
                    JSON.stringify({ 
                        success: false, 
                        message: "Name and email are required" 
                    }),
                    { status: 400 }
                );
            }

            // Handle chunk storage
            if (pdfChunk && uploadId) {
                if (!chunksStorage.has(uploadId)) {
                    chunksStorage.set(uploadId, new Map());
                }
                chunksStorage.get(uploadId).set(chunkIndex, pdfChunk);

                return new Response(
                    JSON.stringify({ 
                        success: true, 
                        message: `Chunk ${chunkIndex + 1}/${totalChunks} received` 
                    }),
                    { status: 200 }
                );
            }

            // Handle final email send
            if (finalizeUpload && uploadId) {
                const chunks = chunksStorage.get(uploadId);
                if (!chunks) {
                    return new Response(
                        JSON.stringify({ 
                            success: false, 
                            message: "Upload session expired or not found" 
                        }),
                        { status: 400 }
                    );
                }

                // Combine chunks in correct order
                const sortedChunks = Array.from(chunks.entries())
                    .sort(([a], [b]) => a - b)
                    .map(([_, chunk]) => chunk);
                const fullPdfBuffer = sortedChunks.join('');

                // Clean up chunks
                chunksStorage.delete(uploadId);

                // Send email with complete PDF
                try {
                    const result = await resend.emails.send({
                        from: "STEM@parthsolanke.in",
                        to: [email],
                        subject: "Your STEM Profile Analysis Report",
                        react: ReportFormEmail({ name, email }),
                        attachments: [
                            {
                                filename: 'stem-profile-report.pdf',
                                content: fullPdfBuffer,
                                encoding: 'base64'
                            }
                        ]
                    });

                    if ('error' in result && result.error) {
                        const error = result.error;
                        const status = (error?.statusCode || 500);
                        let message = 'Failed to send email';

                        if (error?.statusCode) {
                            switch (error.statusCode) {
                                case 401:
                                    message = 'Authentication failed. Please check API key.';
                                    break;
                                case 403:
                                    message = 'Domain not verified. Please verify your domain first.';
                                    break;
                                case 429:
                                    message = 'Too many requests. Please try again later.';
                                    break;
                                default:
                                    message = error.message || message;
                            }
                        } else {
                            message = error.message || message;
                        }

                        if (process.env.NODE_ENV === 'development') {
                            console.error('Resend API error:', error);
                        }

                        return new Response(
                            JSON.stringify({ success: false, message }),
                            { status }
                        );
                    }

                    if (result.data?.id) {
                        return new Response(
                            JSON.stringify({ 
                                success: true, 
                                message: "Email sent successfully!" 
                            }), 
                            { status: 200 }
                        );
                    }

                    return new Response(
                        JSON.stringify({ 
                            success: false, 
                            message: "Failed to send email. Please try again later." 
                        }), 
                        { status: 500 }
                    );

                } catch (error) {
                    if (process.env.NODE_ENV === 'development') {
                        console.error('Email sending error:', error);
                    }
                    return new Response(
                        JSON.stringify({ 
                            success: false, 
                            message: error instanceof Error ? error.message : 'Unknown error occurred'
                        }), 
                        { status: 500 }
                    );
                }
            }

        } else {
            const { name, email, message } = body;

            if (!name || !email || !message) {
                return new Response(
                    JSON.stringify({ 
                        success: false, 
                        message: "All fields are required" 
                    }),
                    { status: 400 }
                );
            }

            const result = await resend.emails.send({
                from: "STEM@parthsolanke.in",
                to: ["parthsolanke.cipl@gmail.com", "devennandapurkarcipl@gmail.com"],
                subject: `${name} wants to contact you`,
                react: ContactFormEmail({ name, email, message })
            });

            if ('error' in result && result.error) {
                const error = result.error;
                const status = (error?.statusCode || 500);
                let message = 'Failed to send email';

                if (error?.statusCode) {
                    switch (error.statusCode) {
                        case 401:
                            message = 'Authentication failed. Please check API key.';
                            break;
                        case 403:
                            message = 'Domain not verified. Please verify your domain first.';
                            break;
                        case 429:
                            message = 'Too many requests. Please try again later.';
                            break;
                        default:
                            message = error.message || message;
                    }
                } else {
                    message = error.message || message;
                }

                if (process.env.NODE_ENV === 'development') {
                    console.error('Resend API error:', error);
                }

                return new Response(
                    JSON.stringify({ success: false, message }),
                    { status }
                );
            }

            if (result.data?.id) {
                return new Response(
                    JSON.stringify({ 
                        success: true, 
                        message: "Email sent successfully!" 
                    }), 
                    { status: 200 }
                );
            }

            return new Response(
                JSON.stringify({ 
                    success: false, 
                    message: "Failed to send email. Please try again later." 
                }), 
                { status: 500 }
            );
        }

    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Email sending error:', error);
        }
        return new Response(
            JSON.stringify({ 
                success: false, 
                message: error instanceof Error ? error.message : 'Unknown error occurred'
            }), 
            { status: 500 }
        );
    }
}
