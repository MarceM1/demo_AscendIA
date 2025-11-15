import { AREA_ENUM, INTERVIEWER_ENUM } from "@/database/schema";

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

export const ENUM_AREAS = AREA_ENUM.enumValues as const;

export const ENUM_INTERVIEWERS = INTERVIEWER_ENUM.enumValues as const;


export type AreaEnum = (typeof ENUM_AREAS)[number];
export type InterviewerEnum = (typeof ENUM_INTERVIEWERS)[number];

