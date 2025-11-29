import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import LogupUI from "./LogupUI";


export default  async function LogupWrapper (){
   const {userId} = await auth(); 
   if (userId) redirect ("/dashboard");

   return <LogupUI />;
}