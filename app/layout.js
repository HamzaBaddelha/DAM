import localFont from "next/font/local";
import "./globals.css";

const oranienbaum = localFont({
  src: "../public/font/Oranienbaum/Oranienbaum-Regular.ttf",
  variable: "--font-premium",
  display: "swap"
});

export const metadata = {
  title: "DAM GROUP HOLDING | مجموعة دام القابضة",
  description:
    "A premium bilingual landing page for DAM Group Holding, a Saudi investment holding group aligned with Vision 2030.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={oranienbaum.variable}>
      <body>{children}</body>
    </html>
  );
}
