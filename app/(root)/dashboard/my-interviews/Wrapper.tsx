
import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import MyInterviewsUI from "./MyInterviewsUI";

export default async function MyInterviewsWrapper(){
    const {userId} = await auth();

    if(!userId){
        redirect('/sign-in')
    }

    return <MyInterviewsUI />
}