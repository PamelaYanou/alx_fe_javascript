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
 let randomIndex = Math.floor(Math.random() * quotes.length);
  let randomQuote = quotes[randomIndex];
  let quoteDisplay = document.getElementById("quoteDisplay");

   quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><p><em>- Category: ${randomQuote.category}</em></p>`;
}


function addQuote() {
  let newQuoteText = document.getElementById("newQuoteText").value.trim();
  let newQuoteCategory = document
    .getElementById("newQuoteCategory")
    .value.trim();

  if (newQuoteText === "" || newQuoteCategory === "") {
    alert("Please enter both a quote and a category.");
    return;
  }

   let newQuote = { text: newQuoteText, category: newQuoteCategory };
  quotes.push(newQuote);

    document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

   showRandomQuote();
}

document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.addEventListener("DOMContentLoaded", showRandomQuote);
