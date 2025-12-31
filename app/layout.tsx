import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Podemos trocar Outfit por uma serifada se quiser mais elegância
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";

const inter = Inter({
    subsets: ["latin"],
    variable: '--font-inter',
    display: 'swap',
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: '--font-outfit',
    display: 'swap',
});

export const metadata: Metadata = {
    title: "Multicor | Visual Communication",
    description: "Transformando espaços e marcas com excelência visual.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" className={`${inter.variable} ${outfit.variable}`}>
            <body className={inter.className}>
                <CustomCursor />
                <Navbar />
                <SmoothScroll>
                    {children}
                </SmoothScroll>
            </body>
        </html>
    );
}
