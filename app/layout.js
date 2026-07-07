import './globals.css'

export const metadata = {
  title: 'Китти Кичен',
  description: 'Скандинавский уют и рецепты от ИИ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
