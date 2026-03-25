export interface PlayerResponse {
  id: number;
  fanatic_id: number;
  team_fanatic_id: number;
  team_id: number;
  name: string;
  last_name: string;
  age: number;
  weight: number;
  height: number;
  current_team: string;
  price: number;
  form: number;
  picture: string | null;
  birthdate: string;
  nationality: string;
  position_id: number;
  twitter: string | null;
  insta: string | null;
  tiktok: string | null;
  medical_status: string | null;
  active: boolean;
}

export interface PlayerUpdateInput {
  id: number;
  fan_id?: number;
  team_fanatic_id?: number;
  team_id?: number;
  transfer_in: boolean;
}

export interface PlayerSearchInput {
  current_team?: string;
  position_id?: number;
  price?: number;
  form?: number;
  medical_status?: string;
  limit: number;
  offset: number;
}
