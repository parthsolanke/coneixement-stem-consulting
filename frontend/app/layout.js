import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { PostHogProvider } from "./Components/PostHogProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Coneixement STEM Consulting",
  description: "Professional STEM consulting services for your business needs",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${poppins.variable}`}> 
        <body className="min-h-screen bg-white text-gray-900 antialiased">
          <PostHogProvider>
            <div className="flex min-h-screen flex-col">
              {children}
            </div>
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
