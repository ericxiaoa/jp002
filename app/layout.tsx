import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

export const metadata: Metadata = {
  title: "2025年最強AI株価予測 | 99.8%の精度",
  description: "AIによる株価予測システム。精度99.8%の最先端技術で、あなたの投資をサポートします。",
  viewport: "width=device-width, initial-scale=1.0",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        {/* Google tag (gtag.js) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-17165171170" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17165171170');
            
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                'send_to': 'AW-17165171170/M9CDCPiYo5kbEOLz_vg_',
                'value': 1.0,
                'currency': 'USD',
                'event_callback': callback
              });
              return false;
            }
          `}
        </Script>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
