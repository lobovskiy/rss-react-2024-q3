export interface Person {
  name: string;
  gender: string;
  birth_year: string;
  url: string;
  eye_color: string;
  hair_color: string;
  height: string;
  skin_color: string;
}

export interface PersonList {
  people: Person[];
  progress: boolean;
}
