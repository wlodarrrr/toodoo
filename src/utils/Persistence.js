function convertStringToDate(key, value) {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
  return typeof value === 'string' && isoDateRegex.test(value)
    ? new Date(value)
    : value
}

export function persist(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function load() {
  const retrieved = localStorage.getItem("tasks");
  return retrieved ? JSON.parse(retrieved, convertStringToDate) : [];
}