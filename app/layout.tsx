'use client';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const inter = Inter({ subsets: ['latin'] })


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ThemeProvider theme={darkTheme}>
        <body className={inter.className}>{children}</body>
      </ThemeProvider>
    </html>
  )
}
