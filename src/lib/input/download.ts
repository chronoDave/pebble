export type File = {
  name: string;
  data: string;
};

export default (file: File): void => {
  const blob = new Blob([file.data], { type: 'text/plain' });
  const a = document.createElement('a');

  a.href = URL.createObjectURL(blob);
  a.download = file.name;
  a.click();

  URL.revokeObjectURL(a.href);
};
