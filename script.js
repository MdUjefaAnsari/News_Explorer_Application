//  News API access key
const accessKey = "15d8f5da211543d3992bb72a4b024b83";

// Get references to HTML elements
const formElement = document.querySelector("form"); // Get the <form> element
const inputElement = document.getElementById("search-input"); // Get the input element
const searchResults = document.querySelector(".search-results"); // Get the element with class "search-results"
const showMore = document.getElementById("show-more-button"); // Get the "Show More" button
const hideContent2 = document.querySelector(".search-results-2");
const hideContent3 = document.querySelector(".search-results-3");

// Initialize variables
let inputData = ""; // To store the user's input
let page = 1; // To keep track of the current page

// Function to search for news
async function searchNews() {
  // Get the user's input from the input field
  inputData = inputElement.value;

  // Construct the URL to fetch news from News API
  const url = `https://newsapi.org/v2/everything?q=${inputData}&page=${page}&apiKey=${accessKey}`;

  // Fetch data from the News API
  const response = await fetch(url);
  const data = await response.json();

  // Check if the response contains articles
  if (data.articles) {
    const articles = data.articles;

    // Clear the search results if it's the first page
    if (page === 1) {
      searchResults.innerHTML = "";
    }

    // Loop through the search results and display them
    articles.forEach((article) => {
      // Create elements to display each article
      const articleWrapper = document.createElement("div");
      articleWrapper.classList.add("search-result");

      //it will create title
      const articleTitle = document.createElement("h1");
      articleTitle.textContent = article.title;
      articleTitle.style.fontSize = "19px";
      articleTitle.style.padding = "0px 10px 0px 10px";

     

      //it will create description of some content
      const articleContent = document.createElement("p");
      articleContent.textContent = article.content.substring(0, 150) + "...";
      articleContent.style.fontSize = "15px";
      articleContent.style.padding = "0px 10px 0px 10px";

      // Create an image element
      const articleImage = document.createElement("img");
      articleImage.src = article.urlToImage; // Use the article's image URL
      articleImage.alt = article.title;

      const articleLink = document.createElement("a");
      articleLink.href = article.url;
      articleLink.target = "_blank";
      articleLink.textContent = "Read More";

      const articleWrapper1 = document.createElement("section");
    //   articleWrapper1.classList.add("marquee");
      const articleTitleMarq = document.createElement("h4");
      articleTitleMarq.textContent = article.title;

      // Append the article title and link to the search results
      articleWrapper.appendChild(articleImage);
      articleWrapper.appendChild(articleTitle);
      articleWrapper.appendChild(articleContent);
      articleWrapper.appendChild(articleLink);
      searchResults.appendChild(articleWrapper);
      articleWrapper1.appendChild(articleTitleMarq);
    });

    // Increment the page number
    page++;

    // Show the "Show More" button when there are more pages
    showMore.style.display = "block";
    hideContent2.style.display = "none";
    hideContent3.style.display = "none";
  } else {
    // Hide the "Show More" button if there are no more articles
    showMore.style.display = "none";
  }
}

// Function to fetch and display default news
async function fetchAndDisplayDefaultNews() {
  // Construct the URL to fetch default news from News API
  const defaultUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${accessKey}`;

  // Fetch data from the News API
  const defaultResponse = await fetch(defaultUrl);
  const defaultData = await defaultResponse.json();

  // Check if the response contains articles
  if (defaultData.articles) {
    const defaultArticles = defaultData.articles;

    // Loop through the default articles and display them
    defaultArticles.forEach((defaultArticle) => {
      // Create elements to display each article
      const defaultArticleWrapper = document.createElement("div");
      defaultArticleWrapper.classList.add("search-result");

      // Create an image element
      const defaultArticleImage = document.createElement("img");
      defaultArticleImage.src = defaultArticle.urlToImage; // Use the article's image URL
      defaultArticleImage.alt = defaultArticle.title;

      // Create a title element
      const defaultArticleTitle = document.createElement("h1");
      defaultArticleTitle.textContent = defaultArticle.title;
      defaultArticleTitle.style.fontSize = "19px";
      defaultArticleTitle.style.padding = "0px 10px 0px 10px";

      // Create a content snippet element
      const defaultArticleContent = document.createElement("p");
      defaultArticleContent.textContent = defaultArticle.description;
      defaultArticleContent.style.fontSize = "15px";
      defaultArticleContent.style.padding = "0px 10px 0px 10px";

      // Create a link element
      const defaultArticleLink = document.createElement("a");
      defaultArticleLink.href = defaultArticle.url;
      defaultArticleLink.target = "_blank";
      defaultArticleLink.textContent = "Read More";

      // Append the default article elements to the search results
      defaultArticleWrapper.appendChild(defaultArticleImage);
      defaultArticleWrapper.appendChild(defaultArticleTitle);
      defaultArticleWrapper.appendChild(defaultArticleContent);
      defaultArticleWrapper.appendChild(defaultArticleLink);
      searchResults.appendChild(defaultArticleWrapper);
    });
  }
}

// Add an event listener to the form for when it's submitted
formElement.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from submitting
  page = 1; // Reset the page number to 1
  searchNews(); // Perform a new news search
});

// Add an event listener to the "Show More" button
showMore.addEventListener("click", () => {
  searchNews(); // Perform another news search when the button is clicked
});

// Fetch and display default news on page load
window.onload = function () {
  fetchAndDisplayDefaultNews();
};

// -----------------Scroll button-------------------
// Select the element with class "scrollButton"
const toTop = document.querySelector(".scrollButton");

// Add a scroll event listener
window.addEventListener("scroll", () => {
  // Check if the user has scrolled more than 200 pixels
  if (window.pageYOffset > 200) {
    // If scrolled more than 200 pixels, add the "active" class
    toTop.classList.add("active");
  } else {
    // If scrolled 200 pixels or less, remove the "active" class
    toTop.classList.remove("active");
  }
});
