// 'use client'

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub
} from "@/components/ui/sidebar"
import { items, navItems } from "@/lib/utils"
import { Separator } from "./ui/separator"
import { LogOut, LoaderCircle, User, Send, } from "lucide-react"
import { SignOutButton, useUser } from '@clerk/nextjs';
import Link from "next/link";
import Image from "next/image"
import UserNav from "./UserNav";
import { Card, CardContent } from "./ui/card";

export function DashSidebar({ imgUrl, user }: { imgUrl: string | null, user?: object | null }) {
    // const { user, isLoaded } = useUser()

    // if (!isLoaded) return <LoaderCircle className="animate-spin" />;


    // console.log('isLoaded: ', isLoaded)
    // console.log('user: ', user)
    // console.log('user.imageUrl', user?.imageUrl)


    return (
        //TODO Rediseño general del layout
        //TODO Cambiar los iconos por otros mas representativos
        //TODO Rediseño 

        //TODO Luego de implementar lo anterior, iterar y plantear nuevos TODO
        <Sidebar className="!bg-background-base !border-base-border h-screen" >

            {/* <SidebarGroup className="flex items-start justify-center py-4 mb-2">
                <h1 className="text-xl font-kodchasan">Ascend<span className="text-accent">IA</span></h1>
            </SidebarGroup> */}

            <SidebarContent className="flex flex-col ">

                <section className="!flex flex-row h-full">

                    <SidebarGroup className="flex flex-col w-fit  h-full  ml-3 mt-2  pt-2 bg-background-light rounded-xl shadow-xl ">
                        <SidebarGroupContent className="!flex !flex-col items-center justify-between h-full">
                            <SidebarMenu>
                                {
                                    navItems.map((item, index) => (
                                        <SidebarMenuItem key={index} className="flex flex-col gap-4 items-center justify-center text-foreground-base">
                                            <SidebarMenuButton className="flex items-center justify-center hover:text-accent gradient-hover shadow_sm-hover" asChild>
                                                <Link href={item.href} className="">
                                                    <item.icon className="!size-6 " />
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))
                                }
                            </SidebarMenu>
                            <SidebarMenu className="">
                                <SidebarMenuItem className="flex flex-col gap-4 items-center justify-center text-foreground-base">
                                    <SidebarMenuButton className="flex items-center justify-center  gradient-hover shadow_sm-hover">
                                        <Send className="!size-6" />
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem className="flex flex-col gap-4 items-center justify-center text-foreground-base">
                                    <SidebarMenuButton className="flex items-center justify-center hover:text-destructive gradient-hover shadow_sm-hover">
                                        <LogOut className="!size-6" />
                                    </SidebarMenuButton>
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
                            <h3 className="text-foreground-muted font-inter text-base">Nueva Entrevista</h3>
                        </SidebarGroupContent>
                        <SidebarGroupContent className="mt-1">
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title} className=" text-foreground-base font-inter rounded-lg shadow_sm-hover  gradient-hover ">
                                        <SidebarMenuButton asChild className="">
                                            <a href={item.href} className="flex items-center">
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
                    <UserNav user={user ?? null} />
                </SidebarGroup>
            </SidebarContent>

        </Sidebar>
    )
}