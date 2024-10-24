let quotes = JSON.parse(localStorage.getItem("quotes")) || [
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
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}
function showRandomQuote() {
  let  randomIndex = Math.floor(Math.random() * quotes.length);
  let randomQuote = quotes[randomIndex];
 let quoteDisplay = document.getElementById("quoteDisplay");
 sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));
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
  saveQuotes();
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
  showRandomQuote();
}
function exportToJsonFile() {
  let dataStr = JSON.stringify(quotes, null, 2);
 let dataBlob = new Blob([dataStr], { type: "application/json" });
  let url = URL.createObjectURL(dataBlob);

 let downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "quotes.json";
  downloadLink.click();

  URL.revokeObjectURL(url);
}
function importFromJsonFile(event) {
  let fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      let importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format. Please provide an array of quotes.");
      }
    } catch (error) {
      alert("Error reading the JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

document.getElementById("newQuote").addEventListener("click", showRandomQuote);

function loadLastViewedQuote() {
  let lastViewedQuote = JSON.parse(sessionStorage.getItem("lastViewedQuote"));
  if (lastViewedQuote) {
   let quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `"${lastViewedQuote.text}" <br> <em>- Category: ${lastViewedQuote.category}</em>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadLastViewedQuote(); 
  createAddQuoteForm(); 
});