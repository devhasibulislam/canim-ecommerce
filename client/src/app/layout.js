import AppWrapper from "./AppWrapper";
import "./globals.css";
import Redux from "./redux";

export const metadata = {
  title: "Ciseco - Shop & eCommerce React Template",
  description:
    "Buy Ciseco - Shop & eCommerce Next.Js Template by Hasibul Islam. Ciseco | Shop & eCommerce React Template - a responsive React template. Ciseco is built with the latest Next.Js 13 App Directory",
  keywords: ["Ciseco", "Shop", "Ecommerce", "React", "Template", "Next.js"],
  openGraph: {
    title: "Ciseco - Shop & eCommerce React Template",
    description:
      "Buy Ciseco - Shop & eCommerce Next.Js Template by Hasibul Islam. Ciseco | Shop & eCommerce React Template - a responsive React template. Ciseco is built with the latest Next.Js 13 App Directory",
    keywords: ["Ciseco", "Shop", "Ecommerce", "React", "Template", "Next.js"],
    url: "https://ciseco-csr.vercel.app/",
    siteName: "Ciseco Template",
    images:
      "https://res.cloudinary.com/dho0rpn5a/image/upload/v1700475060/ciseco-template/ciseco-ecommerce_chsdds.png",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Redux>
          <AppWrapper>{children}</AppWrapper>
        </Redux>
      </body>
    </html>
  );
}
