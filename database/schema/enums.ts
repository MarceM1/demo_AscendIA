import { pgEnum } from "drizzle-orm/pg-core";

//Enums
export const ROLE_ENUM = pgEnum("role", [
  "USER",
  "SUBSCRIPTOR",
  "ADMIN",
  "RECRUITER",
  "INSTITUTION",
]);

export const AREA_ENUM = pgEnum("area", [
  "TECNOLOGIA_IT",
  "VENTAS",
  "MARKETING",
  "RECURSOS_HUMANOS",
  "DISENO_UX_UI",
  "ATENCION_AL_CLIENTE",
  "ADMINISTRACION",
  "INGENIERIA",
  "EDUCACION",
]);

export const INTERVIEWER_ENUM = pgEnum("interviewer", [
  "LUCIANA",
  "BOB",
  "LIZA",
  "MICHAEL",
  "MANUEL",
]);

export const SESSION_STATUS_ENUM = pgEnum("session_status", [
  "CREATED",
  "IN_PROGRESS",
  "COMPLETED",
  "FAILED",
]);

export const SPEAKER_ENUM = pgEnum('speaker', ['agent', 'user']);

export const LANGUAGE_SIMULATION_ENUM = pgEnum('language_simulation', [
  'es',
  // 'en',
  // 'fr',
]);

export const WEBHOOK_STATUS_ENUM = pgEnum("status", [
  "RECEIVED",
  "PROCESSED",
  "FAILED",
]);