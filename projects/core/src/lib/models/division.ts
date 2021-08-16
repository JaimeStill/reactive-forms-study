import { Position } from './position';

export interface Division {
  id: number;
  value: string;

  positions?: Position[];
}
