const button = document.querySelector("button");
const select = document.querySelector("select");
const input_rating = document.querySelector(".slider");
const span_rating = document.querySelector(".rating");
const result = document.querySelector(".result");

// !values

let rating;
let option;

input_rating.addEventListener("input", () => {
  console.log(input_rating.value);
  rating = input_rating.value;
  span_rating.innerHTML = rating;
});

select.addEventListener("change", () => {
  console.log(select.value);
  option = select.value;
});

button.addEventListener("click", () => {
  console.log(option, rating);
  axios
    .post("http://127.0.0.1:5000/search", {
      category: option,
      rating: rating,
    })
    .then((response) => {
      console.log(response.data);
      putInHtml(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

const sort = (rangePrice) => {};

const putInHtml = (data) => {
  data.forEach((element) => {
    result.innerHTML += `
    <div class="card">
      <img src="${element.img}" alt="Avatar" style="width:100%">
      <div class="container">
        <h4><b>${element.name}</b></h4>
        <p>${element.category}</p>
        <p>${element.rating}</p>
      </div>
    </div>
    `;
  });
};
