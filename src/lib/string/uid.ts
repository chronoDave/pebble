export default () => `${Date.now().toString(36)}${Math.round(Math.random() * Number.MIN_SAFE_INTEGER).toString(36)}`;
