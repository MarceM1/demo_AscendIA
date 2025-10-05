import { Card } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { currentUser, auth } from '@clerk/nextjs/server'
import { Slash } from 'lucide-react'
import Image from "next/image"
import { redirect } from "next/navigation"

const UserProfile = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const { isAuthenticated } = await auth()
  const user = await currentUser()
  // console.log('user in userProfile: ', user)

  if (!id) return <div>no user id</div>

  if (!isAuthenticated) return redirect('/sign-in')




  return (
    < section className="w-full h-full flex flex-col gap-5">

      <div className="flex flex-row gap-2 items-center">
        <SidebarTrigger size={"lg"}  className=""/>
        <p className="font-inter font-light text-xl "> {">"}{"  "}Perfil</p>
      </div>

      <section className="container mx-auto">
        <div className="flex flex-row gap-2 w-full">
          <Card className=" bg-background-base !border-base-border shadow-lg px-4 w-2/3 max-sm:w-full">
          <Image
            src={user?.imageUrl || '/file.png'}
            alt="User Avatar"
            width={64}
            height={64}
            className="size-16 rounded-full "
          />
        </Card>
        <Card className="w-1/3 bg-background-base !border-base-border shadow-lg px-2 max-sm:w-full">
          
        </Card>
        </div>
      </section>
    </section >
  )
}

export default UserProfile