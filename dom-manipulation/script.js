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

async function postQuoteToServer(quote) {
  try {
    let response = await fetch(POST_SERVER_URL, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(quote) 
    });

    if (!response.ok) {
      throw new Error("Failed to post quote to the server");
    }

    let serverResponse = await response.json();
    console.log("Quote posted successfully:", serverResponse);

    
    displayNotification("Quote successfully posted to server.");
  } catch (error) {
    console.error("Error posting quote to server:", error);
    displayNotification("Failed to post quote to server.");
  }
}


function addQuoteAndPost(text, category) {
  let newQuote = { text, category };  
  quotes.push(newQuote);
  saveQuotes(); 
  postQuoteToServer(newQuote);
  displayQuote(newQuote);
}

document.getElementById("addQuoteButton").addEventListener("click", () => {
  let text = document.getElementById("newQuoteText").value;
  let category = document.getElementById("newQuoteCategory").value;
  if (text && category) {
  addQuoteAndPost(text, category);
  }
});


