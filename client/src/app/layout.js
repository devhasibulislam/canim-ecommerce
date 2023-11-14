import AppWrapper from "./AppWrapper";
import "./globals.css";
import Redux from "./redux";

export const metadata = {
  title: "Ciseco - Template",
  description:
    "An eco shop & e-commerce responsive React template built by React.JS & Tailwind CSS",
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
