export const formatTime = (timestamp) => {
  const date = timestamp ? new Date(timestamp * 1000) : new Date();
  if (date) {
    return new Intl.DateTimeFormat("ru-RU", {
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  }
};
