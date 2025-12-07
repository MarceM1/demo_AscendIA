import { relations } from "drizzle-orm";
import { feedbacksTable, interviews } from "./interviews";
import { metrics } from "./metrics";
import { users, userProfiles, userSessions, userSkills } from "./users";
import { interviewSessions } from "./sessions";
import { interviewers } from "./interviewers";
import { areas } from "./areas";

export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(userProfiles, {
    fields: [users.id],
    references: [userProfiles.userId],
  }),
  sessions: many(userSessions),
  metrics: many(metrics),
  interviews: many(interviews),
  skills: many(userSkills),
}));

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
  user: one(users, {
    fields: [userProfiles.userId],
    references: [users.id],
  }),
}));

export const userSessionsRelations = relations(userSessions, ({ one }) => ({
  user: one(users, {
    fields: [userSessions.userId],
    references: [users.id],
  }),
}));



export const userSkillsRelations = relations(userSkills, ({ one }) => ({
  user: one(users, {
    fields: [userSkills.userId],
    references: [users.id],
  }),
}));

export const interviewSessionsRelations = relations(
  interviewSessions,
  ({ one }) => ({
    interview: one(interviews, {
      fields: [interviewSessions.interviewId],
      references: [interviews.id],
    }),

    interviewer: one(interviewers, {
      fields: [interviewSessions.interviewerId],
      references: [interviewers.id],
    }),
  })
);

export const metricsRelations = relations(metrics, ({ one }) => ({
  user: one(users, {
    fields: [metrics.userId],
    references: [users.id],
  }),
}));

export const interviewsRelations = relations(interviews, ({ one, many }) => ({
  user: one(users, {
    fields: [interviews.userId],
    references: [users.id],
  }),

  area: one(areas, {
    fields: [interviews.area],
    references: [areas.id],
  }),

  interviewer: one(interviewers, {
    fields: [interviews.interviewer],
    references: [interviewers.id],
  }),

  sessions: many(interviewSessions),
  feedbacks: many(feedbacksTable),
}));


export const feedbacksRelations = relations(feedbacksTable, ({ one }) => ({
  interview: one(interviews, {
    fields: [feedbacksTable.interviewId],
    references: [interviews.id],
  }),
}));

 export const interviewerRelations = relations(interviewers, ({ many }) => ({
    sessions: many(interviewers),
    interviews: many(interviews),
 }));

 export const areasRelations = relations(areas, ({ many }) => ({
  interviews: many(interviews),
}));
