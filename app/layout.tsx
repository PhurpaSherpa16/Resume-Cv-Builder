import { Metadata } from "next";
import "./globals.css";
import "./theme.css";

export const metadata: Metadata = {
  title: {
    template : "%s - easy Resume",
    absolute : 'Resume Builder',
  },
  icons: {
    icon: "/ghost.png",
  },
  description: "Next JS CV Resume Maker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
