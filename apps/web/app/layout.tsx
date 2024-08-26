import "./global.css"
import { AppbarClient } from "../components/AppBarClient";
import { Providers } from "./provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>

        <body>
          <AppbarClient />
          {children}</body>
      </Providers>
    </html>
  );
}
