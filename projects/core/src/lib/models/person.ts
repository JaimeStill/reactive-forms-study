import { Address } from './address';
import { Position } from './position';

export interface Person {
  id: number;
  divisionId: number;
  positionId: number;
  lastName: string;
  firstName: string;
  middleName: string;
  jobTitle: string;
  isActive: boolean;

  address?: Address;
  position?: Position;
}
