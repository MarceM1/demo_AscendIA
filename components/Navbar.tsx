import Image from "next/image"
import { SignOutButton } from "@clerk/nextjs"
import { Button } from "./ui/button"
import {LogOutIcon} from'lucide-react'

const Navbar = ({ firstName, lastName, userEmail, userImg }: UserProps) => {
    return (
        <nav className="w-full flex justify-end gap-10 items-center fixed top-0 px-[180px] py-4">
           
            
             <div className="flex items-center">
                 <Image
                    src={userImg || '/user.svg'}
                    alt="User Avatar"
                    width={50}
                    height={50}
                    className="rounded-full"
                />
                <div className="flex flex-col justify-center ml-4">
                    <span className="font-bold text-lg text-foreground-100 font-kodchasan">{firstName} {lastName}</span>
                    <span className="text-sm text-foreground-300 font-inter">{userEmail}</span>
                </div>
                
            </div>
            <SignOutButton >
                    <Button className="group flex items-center  cursor-pointer text-foreground-100 !bg-foreground-tertiary hover:!bg-background-600 hover:text-foreground-300 transition-all duration-300" variant="outline" aria-label="Boton para cerrar sesión" aria-labelledby="Botón para cerrar sesión">
                        <LogOutIcon  className="group-hover:text-red-400 transition-all duration-300"/>
                        
                    </Button>               
            </SignOutButton>
        </nav>
    )
}

export default Navbar