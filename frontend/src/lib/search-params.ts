import { parseAsString } from 'nuqs/server';

export const searchQueryParser = {
  q: parseAsString.withDefault(''),
};
