
// Initialize the quotes array
let quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
  { text: "Stay hungry, stay foolish.", category: "Inspiration" }
];

function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  
  // Select a random index
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Clear previous content and add new quote
  quoteDisplay.innerHTML = ""; // Clear existing
  
  const quoteText = document.createElement("p");
  quoteText.textContent = `"${randomQuote.text}"`;
  
  const quoteCategory = document.createElement("em");
  quoteCategory.textContent = ` - Category: ${randomQuote.category}`;

  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
}

// Attach event listener to the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

function createAddQuoteForm() {
  const formContainer = document.createElement("div");
  formContainer.id = "addQuoteForm";

  // Create Quote Text Input
  const textInput = document.createElement("input");
  textInput.id = "newQuoteText";
  textInput.type = "text";
  textInput.placeholder = "Enter a new quote";

  // Create Category Input
  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  // Create Add Button
  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  
  // Attach event to the button
  addButton.onclick = addQuote;

  // Append items to container and then to the body
  formContainer.appendChild(textInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);
  
  document.body.appendChild(formContainer);
}

// Function to handle adding the quote to the array
function addQuote() {
  const text = document.getElementById("newQuoteText").value;
  const category = document.getElementById("newQuoteCategory").value;

  if (text && category) {
    quotes.push({ text, category });
    
    // Clear the inputs
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    
    alert("Quote added successfully!");
  } else {
    alert("Please fill in both fields.");
  }
}

// Call this to ensure the form appears when the page loads
createAddQuoteForm();

// 1. Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// 2. Modify the addQuote function to include saveQuotes()
function addQuote() {
  const text = document.getElementById("newQuoteText").value;
  const category = document.getElementById("newQuoteCategory").value;

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes(); // Persistence!
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    alert("Quote added!");
  }
}

// 3. Load quotes from local storage on startup
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

// Run this at the very top of your script
loadQuotes();

function exportToJson() {
  const dataStr = JSON.stringify(quotes);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'quotes.json';
  link.click();
  
  // Clean up the URL object
  URL.revokeObjectURL(url);
}
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      // Use the spread operator to add imported quotes to the existing array
      quotes.push(...importedQuotes);
      saveQuotes(); // Save to local storage
      alert('Quotes imported successfully!');
      showRandomQuote(); // Optional: show one of the new quotes
    } catch (e) {
      alert("Error parsing JSON file. Please ensure it is a valid format.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}