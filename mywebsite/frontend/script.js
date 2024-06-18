// JavaScript to show packs section
function showPacks() {
    document.getElementById('packsSection').style.display = 'block';
    document.querySelector('main').style.display = 'none';
}

// Card library
const cardLibrary = [
    'pics/Card1.png',
    'pics/Card2.webp',
    'pics/Card3.webp',
    'pics/Card4.webp',
    'pics/Card5.webp',
    'pics/Card6.webp',
    'pics/Card7.webp',
    'pics/Card8.webp',
    'pics/Card9.webp',
    'pics/Card10.webp'
];

// Function to show popup with random Card images
function showPopup() {
    // Select 5 random cards
    const selectedCards = getRandomCards(cardLibrary, 5);

    // Clear previous popup content
    const popupContent = document.getElementById('popupContent');
    popupContent.innerHTML = '<h3>Select a Card</h3>';

    // Add selected cards to popup
    selectedCards.forEach(card => {
        const img = document.createElement('img');
        img.src = card;
        img.onclick = function() { selectCard(card); };
        popupContent.appendChild(img);
    });

    // Display the popup
    document.getElementById('popup').style.display = 'block';
}

// Function to get random cards from the library
function getRandomCards(array, num) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
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

// Add event listeners to PACKIMG elements
document.addEventListener('DOMContentLoaded', function() {
    let packImgs = document.querySelectorAll('.pack-img');
    packImgs.forEach(img => {
        img.addEventListener('click', function() {
            if (!this.classList.contains('selected')) {
                // Remove 'clicked' class from all images
                packImgs.forEach(i => i.classList.remove('clicked'));
                // Add 'clicked' class to the currently clicked image
                this.classList.add('clicked');
                // Show the popup with random Card images
                showPopup();
            }
        });
    });
});
