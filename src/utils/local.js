
export const setLocal = (video) => {
  const recently = localStorage.getItem("recently")
    ? JSON.parse(localStorage.getItem("recently"))
    : [];

  const exist = recently.some((item) => item._id === video._id);

  !exist &&
    localStorage.setItem("recently", JSON.stringify([...recently, video]));
};

export const getLocal = () => {
  return localStorage.getItem("recently")
    ? JSON.parse(localStorage.getItem("recently"))
    : [];
};
