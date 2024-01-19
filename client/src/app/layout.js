import Auth from "./auth";
import Providers from "./providers";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  metadataBase: new URL("https://canim-csr.vercel.app"),
  title: "Canim - Shop & eCommerce React Template",
  description:
    "Buy Canim - Shop & eCommerce Next.Js Template by Hasibul Islam. Canim | Shop & eCommerce React Template - a responsive React template. Canim is built with the latest Next.Js 13 App Directory",
  openGraph: {
    title: "Canim - Shop & eCommerce React Template",
    description:
      "Buy Canim - Shop & eCommerce Next.Js Template by Hasibul Islam. Canim | Shop & eCommerce React Template - a responsive React template. Canim is built with the latest Next.Js 13 App Directory",
    url: "https://canim-csr.vercel.app",
    siteName: "Canim Template",
    images:
      "https://res.cloudinary.com/dho0rpn5a/image/upload/v1700475060/ciseco-template/ciseco-ecommerce_chsdds.png",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@devhasibulislam",
    title: "Canim - Shop & eCommerce React Template",
    description:
      "Buy Canim - Shop & eCommerce Next.Js Template by Hasibul Islam. Canim | Shop & eCommerce React Template - a responsive React template. Canim is built with the latest Next.Js 13 App Directory",
    image:
      "https://res.cloudinary.com/dho0rpn5a/image/upload/v1700475060/ciseco-template/ciseco-ecommerce_chsdds.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Auth>{children}</Auth>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
