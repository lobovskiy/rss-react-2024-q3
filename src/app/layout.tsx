import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vite + React + TS',
  description: 'React 2024 Q3 Star Wars app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
