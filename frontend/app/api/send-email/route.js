import { Resend } from "resend";
import ContactFormEmail from "@/templates/emails/contact-form";
import ReportFormEmail from "@/templates/emails/report-form";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const body = await req.json();
        const { type } = body;

        if (type === 'report') {
            const { name, email, pdfBuffer } = body;
            
            if (!name || !email || !pdfBuffer) {
                return new Response(
                    JSON.stringify({ 
                        success: false, 
                        message: "Name, email and PDF are required" 
                    }),
                    { status: 400 }
                );
            }

            if (!/^[A-Za-z0-9+/=]+$/.test(pdfBuffer)) {
                return new Response(
                    JSON.stringify({ 
                        success: false, 
                        message: "Invalid PDF format" 
                    }),
                    { status: 400 }
                );
            }

            try {
                const result = await resend.emails.send({
                    from: "STEM@parthsolanke.in",
                    to: [email],
                    subject: "Your STEM Profile Analysis Report",
                    react: ReportFormEmail({ name, email }),
                    attachments: [
                        {
                            filename: 'stem-profile-report.pdf',
                            content: pdfBuffer,
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
