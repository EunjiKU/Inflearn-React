export const deleteToast = (id, toasts, setToastRerender) => {
  const filteredToasts = toasts.current.filter((toast) => {
    return toast.id !== id;
  })
  toasts.current = filteredToasts;
  setToastRerender(prev => !prev);
}