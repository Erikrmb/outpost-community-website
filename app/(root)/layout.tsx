import { ClerkProvider } from '@clerk/nextjs/app-beta'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import TopBar from '@/components/shared/Topbar'
import RightSideBar from '@/components/shared/RightSidebar'
import BottomBar from '@/components/shared/Bottombar'
import LeftSidebar from '@/components/shared/LeftSidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Outpost',
  description: 'A Next.js 13 Meta Threads Application'
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <TopBar/>

          <main>
            <LeftSidebar/>

              <section className="main-container">
                <div className="w-full max-w-4xl">
                  {children}
                </div>
              </section>

            <RightSideBar/>
          </main>
          
          <BottomBar/>
        </body>
      </html>
    </ClerkProvider>
  )
}
