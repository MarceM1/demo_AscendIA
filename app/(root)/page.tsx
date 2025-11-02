import { Button } from "@/components/ui/button";
import Image from "next/image";
import { auth, currentUser } from '@clerk/nextjs/server'
import Navbar from "@/components/Navbar";

export default async function Home() {
  const { isAuthenticated } = await auth()

  if (!isAuthenticated) {
    return <div>Sign in to view this page</div>
  }

  const user = await currentUser()
  // console.log(user)

  return (

    <main className="flex flex-col px-[180px] max-sm:px-[20px] h-dvh items-center justify-center ">
      {/* Corregir: Si user ingres pass y email, no tiene foto ni nombre, tiene q tomar los datos por defecto de clerk (userImg, firstName y lastName)*/}
      <Navbar
        firstName={user?.firstName || user?.emailAddresses[0].emailAddress?.split('')[0].toUpperCase() || ''}
        lastName={user?.lastName || user?.emailAddresses[0].emailAddress?.split('')[0].toUpperCase() || ''}
        userEmail={user?.emailAddresses[0]?.emailAddress || ''}
        userImg={user?.imageUrl || '/user.svg'}
      />
      <div className="flex flex-col items-center justify-between h-2/4 ">

        <div className="flex flex-col items-center gap-10">
          <Image
            className=""
            src="/AscendIA_logo.svg"
            alt="AscendIA Logo"
            width={193}
            height={121}
            priority
          />
          <h2 className=" text-2xl font-inter text-foreground-100">Bienvenido, {user?.firstName === null || undefined ? user?.emailAddresses[0].emailAddress?.split('')[0].toUpperCase() : user?.firstName}</h2>
        </div>
      </div>
    </main>

  );
}
