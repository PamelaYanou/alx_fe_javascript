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
async function fetchQuotesFromServer() {
  try {
   let response = await fetch(SERVER_URL);
    if (!response.ok) throw new Error("Failed to fetch quotes from server");

    let serverQuotes = await response.json();
    resolveConflicts(serverQuotes); 
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function postQuoteToServer(quote) {
  try {
    let response = await fetch(SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(quote)
    });
    if (!response.ok) throw new Error("Failed to post quote");

    console.log("Quote posted successfully:", await response.json());
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

function addQuote(text, category) {
 let newQuote = { text, category };
  quotes.push(newQuote);
  localStorage.setItem("quotes", JSON.stringify(quotes));
  postQuoteToServer(newQuote);
}
setInterval(fetchQuotesFromServer, 60000);


function resolveConflicts(serverQuotes) {
  let updated = false;
  serverQuotes.forEach(serverQuote => {
  let localQuote = quotes.find(q => q.text === serverQuote.text);

    if (!localQuote) {
      quotes.push(serverQuote);
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

function displayNotification(message) {
  alert(message); 
}
