export interface Query {
  limit?: number;
  page?: number;
  [key: string]: ObjectValues | undefined;
}

export interface QueryObject {
  [key: string]: ObjectValues;
}

type ObjectValues =
  | string
  | number
  | boolean
  | readonly (string | number | boolean)[];
