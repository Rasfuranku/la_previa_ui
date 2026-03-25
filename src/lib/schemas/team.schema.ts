import { PlayerResponse } from "./player.schema";

export interface TeamFanaticResponse {
  id: number;
  team_name: string;
  badge: string | null;
  fan_id: number;
  is_active: boolean;
  players: PlayerResponse[];
}

export interface TeamFanaticCreateInput {
  fan_id: number;
  team_name?: string;
  badge?: string | null;
}

export interface TeamFanaticUpdateInput {
  id: number;
  fan_id: number;
  team_name?: string;
  badge?: string | null;
}
