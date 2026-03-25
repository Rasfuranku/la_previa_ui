import { z } from "zod";
import { PlayerResponseSchema } from "./player.schema";

export const TeamFanaticCreateSchema = z.object({
  fan_id: z.number(),
  team_name: z.string().optional(),
  badge: z.string().optional(),
});

export type TeamFanaticCreateInput = z.infer<typeof TeamFanaticCreateSchema>;

export const TeamFanaticResponseSchema = z.object({
  id: z.number(),
  team_name: z.string(),
  badge: z.string().nullable().optional(),
  fan_id: z.number(),
  is_active: z.boolean(),
  players: z.array(PlayerResponseSchema).default([]),
});

export type TeamFanaticResponse = z.infer<typeof TeamFanaticResponseSchema>;

export const TeamFanaticUpdateSchema = z.object({
  id: z.number(),
  fan_id: z.number(),
  team_name: z.string().optional(),
  badge: z.string().optional(),
});

export type TeamFanaticUpdateInput = z.infer<typeof TeamFanaticUpdateSchema>;
