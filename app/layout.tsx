import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Online Shop",
  description: "Best Online Shop Ever",
  icons: {
    icon: "/favicon.png",
  },
};
const iranYekan = localFont({
  src: [
    { path: './fonts/IRANYekanThin.ttf', weight: '100', style: 'normal' },
    { path: './fonts/IRANYekanLight.ttf', weight: '300', style: 'normal' },
    { path: './fonts/IRANYekanRegular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/IRANYekanMedium.ttf', weight: '500', style: 'normal' },
    { path: './fonts/IRANYekanBold.ttf', weight: '700', style: 'normal' },
    { path: './fonts/IRANYekanExtraBold.ttf', weight: '800', style: 'normal' },
    { path: './fonts/IRANYekanBlack.ttf', weight: '900', style: 'normal' },
    { path: './fonts/IRANYekanExtraBlack.ttf', weight: '950', style: 'normal' },
  ],
  variable: '--font-iranyekan',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${iranYekan.variable} font-sans  bg-bg-main text-text-main antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}