// JavaScript to show packs section
function showPacks() {
    document.getElementById('packsSection').style.display = 'block';
    document.querySelector('main').style.display = 'none';
}

// Function to show popup with Card1 images
function showPopup(packImage) {
    // Display the popup
    document.getElementById('popup').style.display = 'block';
}

// Function to select a Card1 image
function selectCard1(card1Image) {
    // Update the clicked PACKIMG with the selected Card1 image
    let clickedPackImg = document.querySelector('.pack-img.clicked');
    clickedPackImg.src = card1Image;
    clickedPackImg.classList.add('selected');
    // Hide the popup
    document.getElementById('popup').style.display = 'none';
}

// Add event listeners to PACKIMG elements
document.addEventListener('DOMContentLoaded', function() {
    let packImgs = document.querySelectorAll('.pack-img');
    packImgs.forEach(img => {
        img.addEventListener('click', function() {
            // Remove 'clicked' class from all images
            packImgs.forEach(i => i.classList.remove('clicked'));
            // Add 'clicked' class to the currently clicked image
            this.classList.add('clicked');
            // Show the popup with Card1 image
            showPopup(this.alt);
        });
    });
});
