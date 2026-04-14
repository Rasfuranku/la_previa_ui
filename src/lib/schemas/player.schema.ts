import { z } from "zod";

export const PlayerResponseSchema = z.object({
  id: z.number(),
  fanatic_id: z.number(),
  team_fanatic_id: z.number(),
  team_id: z.number(),
  name: z.string(),
  last_name: z.string(),
  age: z.number(),
  weight: z.number(),
  height: z.number(),
  current_team: z.string(),
  current_team_id: z.number(),
  current_team_name: z.string().nullable().optional(),
  price: z.number(),
  form: z.number(),
  picture: z.string().nullable().optional(),
  birthdate: z.string(),
  nationality: z.string(),
  position_id: z.number(),
  twitter: z.string().nullable().optional(),
  insta: z.string().nullable().optional(),
  tiktok: z.string().nullable().optional(),
  medical_status: z.string().nullable().optional(),
  active: z.boolean(),
  total_points: z.number().default(0),
});

export type PlayerResponse = z.infer<typeof PlayerResponseSchema>;

export const PlayerUpdateSchema = z.object({
  id: z.number(),
  fan_id: z.number().optional(),
  team_fanatic_id: z.number().optional(),
  team_id: z.number().optional(),
  transfer_in: z.boolean(),
});

export type PlayerUpdateInput = z.infer<typeof PlayerUpdateSchema>;

export const PlayerSearchSchema = z.object({
  current_team: z.string().optional(),
  position_id: z.number().optional(),
  price: z.number().optional(),
  form: z.number().optional(),
  medical_status: z.string().optional(),
  limit: z.number().min(1).max(200).default(50),
  offset: z.number().min(0).default(0),
});

export type PlayerSearchInput = z.infer<typeof PlayerSearchSchema>;
