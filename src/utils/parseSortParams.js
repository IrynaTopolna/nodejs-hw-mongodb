import { SORT_ORDER } from '../constants/index.js';

function parseSortOrder(sortOrder) {
  if ([SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder)) {
    return sortOrder;
  }

  return SORT_ORDER.ASC;
}

export function parseSortParams(query) {
  const { sortOrder } = query;

  const parsedSortOrder = parseSortOrder(sortOrder);
  const sortBy = 'name';

  return {
    sortBy,
    sortOrder: parsedSortOrder,
  };
}
