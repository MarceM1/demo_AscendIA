import Image from 'next/image'
import { Card, CardHeader, CardContent, CardAction } from './ui/card';
import Link from 'next/link';
import { User } from 'lucide-react'

type User = {
    id?: string;
    imageUrl?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    emailAddresses?: { emailAddress: string }[];
};

// TODO Conventri en dropdown 

const UserNav = ({ user }: { user: User | null }) => {
    //   console.log('user in userNav: ', user)
    const { username, imageUrl, emailAddresses, firstName, lastName, id } = user as User
    return (
        <section className='w-full h-fit'>
            <Card className='p-2 !bg-background-light  !border-none shadow-md shadow_sm-hover gradient-hover'>

                <Link href={`/dashboard/profile/${id}`} className=''>
                    <CardContent className='w-full h-fit flex flex-row gap-2 p-0'>
                        {user?.imageUrl ? (<Image
                            src={user?.imageUrl || '/file.png'}
                            width={50}
                            height={50}
                            alt="User Avatar"
                            className="size-8 rounded-full"
                        />) : (
                            <User className='size-8' />
                        )}
                        <div className='max-w-[75%] text-ellipsis'>
                            <p className='font-kodchasan text-sm text-foreground truncate whitespace-nowrap'>{username ? username : firstName ? firstName + " " + lastName : 'Usuario'}</p>
                            <p className='font-inter text-xs text-foreground-muted truncate whitespace-nowrap'>{emailAddresses?.[0].emailAddress}</p>
                        </div>
                    </CardContent>
                </Link>
            </Card>
        </section>
    )
}

export default UserNav