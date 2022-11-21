export const getGoogleFontsList = () => {
  return fetch('/api/fonts')
    .then((res) => res.json())
    .then((res) => {
      return res.items;
    })
    .catch((err) => {
      console.log(err);
    });
};
