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
  loadQuotesFromLocalStorage();
  syncQuotes(); 
});

async function syncQuotes() {
  try {
    let response = await fetch(SERVER_URL);
    if (!response.ok) throw new Error("Failed to fetch quotes from server");
    let serverQuotes = await response.json();
    resolveConflicts(serverQuotes);

      quotes.forEach((quote) => {
      if (!quote.synced) {
        postQuoteToServer(quote);
        quote.synced = true; 
      }
    });
        
    localStorage.setItem("quotes", JSON.stringify(quotes));
  } catch (error) {
    console.error("Error during sync:", error);
  }
}

function resolveConflicts(serverQuotes) {
  let updated = false;
  serverQuotes.forEach((serverQuote) => {
  let localQuote = quotes.find((q) => q.text === serverQuote.text);

    if (!localQuote) {
    quotes.push({ ...serverQuote, synced: true });
      updated = true;
    } else if (localQuote.category !== serverQuote.category) {
     localQuote.category = serverQuote.category;
      updated = true;
    }
  });

  if (updated) {
    localStorage.setItem("quotes", JSON.stringify(quotes));
    displayNotification("Quotes have been updated based on server data.");
  }
}

async function postQuoteToServer(quote) {
  try {
    let response = await fetch(SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quote),
    });

    if (!response.ok) throw new Error("Failed to post quote to server");
    console.log("Quote posted successfully:", await response.json());
  } catch (error) {
    console.error("Error posting quote:", error);
  }
}

function addQuote(text, category) {
  let newQuote = { text, category, synced: false };
  quotes.push(newQuote);
  localStorage.setItem("quotes", JSON.stringify(quotes));
  syncQuotes(); 
}

function displayNotification(message) {
  alert(message); 
}

function loadQuotesFromLocalStorage() {
  quotes = JSON.parse(localStorage.getItem("quotes")) || [];
  quotes.forEach((quote) => displayQuote(quote));
}

function displayQuote(quote) {
  let quoteDisplay = document.getElementById("quoteDisplay");
 let quoteElement = document.createElement("p");
  quoteElement.textContent = `"${quote.text}" - ${quote.category}`;
  quoteDisplay.appendChild(quoteElement);
}

setInterval(syncQuotes, 60000);

