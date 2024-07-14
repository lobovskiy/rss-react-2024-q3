import { Person } from '../types';

export interface ApiResponsePeople {
  count: number;
  results: Person[];
}
