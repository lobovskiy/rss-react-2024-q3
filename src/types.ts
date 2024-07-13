export interface Person {
  name: string;
  birth_year: string;
  gender: string;
  url: string;
}

export interface PersonList {
  people: Person[];
  progress: boolean;
}
