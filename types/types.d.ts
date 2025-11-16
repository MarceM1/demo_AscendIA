import { ENUM_AREAS, ENUM_INTERVIEWERS } from "./enums";

interface UserProps {
    firstName?: string;
    lastName?: string;
    userEmail?: string;
    userImg?: string;
}

interface DashboardHeaderProps {
  userImg?: string | null;
  path?: string;
  subPath?: string;
}


interface DashSidebarProps {
   id: string
  firstName: string | null
  lastName:string | null
  imageUrl: string
  username: string | null
  emailAddresses: string []
}


export type AreaEnum = (typeof ENUM_AREAS)[number];
export type InterviewerEnum = (typeof ENUM_INTERVIEWERS)[number];

