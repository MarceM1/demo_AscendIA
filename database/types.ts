import { areas } from "./schema/areas";
import { interviews } from "./schema/interviews";
import { userProfiles, users } from "./schema/users";
import { webhookLogs } from "./schema/webhooks";
import { InferSelectModel } from "drizzle-orm";
import { interviewers } from "@/database/schema/interviewers";
import { interviewSessions } from "./schema";



export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
export type InsertProfile = typeof userProfiles.$inferInsert;
export type SelectProfile = typeof userProfiles.$inferSelect;
export type InsertedInterview = typeof interviews.$inferInsert;
export type SelectedInterview = typeof interviews.$inferSelect;
export type WebhookLog = typeof webhookLogs.$inferSelect;
export type Area = typeof areas.$inferSelect;
export type NewArea = typeof areas.$inferInsert;

export type User = InsertUser & SelectUser;
export type UserProfile = InsertProfile & SelectProfile;
export type Interview = InsertedInterview & SelectedInterview;


export type InterviewModel = InferSelectModel<typeof interviews>;
export type AreaModel = InferSelectModel<typeof areas>;
export type InterviewerModel = InferSelectModel<typeof interviewers>;
export type InterviewSessionModel = InferSelectModel<typeof interviewSessions>; 
export type InterviewBase = InferSelectModel<typeof interviews>;
export type AreaBase = InferSelectModel<typeof areas>;
export type InterviewerBase = InferSelectModel<typeof interviewers>;
export type SessionBase = InferSelectModel<typeof interviewSessions>;

export type EnrichedInterview = InterviewBase & {
  areaDetails: AreaBase;
  interviewerDetails: InterviewerBase;
};

export type EnrichedInterviewWithSessions = EnrichedInterview & {
  sessions: SessionBase[];
};