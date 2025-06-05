export const showDialog = (id: string) => {
  const dialog = document.getElementById(id) as HTMLDialogElement | null;
  dialog?.showModal();
};
