export default () => {
  let state: string | null = null;

  return {
    getItem: (id: string) => state,
    setItem: (id: string, next: string) => {
      state = next
    }
  }
}
