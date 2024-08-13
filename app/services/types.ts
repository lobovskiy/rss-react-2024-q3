import { Person } from '../types';

export interface PeopleResponse {
  results: Person[];
  count: number;
}

export interface PeopleRequest {
  page?: number;
  search?: string;
}
