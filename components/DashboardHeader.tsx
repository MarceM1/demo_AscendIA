'use client'

import { SidebarTrigger } from './ui/sidebar'
import { Separator } from './ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb'
import Image from 'next/image'
import { useDashboardPath } from '@/hooks/useDashboardPath'

const DashboardHeader = ({ userImg }: DashboardHeaderProps) => {
    const {cleanPath:path, cleanSubPath:subPath}= useDashboardPath()

  console.log('path: ', path)
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-base-border px-4">
      <div className="flex gap-2 items-center">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4 bg-base-border"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#" className='capitalize'>
                {path}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Trayendo Datos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className=" h-fit w-fit overflow-hidden rounded-full">
        <Image
          src={userImg ?? '/user.svg'}
          alt="Profile"
          width={32}
          height={32}
        />
      </div>

    </header>
  )
}

export default DashboardHeader