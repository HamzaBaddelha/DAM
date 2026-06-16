import localFont from "next/font/local";
import "./globals.css";

const projectEnglishFont = localFont({
  src: "../public/font/font/Oranienbaum-Regular.ttf",
  variable: "--font-project-english",
  display: "swap",
});

const projectArabicFont = localFont({
  src: [
    {
      path: "../public/font/font/arab-font-static/MarkaziText-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/font/arab-font-static/MarkaziText-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/font/font/arab-font-static/MarkaziText-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/font/font/arab-font-static/MarkaziText-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-project-arabic",
  display: "swap",
});

export const metadata = {
  title: "DAM GROUP HOLDING | مجموعة دام القابضة",
  description:
    "A premium bilingual landing page for DAM Group Holding, a Saudi investment holding group aligned with Vision 2030.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${projectEnglishFont.variable} ${projectArabicFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
