// JavaScript to show packs section
function showPacks() {
    document.getElementById('packsSection').style.display = 'block';
    document.querySelector('main').style.display = 'none';
}

// Function to show popup with Card images
function showPopup(packImage) {
    // Display the popup
    document.getElementById('popup').style.display = 'block';
}

// Function to select a Card image
function selectCard(cardImage) {
    // Update the clicked PACKIMG with the selected Card1 image
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
                // Show the popup with Card images
                showPopup(this.alt);
            }
        });
    });
});
