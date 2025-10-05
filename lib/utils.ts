import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Archive,Activity, ArrowBigUpDash, FileUser, AudioWaveform, AudioLines, ChartNoAxesColumn, GraduationCap, LucideFocus, Shovel, List, Home, PlusCircle, Plus  } from 'lucide-react'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const items = [
    {
     title:'Area',   
     icon:LucideFocus,
     href:'#area',
     checked: false
    },
    {
     title:'Puesto',   
     icon:Shovel,
     href:'#puesto',
     checked: false
    },
    {
     title:'Curriculum',   
     icon:FileUser,
     href:'#area',
     checked: false
    },
   
]

export const navItems = [

    {
     title:'Inicio',   
     icon: Home,
     href:'/dashboard',
     selected: false
    },
    {
     title:'Nueva Entrevista',   
     icon: Plus,
     href:'/dashboard/new-interview',
     selected: false
    },
    {
     title:'Mis Entrevistas',   
     icon: Archive,
     href:'/dashboard/my-interviews',
     selected: false
    },

]
