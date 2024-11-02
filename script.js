let titleText = document.getElementById('titleText');
let pyramids = document.getElementById('pyramids');

window.addEventListener('scroll', () => {
    let value = window.scrollY;

    // Move the title text up as you scroll
    titleText.style.marginTop = value * 2.5 + 'px';
    
    // Fade out the pyramids as you scroll down
    const maxScroll = 500; // Adjust this value based on how quickly you want the fade effect to occur
    const opacity = Math.max(1 - value / maxScroll, 0);
    pyramids.style.opacity = opacity;
});

window.addEventListener('scroll', function() {
    const titleText = document.getElementById('titleText');
    const maxScroll = 200;
    const scrollPos = window.scrollY;

    const opacity = Math.max(1 - scrollPos / maxScroll, 0);
    titleText.style.opacity = opacity;
});

window.addEventListener('scroll', function() {
    const bengalCat = document.getElementById('BengalCat');
    const scrollPos = window.scrollY;
    const maxScroll = 200;

    // Translate the cat image upward as you scroll
    const translateY = Math.min(scrollPos * 0.25, maxScroll); 
    bengalCat.style.transform = `translateY(-${translateY}px)`;
});
