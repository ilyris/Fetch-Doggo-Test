import type { Metadata } from "next";
import ThemeProvider from "@/app/components/ThemeProvider";
import { theme } from "./theme";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "Doggo App",
  description: "Fetch Take Home Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </body>
      </StoreProvider>
    </html>
  );
}
