let SERVER_URL = "https://jsonplaceholder.typicode.com/posts";

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

document.addEventListener("DOMContentLoaded", () => {
  let NewQuoteButton = document.getElementById("newQuote");
  let DisplayQuotes = document.getElementById("quoteDisplay");
  let AddQuoteButton = document.getElementById("addQuote");
  let categoryFilter = document.getElementById("categoryFilter");
  let categories = ["Happiness", "Success", "Wisdom"];
  
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }

  function showRandomQuote() {
    let randomSelection = Math.floor(Math.random() * quotes.length);
    return quotes[randomSelection];
  }

  function showQuotes(quoteArray) {
    DisplayQuotes.innerHTML = quoteArray
      .map(
        (quote) => `
          <strong>Category:</strong> ${quote.category}
          <p>${quote.text}</p>
        `
      )
      .join("");
  }

  NewQuoteButton.addEventListener("click", () =>
    showQuotes([showRandomQuote()])
  );

  function createAddQuoteForm() {
   let NewQuoteText = document.getElementById("newQuoteText").value;
    let NewQuoteCategory = document.getElementById("newQuoteCategory").value;

    if (NewQuoteText.trim() === "" || NewQuoteCategory.trim() === "") {
      alert("Please enter both text and category.");
      return;
    }

    let newQuote = { text: NewQuoteText, category: NewQuoteCategory };
    quotes.push(newQuote);
    saveQuotes();
    showQuotes([newQuote]);

   let quoteList = document.getElementById("createQuoteForm");
   let listItem = document.createElement("li");
    listItem.textContent = `${newQuote.text} - ${newQuote.category}`;
    quoteList.appendChild(listItem);

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    postNewQuote(newQuote);
  }

  async function fetchQuotesFromServer() {
    try {
      let response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=3"
      );
      let data = await response.json();

      let newQuotes = data.map((post) => ({
        category: "Motivation",
        text: post.title,
      }));

     syncQuotes(newQuotes);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  }

  function syncQuotes(serverQuotes) {
    let localMap = new Map(quotes.map((q) => [q.text, q]));

    serverQuotes.forEach((serverQuote) => {
      if (localMap.has(serverQuote.text)) {
        showConflictModal(serverQuote, localMap.get(serverQuote.text));
      } else {
        localMap.set(serverQuote.text, serverQuote); 
      }
    });

    quotes = Array.from(localMap.values());
    saveQuotes();
    showQuotes(quotes);
  }

  async function postNewQuote(newQuote) {
    try {
     let response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newQuote),
        }
      );

      let result = await response.json();
      console.log("New quote added:", result);
    } catch (error) {
      console.error("Error adding new quote:", error);
    }
  }

  function exportToJson() {
    let json = JSON.stringify(quotes, null, 2);
    let blob = new Blob([json], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function importFromJsonFile(event) {
    let fileReader = new FileReader();
    fileReader.onload = function (event) {
      try {
        let importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
        showQuotes(quotes);
      } catch (error) {
        alert("Invalid JSON file.");
      }
    };
    fileReader.readAsText(event.target.files[0]);
  }

  function populateCategories(categories) {
    categories.forEach((category) => {
      let option = document.createElement("option");
      option.value = category.toLowerCase();
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }

  function filterQuotes() {
    let selectedCategory = categoryFilter.value;
    let filteredQuotes = quotes.filter(
      (quote) =>
        selectedCategory === "all" ||
        quote.category.toLowerCase() === selectedCategory
    );
    showQuotes(filteredQuotes);
  }

  let conflictModal = document.getElementById("conflictModal");
  let conflictText = document.getElementById("conflictText");
  let keepLocalButton = document.getElementById("keepLocal");
  let keepServerButton = document.getElementById("keepServer");

  function showConflictModal(conflictQuote, localQuote) {
    conflictText.textContent = `Conflict detected for quote: "${conflictQuote.text}". 
    Local Version: "${localQuote.text}". Choose which version to keep.`;
    conflictModal.style.display = "block";

    keepLocalButton.onclick = () => {
      conflictModal.style.display = "none"; 
    };

    keepServerButton.onclick = () => {
      let index = quotes.findIndex((q) => q.text === localQuote.text);
      if (index !== -1) {
        quotes[index] = conflictQuote; 
        saveQuotes();
        showQuotes(quotes);
        alert("Quotes synced with server!");
      }
      conflictModal.style.display = "none";
    };
  }

  populateCategories(categories);
  document.getElementById("exportBtn").addEventListener("click", exportToJson);
  document
    .getElementById("importFile")
    .addEventListener("change", importFromJsonFile);
  categoryFilter.addEventListener("change", filterQuotes);
  showQuotes([showRandomQuote()]);

  fetchQuotesFromServer();
  setInterval(fetchQuotesFromServer, 15000);

  AddQuoteButton.addEventListener("click", createAddQuoteForm);
});



