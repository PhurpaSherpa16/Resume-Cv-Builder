import { Metadata } from "next";
import "./globals.css";
import "./theme.css";

export const metadata: Metadata = {
  title: {
    template : "%s - easy Resume",
    absolute : 'Resume Builder',
  },
  icons: '/ghost.png',
  description: "Next JS CV Resume Maker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
