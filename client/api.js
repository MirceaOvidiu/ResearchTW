const button = document.querySelector("button");
const select = document.querySelector("select");
const input_rating = document.querySelector(".slider");
const input_price = document.querySelector(".slider_pret");
const span_rating = document.querySelector(".rating");
const result = document.querySelector(".result");
const span_price = document.querySelector(".price");

// !values

let rating;
let option;
let max_price;

input_rating.addEventListener("change", () => {
  rating = input_rating.value;
  span_rating.innerHTML = rating;
});

select.addEventListener("change", () => {
  option = select.value;
});

input_price.addEventListener("change", () => {
  max_price = input_price.value;
  span_price.innerHTML = max_price;
});

button.addEventListener("click", () => {
  axios
    .post("http://127.0.0.1:5000/search", {
      category: option,
      rating: rating,
    })
    .then((response) => {
      putInHtml(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

const sort = (data) => {
  let result = [];
  data.map((element) => {
    const price = parseInt(element.price);
    if (price <= max_price) {
      console.log(price);
      result.push(element);
    }
  });
  return result;
};

const putInHtml = (data) => {
  data = sort(data);

  data.forEach((element) => {
    result.innerHTML += `
    <div class="card">
      <img src="${element.img}" alt="Avatar" style="width:100%">
      <div class="container">
        <h4><b>${element.name}</b></h4>
        <p>${element.link}</p>
        <p>${element.rating}</p>
      </div>
    </div>
    `;
  });
};
