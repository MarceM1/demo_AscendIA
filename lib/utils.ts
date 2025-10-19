import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Archive,
  Activity,
  FileUser,
  ChartNoAxesColumn,
  GraduationCap,
  LucideFocus,
  Shovel,
  Home,
  Plus,
  Newspaper,
  FileArchive,
  Send,
  Coins,
} from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}





// TODO mover a constants.ts
export const homeSubItems = [
  {
    title: "Actividad",
    icon: Activity,
    href: "#activity",
    checked: false,
  },
  {
    title: "Ultimas Entrevistas",
    icon: Newspaper,
    href: "#last-interviews",
    checked: false,
  },

  {
    title: "Mis lecciones",
    icon: GraduationCap,
    href: "#my-lessons",
    checked: false,
  },
];

export const newInterviewSubitems = [
  {
    title: "Area",
    icon: LucideFocus,
    href: "#area",
    checked: false,
  },
  {
    title: "Puesto",
    icon: Shovel,
    href: "#puesto",
    checked: false,
  },
  {
    title: "Curriculum",
    icon: FileUser,
    href: "#area",
    checked: false,
  },
];

export const myInterviewsSubitems = [
  {
    title: "Entrevistas completadas",
    icon: FileArchive,
    href: "#finished-interviews",
    checked: false,
  },
];

export const profileSubitems = [
  {
    title: "Subscripcion",
    icon: Coins,
    href: "#billing",
    checked: false,
  },
];

export const navItems = [
  {
    id: "Inicio",
    title: "Inicio",
    icon: Home,
    href: "/dashboard",
    selected: false,
  },
  {
    id: "Nueva Entrevista",
    title: "Nueva Entrevista",
    icon: Plus,
    href: "/dashboard/new-interview",
    selected: false,
  },
  {
    id: "Mis Entrevistas",
    title: "Mis Entrevistas",
    icon: Archive,
    href: "/dashboard/my-interviews",
    selected: false,
  },
  {
    id: "Mis Estadísticas",
    title: "Mis Estadísticas",
    icon: ChartNoAxesColumn,
    href: "/dashboard/my-stats",
    selected: false,
  },
];

export const lowNavItems = [
  {
    id: "Feedback",
    title: "Feedback",
    icon: Send,
    href: "/dashboard/feedback",
    selected: false,
  },
];
