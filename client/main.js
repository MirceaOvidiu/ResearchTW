const button = document.querySelector("button");
const select = document.querySelector("select");

const option = select.options[select.selectedIndex].value;

button.addEventListener("click", () => {
  console.log(option);
  // axios
  //   .post("http://127.0.0.1:5000/search", {
  //     category: option,
  //   })
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
});
