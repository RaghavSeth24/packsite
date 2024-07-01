// JavaScript to show packs section
function showPacks() {
    document.getElementById('packsSection').style.display = 'block';
    document.querySelector('main').style.display = 'none';
}

// Card library with traits
const cardLibrary = [
    { src: 'pics/Card1.png', traits: ['PG', 'SG'], selected: false },
    { src: 'pics/Card2.webp', traits: ['PG', 'SG'], selected: false },
    { src: 'pics/Card3.webp', traits: ['PG', 'SG'], selected: false },
    { src: 'pics/Card4.webp', traits: ['SG', 'SF'] },
    { src: 'pics/Card5.webp', traits: ['SF'], selected: false },
    { src: 'pics/Card6.webp', traits: ['PF', 'C'], selected: false },
    { src: 'pics/Card7.webp', traits: ['PF', 'C'], selected: false },
    { src: 'pics/Card8.webp', traits: ['PF', 'C'], selected: false },
    { src: 'pics/Card9.webp', traits: ['SF', 'PF'], selected: false },
    { src: 'pics/Card10.webp', traits: ['PG', 'SG'], selected: false },
    { src: 'pics/Card11.webp', traits: ['PG', 'SG'], selected: false },
    { src: 'pics/Card12.webp', traits: ['PG', 'SG'], selected: false },
    { src: 'pics/Card13.webp', traits: ['PG', 'SG'], selected: false },
    { src: 'pics/Card14.webp', traits: ['PG'], selected: false },
    { src: 'pics/Card15.webp', traits: ['PG', 'SG'], selected: false },
    { src: 'pics/Card16.webp', traits: ['PG', 'SF'], selected: false },
    { src: 'pics/Card17.webp', traits: ['SG', 'SF'], selected: false },
    { src: 'pics/Card18.webp', traits: ['SG', 'SF'], selected: false },
    { src: 'pics/Card19.webp', traits: ['PF'], selected: false },
    { src: 'pics/Card20.webp', traits: ['PG', 'SG'], selected: false },
    { src: 'pics/Card21.webp', traits: ['PG', 'SG'], selected: false },
    { src: 'pics/Card22.webp', traits: ['SG', 'SF'], selected: false },
    { src: 'pics/Card23.webp', traits: ['PG', 'SG'], selected: false },
    { src: 'pics/Card24.webp', traits: ['PF', 'C'], selected: false },
    { src: 'pics/Card25.webp', traits: ['PG', 'SG'], selected: false },
    { src: 'pics/Card26.webp', traits: ['SG', 'SF'], selected: false },
    { src: 'pics/Card27.webp', traits: ['PG', 'SG'], selected: false },
    { src: 'pics/Card28.webp', traits: ['SF', 'PF'], selected: false },
    { src: 'pics/Card29.webp', traits: ['PF', 'C'], selected: false },
    { src: 'pics/Card30.webp', traits: ['SG', 'SF'], selected: false },
    { src: 'pics/Card31.webp', traits: ['PF', 'C'], selected: false },
    { src: 'pics/Card32.webp', traits: ['PF', 'C'], selected: false },
    { src: 'pics/Card33.webp', traits: ['PF', 'C'], selected: false },
    { src: 'pics/Card34.webp', traits: ['SF', 'SG'], selected: false },
    { src: 'pics/Card35.webp', traits: ['C', 'PF'], selected: false },
    { src: 'pics/Card36.webp', traits: ['SF', 'SG'], selected: false },
    { src: 'pics/Card37.webp', traits: ['C', 'PF'], selected: false },
    { src: 'pics/Card38.png', traits: ['SF', 'SG'], selected: false },
    { src: 'pics/Card39.webp', traits: ['SF', 'SG'], selected: false },
    { src: 'pics/Card40.png', traits: ['C', 'PF'], selected: false },
    { src: 'pics/Card41.png', traits: ['SF', 'SG'], selected: false },
    { src: 'pics/Card42.png', traits: ['C', 'PF'], selected: false },
    { src: 'pics/Card43.png', traits: ['C', 'PF'], selected: false },
    { src: 'pics/Card44.png', traits: ['C', 'PF'], selected: false },
    { src: 'pics/Card46.webp', traits: ['SF', 'SG'], selected: false },
    { src: 'pics/Card47.webp', traits: ['SF', 'SG'] },
    { src: 'pics/Card48.webp', traits: ['PF', 'SF'] }
];

// Function to show popup with filtered Card images
function showPopup(trait) {
    // Filter cards based on the trait
    const filteredCards = cardLibrary.filter(card => card.traits.includes(trait));
    const selectedCards = getRandomCards(filteredCards, 5);

    // Clear previous popup content
    const popupContent = document.getElementById('popupContent');
    popupContent.innerHTML = '<h3>Select a Card</h3>';

    // Add selected cards to popup
    selectedCards.forEach(card => {
        const img = document.createElement('img');
        img.src = card.src;
        img.onclick = function() { selectCard(card.src); };
        popupContent.appendChild(img);
    });

    // Display the popup
    document.getElementById('popup').style.display = 'block';
}

// Function to get random cards from the library
function getRandomCards(array, num) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(num, shuffled.length));
}

// Function to select a Card image
function selectCard(cardImage) {
    // Update the clicked PACKIMG with the selected Card image
    let clickedPackImg = document.querySelector('.pack-img.clicked');
    clickedPackImg.src = cardImage;
    clickedPackImg.classList.add('selected');
    // Disable further clicks on the selected packimg
    clickedPackImg.onclick = null;
    // Hide the popup
    document.getElementById('popup').style.display = 'none';
}

// Function to fetch and display news articles using RSS feed
const rssFeedUrl = 'https://www.espn.com/espn/rss/nba/news'; // Example RSS feed URL from ESPN

document.addEventListener('DOMContentLoaded', function() {
    // Check if the current page is 'news.html' and fetch news articles if so
    if (window.location.pathname.includes('news.html')) {
        fetchNewsArticles(); // Fetch and display news articles
    }
});

function fetchNewsArticles() {
    fetch(rssFeedUrl)
        .then(response => response.text())
        .then(xmlText => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
            const items = xmlDoc.querySelectorAll('item');
            const articles = [];

            items.forEach(item => {
                const title = item.querySelector('title').textContent;
                const description = item.querySelector('description').textContent;
                const link = item.querySelector('link').textContent;
                const imageUrl = item.querySelector('enclosure') ? item.querySelector('enclosure').getAttribute('url') : '';

                articles.push({ title, description, link, imageUrl });
            });

            displayNewsArticles(articles);
        })
        .catch(error => {
            console.error('Error fetching RSS feed:', error);
            displayErrorMessage();
        });
}

function displayNewsArticles(articles) {
    const newsContainer = document.getElementById('news-articles');
    newsContainer.innerHTML = '';

    if (articles.length === 0) {
        displayErrorMessage();
        return;
    }

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('news-article');

        if (article.imageUrl) {
            const articleImage = document.createElement('img');
            articleImage.src = article.imageUrl;
            articleImage.alt = article.title; // Alt text can be article-specific or a general description
            articleImage.style.width = '400px'; // Set a specific width
            articleImage.style.height = 'auto'; // Maintain aspect ratio
            articleImage.style.display = 'block'; // Prevent inline spacing issues
            articleImage.style.margin = '0 auto'; // Center the image horizontally
            articleElement.appendChild(articleImage);
        }

        const articleTitle = document.createElement('h4');
        articleTitle.textContent = article.title;
        articleElement.appendChild(articleTitle);

        const articleDescription = document.createElement('p');
        articleDescription.textContent = article.description;
        articleElement.appendChild(articleDescription);

        // Chat section
        const chatSection = document.createElement('div');
        chatSection.classList.add('chat-section');

        const chatHeader = document.createElement('h5');
        chatHeader.textContent = 'Comments';
        chatSection.appendChild(chatHeader);

        const commentList = document.createElement('div');
        commentList.classList.add('comment-list');
        chatSection.appendChild(commentList);

        const commentForm = document.createElement('form');
        commentForm.classList.add('comment-form');
        
        const commentInput = document.createElement('input');
        commentInput.type = 'text';
        commentInput.placeholder = 'Write a comment...';
        commentForm.appendChild(commentInput);
        
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Submit';
        commentForm.appendChild(submitButton);

        chatSection.appendChild(commentForm);
        articleElement.appendChild(chatSection);

        newsContainer.appendChild(articleElement);

        // Event listener for submitting comments
        commentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const commentText = commentInput.value;
            if (commentText) {
                const comment = createCommentElement(commentText);
                commentList.appendChild(comment);
                commentInput.value = '';
            }
        });
    });
}

function createCommentElement(text) {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');

    const commentText = document.createElement('p');
    commentText.textContent = text;
    commentElement.appendChild(commentText);

    const replyButton = document.createElement('button');
    replyButton.textContent = 'Reply';
    replyButton.classList.add('reply-button');
    commentElement.appendChild(replyButton);

    const replyForm = document.createElement('form');
    replyForm.classList.add('reply-form');

    const replyInput = document.createElement('input');
    replyInput.type = 'text';
    replyInput.placeholder = 'Write a reply...';
    replyForm.appendChild(replyInput);

    const replySubmitButton = document.createElement('button');
    replySubmitButton.type = 'submit';
    replySubmitButton.textContent = 'Submit';
    replyForm.appendChild(replySubmitButton);

    commentElement.appendChild(replyForm);
    replyForm.style.display = 'none'; // Initially hide the reply form

    // Toggle reply form visibility
    replyButton.addEventListener('click', function() {
        replyForm.style.display = replyForm.style.display === 'none' ? 'block' : 'none';
    });

    // Check if there are existing replies
    let replies = []; // Array to store existing replies

    // Show more button for existing replies
    const showMoreButton = document.createElement('button');
    showMoreButton.textContent = 'Show more';
    showMoreButton.classList.add('show-more-button');
    showMoreButton.style.display = 'none'; // Initially hide 'Show more' button
    commentElement.appendChild(showMoreButton);

    showMoreButton.addEventListener('click', function() {
        replies.forEach(reply => {
            reply.style.display = reply.style.display === 'none' ? 'block' : 'none';
        });
        showMoreButton.textContent = showMoreButton.textContent === 'Show more' ? 'Show less' : 'Show more';
    });

    replyForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const replyText = replyInput.value;
        if (replyText) {
            const reply = createReplyElement(replyText);
            replies.push(reply); // Add the reply to the replies array
            commentElement.appendChild(reply);
            replyInput.value = '';
            replyForm.style.display = 'none';
            // Show 'Show more' button when there are replies
            if (replies.length > 0) {
                showMoreButton.style.display = 'inline-block';
            }
        }
    });

    return commentElement;
}

function createReplyElement(text) {
    const replyElement = document.createElement('div');
    replyElement.classList.add('reply');
    
    const replyText = document.createElement('p');
    replyText.textContent = text;
    replyElement.appendChild(replyText);

    return replyElement;
}


function displayErrorMessage() {
    const newsContainer = document.getElementById('news-articles');
    newsContainer.innerHTML = '<p>Failed to load news articles.</p>';
}

function showHome() {
    // Hide the news section and its content
    document.querySelector('.hero-section').style.display = 'block'; // Show the hero section
    document.querySelector('main').style.display = 'block'; // Show the main content
    document.getElementById('packsSection').style.display = 'none'; // Hide the packs section
    document.getElementById('news-articles').innerHTML = '<p>Loading news articles...</p>'; // Clear news articles content
    document.getElementById('popup').style.display = 'none'; // Hide any open popups if applicable
}

// JavaScript to show news section
function showNews() {
    document.querySelector('.hero-section').style.display = 'none'; // Hide the hero section
    document.getElementById('packsSection').style.display = 'none'; // Hide the packs section

    // Display the main content section
    document.querySelector('main').style.display = 'block';

    // Optionally, you can fetch and display news articles here
    fetchNewsArticles(); // Fetch and display news articles
}


// Add event listeners to PACKIMG elements
document.addEventListener('DOMContentLoaded', function() {
    let packImgs = document.querySelectorAll('.pack-img');
    packImgs.forEach((img, index) => {
        img.addEventListener('click', function() {
            if (!this.classList.contains('selected')) {
                // Remove 'clicked' class from all images
                packImgs.forEach(i => i.classList.remove('clicked'));
                // Add 'clicked' class to the currently clicked image
                this.classList.add('clicked');

                // Show popup based on the pack image clicked
                if (index === 0) { // For Pack Image 1
                    showPopup('PG');
                } else if (index === 1) { // For Pack Image 2
                    showPopup('SG');
                } else if (index === 2) { // For Pack Image 3
                    showPopup('SF');
                } else if (index === 3) { // For Pack Image 4
                    showPopup('PF');
                } else if (index === 4) { // For Pack Image 5
                    showPopup('C');
                } else if (index >= 5 && index <= 12) { // For Pack Image 6 to 13 (index 5 to 12)
                    showRandomCards();
                }
            }
        });
    });
});

// Function to show 5 random cards
function showRandomCards() {
    // Clear previous popup content
    const popupContent = document.getElementById('popupContent');
    popupContent.innerHTML = '<h3>Select a Card</h3>';

    // Get 5 random cards from the library
    const randomCards = getRandomCards(cardLibrary, 5);

    // Add selected cards to popup
    randomCards.forEach(card => {
        const img = document.createElement('img');
        img.src = card.src;
        img.onclick = function() { selectCard(card.src); };
        popupContent.appendChild(img);
    });

    // Display the popup
    document.getElementById('popup').style.display = 'block';
}
