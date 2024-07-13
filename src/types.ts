export interface Person {
  name: string;
  birth_year: string;
  gender: string;
}

export interface PersonList {
  people: Person[];
  progress: boolean;
}
