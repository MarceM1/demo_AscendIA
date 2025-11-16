import {z} from "zod";
import { ENUM_AREAS, ENUM_INTERVIEWERS } from "@/types/enums";

export const NewInterviewFormSchema = () =>
  z.object({
    area: z.enum(ENUM_AREAS),
    interviewer: z.enum(ENUM_INTERVIEWERS),
    position: z.string().max(255)
  });