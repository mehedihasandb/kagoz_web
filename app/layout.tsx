import type { Metadata } from "next";
import { Geist, Geist_Mono, Monda, Graduate, Quantico} from "next/font/google";
import "./globals.css";
import "./styles/mainLayout.css";
import Footer from "@/components/Footer";
import { ReduxProvider } from "./provider";
import { ToastContainer } from "react-toastify";
import WithClientOnly from "@/hoc/WithClientOnly";
import { UIHost } from "@/ui/uiHost";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const monda = Monda({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-monda",
  display: "swap",
});

const graduate = Graduate({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-graduate",
  display: "swap",
});

const quantico = Quantico({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-quantico",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kagoz.net",
  description: "Welcome to Kagoz.net",
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"
    className={`${monda.variable} ${graduate.variable} ${quantico.variable}`}
    >
      {/* <head>
      <link href="https://fonts.googleapis.com/css2?family=Graduate&family=Monda:wght@400..700&family=Quantico:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"/>
      </head> */}
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white min-h-screen flex flex-col`}
      >
        <ReduxProvider>
          <main className="flex-grow">{children} {<UIHost/>}</main>
          <Footer />
          <ToastContainer />
        </ReduxProvider>
      </body>
    </html>
  );
}
