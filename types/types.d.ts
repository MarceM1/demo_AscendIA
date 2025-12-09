import { InferSelectModel } from "drizzle-orm";
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
  id: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string;
  username: string | null;
  emailAddresses: string[];
}

interface OTPProps {
  code: string
  setCode: React.Dispatch<React.SetStateAction<string>>
}

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; message: string; error?: unknown };

  export type Interview = InferSelectModel<typeof interviews>;

export type AreaEnum = (typeof ENUM_AREAS)[number];
export type InterviewerEnum = (typeof ENUM_INTERVIEWERS)[number];
