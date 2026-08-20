const DATE_PATTERN =
  /^(\d{4})[-./](\d{2})[-./](\d{2})(?:[T\s](\d{2}):(\d{2}))?/;

const getDateParts = (value: string | null | undefined) => {
  if (!value) return null;

  const match = value.trim().match(DATE_PATTERN);
  if (!match) return null;

  const [, year, month, day, hour, minute] = match;
  return { year, month, day, hour, minute };
};

export const formatDate = (value: string | null | undefined) => {
  const parts = getDateParts(value);
  return parts ? `${parts.year}-${parts.month}-${parts.day}` : "-";
};

export const formatDateTime = (value: string | null | undefined) => {
  const parts = getDateParts(value);
  if (!parts) return "-";

  const time =
    parts.hour && parts.minute ? `${parts.hour}:${parts.minute}` : "00:00";
  return `${parts.year}-${parts.month}-${parts.day} ${time}`;
};
