import { parseAsString } from 'nuqs/server';

export const searchQueryParser = {
  q: parseAsString.withDefault(''),
};

export const filterQueryParser = {
  category: parseAsString.withDefault(''),
  price: parseAsString.withDefault(''),
};
