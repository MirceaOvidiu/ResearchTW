const button = document.querySelector("button");
const select = document.querySelector("select");
const input_rating = document.querySelector(".slider");
const input_price = document.querySelector(".slider_pret");
const span_rating = document.querySelector(".rating");
const span_price = document.querySelector(".price");
const main = document.querySelector("main");
const loading = document.querySelector("#loading");
const result = document.querySelector(".result");

// !values

let rating;
let option;
let max_price;
const page = main.innerHTML;

span_price.innerHTML = input_price.value;
span_rating.innerHTML = input_rating.value;

input_rating.addEventListener("input", (e) => {
  rating = e.target.value;
  span_rating.innerHTML = rating;
});

select.addEventListener("change", () => {
  option = select.value;
});

input_price.addEventListener("input", (e) => {
  max_price = e.target.value;
  span_price.innerHTML = max_price;
});

button.addEventListener("click", () => {
  main.style.display = "none";
  loading.style.display = "flex";
  result.innerHTML = "";
  result;
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
    element.price = element.price.replace(".", "");
    const price = parseFloat(element.price);
    if (price <= max_price) {
      result.push(element);
    }
  });

  number = document.querySelector(".result_number");
  number.innerHTML = result.length + " products found";
  return result;
};

const putInHtml = (data) => {
  data = sort(data);

  data.forEach((element) => {
    result.innerHTML += `
    <div class="card">
    <a href="${element.link}" target="_blank">
      <img src="${element.img}" alt="Avatar" style="width:100%">
    </a>
      <div class="container">
        <a href="${element.link}" target="_blank">
          <h4>${element.name}</h4>
        </a>
        <p>${element.price} Lei</p>
        <p>Rating: ${element.rating}/5 ★</p>
      </div>
    </div>
    `;
  });
  loading.style.display = "none";
  main.style.display = "block";
};
