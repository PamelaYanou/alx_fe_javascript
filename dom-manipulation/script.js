let quotes = [
  {
    text: "Happiness is not something ready-made. It comes from your own actions.",
    category: "Happiness",
  },
  {
    text: "Opportunities don't happen, you create them.",
    category: "Success",
  },
  {
    text: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    category: "Wisdom",
  },
];

function showRandomQuote() {
  let  randomIndex = Math.floor(Math.random() * quotes.length);
  let randomQuote = quotes[randomIndex];
 let quoteDisplay = document.getElementById("quoteDisplay");

   quoteDisplay.innerHTML = `"${randomQuote.text}" <br> <em>- Category: ${randomQuote.category}</em>`;
}

function createAddQuoteForm() {
   let form = document.createElement("form");
  form.id = "createAddQuoteForm";

  let inputText = document.createElement("input");
  inputText.type = "text";
  inputText.id = "newQuoteText";
  inputText.placeholder = "Enter a new quote";

let inputCategory = document.createElement("input");
  inputCategory.type = "text";
  inputCategory.id = "newQuoteCategory";
  inputCategory.placeholder = "Enter quote category";

  let addButton = document.createElement("button");
  addButton.type = "button";
  addButton.textContent = "Add Quote";
  addButton.onclick = addQuote; 

  form.appendChild(inputText);
  form.appendChild(inputCategory);
  form.appendChild(addButton);
 
  document.body.appendChild(form);
}

function addQuote() {
  let newQuoteText = document.getElementById("newQuoteText").value.trim();
  let newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

   if (newQuoteText === "" || newQuoteCategory === "") {
    alert("Please enter both the quote and its category.");
    return;
  }

   quotes.push({ text: newQuoteText, category: newQuoteCategory });

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
  showRandomQuote();
}

document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.addEventListener("DOMContentLoaded", () => {
  showRandomQuote();     
  createAddQuoteForm();   
});
