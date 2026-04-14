import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { PlayerMenuCard } from './player-menu-card';
import { PlayerResponse } from '@/lib/schemas/player.schema';

const mockPlayer: PlayerResponse = {
  id: 1,
  fanatic_id: 1,
  team_fanatic_id: 1,
  team_id: 10,
  name: 'Carlos',
  last_name: 'Bacca',
  age: 37,
  weight: 77,
  height: 181,
  current_team: '10', // Original ID string
  current_team_id: 10,
  current_team_name: 'Junior FC',
  price: 1000000,
  form: 8,
  birthdate: '1986-09-08',
  nationality: 'COL',
  position_id: 4,
  active: true,
  total_points: 15
};

test('renders player menu card with team name', () => {
  render(
    <PlayerMenuCard 
      player={mockPlayer} 
      onClose={() => {}} 
      onRemove={() => {}} 
    />
  );

  // Check if team name is rendered
  expect(screen.getByText('Junior FC')).toBeDefined();
  
  // Check if player name is rendered
  expect(screen.getByText(/Carlos Bacca/i)).toBeDefined();
});
