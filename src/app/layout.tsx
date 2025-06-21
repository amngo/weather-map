import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter, Orbitron, Outfit } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/lib/QueryProvider';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

const orbitron = Orbitron({
    variable: '--font-orbitron',
    subsets: ['latin'],
});

const outfit = Outfit({
    variable: '--font-outfit',
    subsets: ['latin'],
});

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Weather Map',
    description: 'An interactive weather map application',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${outfit.variable} ${inter.variable} antialiased dark`}
            >
                <main className="mx-auto relative h-full">
                    <QueryProvider>{children}</QueryProvider>
                </main>
            </body>
        </html>
    );
}
