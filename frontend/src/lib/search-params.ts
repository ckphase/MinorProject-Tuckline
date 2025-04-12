import { createSerializer, parseAsString } from 'nuqs/server';

export const searchQueryParser = {
  q: parseAsString.withDefault(''),
};

export const filterQueryParser = {
  category: parseAsString.withDefault('0'),
  price: parseAsString.withDefault('0'),
};

export const serialize = createSerializer({
  ...searchQueryParser,
  ...filterQueryParser,
});
