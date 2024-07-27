function parseNumber(number, defaultNumber) {
  if (typeof number !== 'string') {
    return defaultNumber;
  }

  const parsedNumber = parseInt(number);

  if (Number.isNaN(parsedNumber)) {
    return defaultNumber;
  }

  return parsedNumber;
}

function parsePaginationParams(query) {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
}

export { parsePaginationParams };
