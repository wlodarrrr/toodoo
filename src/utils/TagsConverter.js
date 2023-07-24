export function convertTagsToString(tags) {
  if (!tags || tags.length === 0) {
    return '';
  }
  return tags.join(' ');
}

export function convertStringToTags(string) {
  if (!string) {
    return [];
  }

  const content = string;
  content.trim();
  if (content.length === 0) {
    return [];
  }

  return content.split(' ');
}