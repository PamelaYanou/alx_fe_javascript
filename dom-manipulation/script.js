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

function populateCategories() {
let categoryFilter = document.getElementById('categoryFilter');
  let uniqueCategories = [...new Set(quotes.map(quote => quote.category))];

  
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

 
  uniqueCategories.forEach(category => {
    let option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
  
 
 let lastSelectedCategory = localStorage.getItem('selectedCategory') || 'all';
  categoryFilter.value = lastSelectedCategory;
  filterQuotes(); 
}


function showRandomQuote() {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  let randomQuote = quotes[randomIndex];
  let quoteDisplay = document.getElementById("quoteDisplay");

 
  sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));

 
  quoteDisplay.innerHTML = `"${randomQuote.text}" <br> <em>- Category: ${randomQuote.category}</em>`;
}


function filterQuotes() {
  let selectedCategory = document.getElementById('categoryFilter').value;
  let filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);

  let quoteDisplay = document.getElementById('quoteDisplay');
  if (filteredQuotes.length > 0) {
    let randomFilteredQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
    quoteDisplay.innerHTML = `"${randomFilteredQuote.text}" <br> <em>- Category: ${randomFilteredQuote.category}</em>`;
  } else {
    quoteDisplay.innerHTML = "No quotes available in this category.";
  }

  
  localStorage.setItem('selectedCategory', selectedCategory);
}


function createAddQuoteForm() {
  let form = document.createElement("form");
  form.id = "createAddQuoteForm";

  letinputText = document.createElement("input");
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

  
  populateCategories();

  
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

 
  filterQuotes();
}


function exportToJsonFile() {
  let dataStr = JSON.stringify(quotes, null, 2);
  let dataBlob = new Blob([dataStr], { type: 'application/json' });
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
        populateCategories(); 
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
 let lastViewedQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
  if (lastViewedQuote) {
    let  quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `"${lastViewedQuote.text}" <br> <em>- Category: ${lastViewedQuote.category}</em>`;
  }
}


document.addEventListener("DOMContentLoaded", () => {
  loadLastViewedQuote(); 
  populateCategories();  
});




