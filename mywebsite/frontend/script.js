// JavaScript to show packs section
function showPacks() {
    document.getElementById('packsSection').style.display = 'block';
    document.querySelector('main').style.display = 'none';
}

// Card library with traits
const cardLibrary = [
    { src: 'pics/Card1.png', traits: ['PG', 'SG'] },
    { src: 'pics/Card2.webp', traits: ['PG', 'SG'] },
    { src: 'pics/Card3.webp', traits: ['PG', 'SG'] },
    { src: 'pics/Card4.webp', traits: ['SG', 'SF'] },
    { src: 'pics/Card5.webp', traits: ['SF'] },
    { src: 'pics/Card6.webp', traits: ['PF', 'C'] },
    { src: 'pics/Card7.webp', traits: ['PF', 'C'] },
    { src: 'pics/Card8.webp', traits: ['PF', 'C'] },
    { src: 'pics/Card9.webp', traits: ['SF', 'PF'] },
    { src: 'pics/Card10.webp', traits: ['PG', 'SG'] },
    { src: 'pics/Card11.webp', traits: ['PG', 'SG'] },
    { src: 'pics/Card12.webp', traits: ['PG', 'SG'] },
    { src: 'pics/Card13.webp', traits: ['PG', 'SG'] },
    { src: 'pics/Card14.webp', traits: ['PG'] },
    { src: 'pics/Card15.webp', traits: ['PG', 'SG'] },
    { src: 'pics/Card16.webp', traits: ['PG', 'SF'] },
    { src: 'pics/Card17.webp', traits: ['SG', 'SF'] },
    { src: 'pics/Card18.webp', traits: ['SG', 'SF'] },
    { src: 'pics/Card19.webp', traits: ['PF'] }
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
    fetchNewsArticles();
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

        newsContainer.appendChild(articleElement);
    });
}

function displayErrorMessage() {
    const newsContainer = document.getElementById('news-articles');
    newsContainer.innerHTML = '<p>Failed to load news articles.</p>';
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
                }
            }
        });
    });
});
