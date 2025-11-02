'use client'

import { usePathname } from "next/navigation"
import Link from "next/link";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Separator } from "./ui/separator"
import { homeSubItems, lowNavItems, myInterviewsSubitems, navItems, newInterviewSubitems, profileSubitems } from "@/lib/utils"
import UserNav from "./UserNav";
import { useEffect, useState } from "react"
import { LogOut } from "lucide-react"
import { SignOutButton } from "@clerk/nextjs";
export function DashSidebar({ user }: { imgUrl: string | null, user?: string | null }) {
    const [selectedNavItem, setSelectedNavItem] = useState('Inicio')
    const [currentSubItems, setCurrentSubItems] = useState(homeSubItems);
    const userData = JSON.parse(user || '')


    const pathname = usePathname();

    useEffect(() => {
        if (pathname.includes("new-interview")) setSelectedNavItem("Nueva Entrevista");
        else if (pathname.includes("my-interviews")) setSelectedNavItem("Mis Entrevistas");
        else if (pathname.includes("my-stats")) setSelectedNavItem("Mis Estadísticas");
        else if (pathname.includes("feedback")) setSelectedNavItem("Feedback");
        else if (pathname.includes("profile")) setSelectedNavItem("Mi Cuenta");

        else setSelectedNavItem("Inicio");
    }, [pathname])

    useEffect(() => {
        if (selectedNavItem === "Nueva Entrevista") setCurrentSubItems(newInterviewSubitems);
        else if (selectedNavItem === "Mis Entrevistas") setCurrentSubItems(myInterviewsSubitems);
        else if (selectedNavItem === "Mis Estadísticas") setCurrentSubItems(myInterviewsSubitems);
        else if (selectedNavItem === "Mis Estadísticas") setCurrentSubItems(myInterviewsSubitems);
        else if (selectedNavItem === "Mi Cuenta") setCurrentSubItems(profileSubitems);

        else setCurrentSubItems(homeSubItems);
    }, [selectedNavItem]);




    return (

        //TODO Cambiar los iconos por otros mas representativos
        <Sidebar className="!bg-background-base !border-base-border h-screen" >
            <SidebarContent className="flex flex-col ">
                <section className="!flex flex-row h-full">
                    <SidebarGroup className="flex flex-col w-fit  h-full  ml-3 mt-2  pt-2 bg-background-light rounded-xl shadow-xl ">
                        <SidebarGroupContent className="!flex !flex-col items-center justify-between h-full">
                            <SidebarMenu>
                                {
                                    navItems.map((item) => (
                                        <SidebarMenuItem key={item.id} className={`flex flex-col gap-4 items-center justify-center text-foreground-base ${selectedNavItem === item.id ? 'text-accent' : ''}`}>
                                            <SidebarMenuButton className="flex items-center justify-center hover:text-accent gradient-hover shadow_sm-hover" onClick={() => setSelectedNavItem(item.id)} asChild>
                                                <Link aria-hidden='false' aria-label={item.title} href={item.href} className="">
                                                    <item.icon className="!size-6 " />
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))
                                }
                            </SidebarMenu>
                            <SidebarMenu className="">
                                {
                                    lowNavItems.map((item) => (
                                        <SidebarMenuItem key={item.id} className={`flex flex-col gap-4 items-center justify-center text-foreground-base ${selectedNavItem === item.id ? 'text-accent' : ''}`}>
                                            <SidebarMenuButton className="flex items-center justify-center hover:text-accent gradient-hover shadow_sm-hover" onClick={() => setSelectedNavItem(item.id)} asChild>
                                                <Link aria-hidden='false' aria-label={item.title} href={item.href} className="">
                                                    <item.icon className="!size-6 " />
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))
                                }
                                <SidebarMenuItem className="flex flex-col gap-4 items-center justify-center text-foreground-base">
                                    <SignOutButton>
                                        <SidebarMenuButton className="flex items-center justify-center hover:text-destructive gradient-hover shadow_sm-hover">
                                            <LogOut className="!size-6" />
                                        </SidebarMenuButton>
                                    </SignOutButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <Separator
                        orientation="vertical"
                        className="mr-1 my-auto data-[orientation=vertical]:h-full"
                        color="border-base-border"
                    />

                    <SidebarGroup className="mt-2 flex flex-col gap-2">
                        <SidebarGroupContent className="flex flex-col pl-2 border-b border-base-border pb-4">
                            <h1 className="font-kodchasan text-2xl text-foreground-base">Ascend<span className="text-accent font-semibold">IA</span></h1>
                            <h2 className="text-foreground-muted font-inter text-base">{selectedNavItem}</h2>
                        </SidebarGroupContent>
                        <SidebarGroupContent className="mt-1">
                            <SidebarMenu>
                                {currentSubItems.map((item) => (
                                    <SidebarMenuItem key={item.title} className=" text-foreground-base font-inter rounded-lg shadow_sm-hover  gradient-hover ">
                                        <SidebarMenuButton asChild className="">
                                            <a aria-hidden='false' aria-label={item.title} aria-labelledby={item.title} href={item.href} className="flex items-center">
                                                <item.icon className="" />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </section>

                <SidebarGroup className="h-fit">
                    <UserNav user={userData} />
                </SidebarGroup>
            </SidebarContent>

        </Sidebar>
    )
}