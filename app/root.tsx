import {
  Outlet,
  ScrollRestoration,
  Scripts,
  Meta,
  Links,
} from '@remix-run/react';
import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + React + TS</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div id="root">
          <Outlet />
          <ScrollRestoration />
          <Scripts />
        </div>
      </body>
    </html>
  );
}
