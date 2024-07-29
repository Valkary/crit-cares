'use client'

import { BrainIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Route } from './layout'

export default function Sidebar({ routes }: { routes: Route[] }) {
  const path = usePathname()

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <BrainIcon className="h-6 w-6" />
            <span className="">Crit Cares</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {routes.map(({ title, url, icon }) => (
              <Link
                href={url}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${path.includes(url) ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
              >
                {icon}
                {title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
