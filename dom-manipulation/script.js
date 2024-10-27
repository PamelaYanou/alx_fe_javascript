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

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

async function fetchQuotesFromServer() {
  try {
    let response = await fetch(SERVER_URL);
    let serverQuotes = await response.json();

      let newQuotes = serverQuotes.slice(0, 5).map(q => ({
      text: q.title, 
      category: "Server" 
    }));

    syncQuotes(newQuotes);
  } catch (error) {
    console.error("Error fetching data from server:", error);
  }
}

function syncQuotes(serverQuotes) {
  
  let uniqueLocalQuotes = quotes.filter(localQuote => 
    !serverQuotes.some(serverQuote => serverQuote.text === localQuote.text)
  );
  quotes = [...serverQuotes, ...uniqueLocalQuotes];
  saveQuotes();
  populateCategories(); 
  displayNotification("Quotes updated from server.");
}

function displayNotification(message) {
  let notification = document.createElement("div");
  notification.textContent = message;
  notification.classList.add("notification");
  
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000); 
}

setInterval(fetchQuotesFromServer, 10000); 

