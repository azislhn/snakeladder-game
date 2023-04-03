export function response(message, question, answer, type) {
  const payload = { message, question, answer, type };
  return payload;
}
