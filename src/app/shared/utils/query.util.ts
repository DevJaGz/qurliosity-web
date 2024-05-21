import { Query, QueryObject } from '@core/datatypes';

export const queryMapUtil = <Q extends Query>(
  query: Q,
  map: {
    [key in keyof Q]: string;
  }
): QueryObject => {
  const queryObject: QueryObject = {};
  for (const queryKey in query) {
    const queryValue = query[queryKey];
    if (queryValue === undefined) {
      continue;
    }

    const mapKey = map[queryKey];
    if (mapKey === undefined) {
      queryObject[queryKey] = query[queryKey] as QueryObject[keyof QueryObject];
      continue;
    }

    queryObject[mapKey] = queryValue;
  }
  return queryObject;
};
