'use client'
import { BrainIcon, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '~/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet'
import type { User } from '~/types'
import type { Route } from './layout'
import UserDropdownMenu from './user_dropdown_menu'

export default function Header({
  routes,
  user,
}: { routes: Route[]; user: User }) {
  const path = usePathname()

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <BrainIcon className="h-6 w-6" />
              <span className="">Crit Cares</span>
            </Link>
            {routes.map(({ title, url, icon }) => (
              <Link
                href={url}
                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${path.includes(url) ? 'bg-muted text-primary' : 'text-muted-foreground'} hover:text-foreground`}
              >
                {icon}
                {title}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full justify-end">
        <UserDropdownMenu user={user} />
      </div>
    </header>
  )
}
