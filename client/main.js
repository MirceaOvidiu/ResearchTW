/*const { text } = require("body-parser");

const getResearchPapers = async () => {
  const res = await axios.get("http://localhost:5000/");
  console.log(res.data);
  return res.data;
};

getResearchPapers();

let selectedCategory = "";

const selectedOptions = [];

function selectCategory(category) {
  selectedCategory = category;
  displaySelectedCategory();
}

function displaySelectedCategory() {
  const chosenCategoryDiv = document.getElementById("chosenCategory");
  chosenCategoryDiv.textContent = `Chosen Category: ${selectedCategory}`;
}

function submitOption() {
  if (selectedCategory) {
    console.log(`Chosen Option: ${selectedCategory}`);

    selectedOptions.push(selectedCategory);

    // Store the updated selectedOptions array in localStorage
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
  } else {
    console.log("Please select a category before submitting.");
  }
}

function displaySubmittedOptions() {
  const submittedOptionsDiv = document.getElementById("submittedOptions");

  // Retrieve the selectedOptions array from localStorage
  const storedOptions =
    JSON.parse(localStorage.getItem("selectedOptions")) || [];

  submittedOptionsDiv.textContent = `Selected Options: ${storedOptions.join(
    ", "
  )}`;
}

function toggleDropdown() {
  const dropdownContent = document.querySelector(".dropdown-content");
  dropdownContent.classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (const dropdown of dropdowns) {
      if (dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
      }
    }
  }
};
*/
