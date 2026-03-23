import { z } from "zod";

export const MatchIncidentResponseSchema = z.object({
  id: z.number(),
  event_id: z.number(),
  data: z.record(z.string(), z.any()),
});

export type MatchIncidentResponse = z.infer<typeof MatchIncidentResponseSchema>;

export const MatchLineupResponseSchema = z.object({
  event_id: z.number(),
  home_lineup: z.record(z.string(), z.any()),
  away_lineup: z.record(z.string(), z.any()),
});

export type MatchLineupResponse = z.infer<typeof MatchLineupResponseSchema>;

export const PlayerMatchStatsResponseSchema = z.object({
  event_id: z.number(),
  player_id: z.number(),
  data: z.record(z.string(), z.any()),
});

export type PlayerMatchStatsResponse = z.infer<typeof PlayerMatchStatsResponseSchema>;
