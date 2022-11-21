export const handleError = (error) => {
  if (error instanceof Error) {
    if (error.message === "canceled") {
      return;
    } else {
      console.log(error.message);
    }
  }
};
