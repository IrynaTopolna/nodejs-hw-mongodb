function parseContactType(contactType) {
  if (typeof contactType !== 'string') return;

  if (['work', 'home', 'personal'].includes(contactType)) return contactType;
}

function parseIsFavourite(isFavourite) {
  if (typeof isFavourite !== 'string') return;

  if (['true', 'false'].includes(isFavourite)) return isFavourite;
}

export function parseFilterParams(query) {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
}
