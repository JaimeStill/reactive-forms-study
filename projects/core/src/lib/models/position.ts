import { Division } from './division';
import { Person } from './person';

export interface Position {
  id: number;
  divisionId: number;
  value: string;

  division?: Division;

  people?: Person[];
}
