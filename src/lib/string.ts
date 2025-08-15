export const uid = () =>
  `${Date.now().toString(36)}-${Math.round(Math.random() * Number.MAX_SAFE_INTEGER).toString(36)}`;
