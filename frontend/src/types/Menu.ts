export type Item = {
  id: string;
  value: string;
};

export type Items = Item[][];

export type Rule = number[];

export type Rules = Record<number, Rule>;
