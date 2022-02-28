export const getDate = (createdAt) => {
  let date = new Date(createdAt);
  return (
    date
      .toLocaleString("ru", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      .slice(0, -3) +
    " в " +
    date.toLocaleString("ru", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
};
