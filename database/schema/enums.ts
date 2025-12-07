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

export const WEBHOOK_STATUS_ENUM = pgEnum("status", [
  "received",
  "processed",
  "failed",
]);