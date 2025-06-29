// MAIN GAMES CAROUSEL
document.addEventListener('DOMContentLoaded', function() {
    // თამაშების მონაცემები
    const games = [
        {
            bg: 'img/dune.jpg',
            title: 'DUNE AWAKENING',
            price: '$39.99',
            preview: 'img/dune preview.jpg'
        },
        {
            bg: 'img/doom.jpg',
            title: 'DOOM THE DARK AGES',
            price: '$49.99',
            preview: 'img/doom preview.jpg'
        },
        {
            bg: 'img/f1 25.avif',
            title: 'F1 25',
            price: '$59.99',
            preview: 'img/f1 25 preview.avif'
        }
    ];

    let current = 0;
    let interval = null;

    // ელემენტები
    const bgSection = document.getElementById('main-games-bg');
    const titleEl = document.getElementById('main-game-title');
    const priceEl = document.getElementById('main-game-price');
    const previews = document.querySelectorAll('#main-games-previews .main-games-image');
    const dots = document.querySelectorAll('#main-games-dots .circle');
    const leftArrow = document.getElementById('main-games-arrow-left');
    const rightArrow = document.getElementById('main-games-arrow-right');

    function setActive(index) {
        current = index;
        // ფონური სურათი
        bgSection.style.background = `url('${games[index].bg}') center center / cover no-repeat`;
        // სათაური და ფასი
        titleEl.textContent = games[index].title;
        priceEl.textContent = games[index].price;
        // preview-ების აქტიურობა
        previews.forEach((el, i) => {
            if(i === index) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });
        // წერტილების აქტიურობა
        dots.forEach((el, i) => {
            if(i === index) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });
    }

    // preview-ზე დაჭერა
    previews.forEach((el, i) => {
        el.addEventListener('click', () => {
            setActive(i);
            resetInterval();
        });
    });
    // წერტილზე დაჭერა
    dots.forEach((el, i) => {
        el.addEventListener('click', () => {
            setActive(i);
            resetInterval();
        });
    });
    // ისრები
    leftArrow.addEventListener('click', () => {
        setActive((current - 1 + games.length) % games.length);
        resetInterval();
    });
    rightArrow.addEventListener('click', () => {
        setActive((current + 1) % games.length);
        resetInterval();
    });

    // ავტომატური ცვლა
    function startInterval() {
        interval = setInterval(() => {
            setActive((current + 1) % games.length);
        }, 7000);
    }
    function resetInterval() {
        clearInterval(interval);
        startInterval();
    }

    // ინიციალიზაცია
    setActive(0);
    startInterval();
});




// BESTSELLER GAMES CAROUSEL
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('bestseller-games-container');
    const leftArrow = document.getElementById('bestseller-arrow-left');
    const rightArrow = document.getElementById('bestseller-arrow-right');
    
    if (!container || !leftArrow || !rightArrow) return;
    
    let scrollPosition = 0;
    const scrollAmount = 1400; // 1400 200 ერთი თამაშის სიგანე (270px) + gap (30px)
    
    function updateArrowVisibility() {
        // მარცხენა ისრის ჩვენება/დამალვა
        if (scrollPosition <= 0) {
            leftArrow.style.opacity = '0.5';
            leftArrow.style.pointerEvents = 'none';
        } else {
            leftArrow.style.opacity = '1';
            leftArrow.style.pointerEvents = 'auto';
        }
        
        // მარჯვენა ისრის ჩვენება/დამალვა
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (scrollPosition >= maxScroll) {
            rightArrow.style.opacity = '0.5';
            rightArrow.style.pointerEvents = 'none';
        } else {
            rightArrow.style.opacity = '1';
            rightArrow.style.pointerEvents = 'auto';
        }
    }
    
    function scrollLeft() {
        scrollPosition = Math.max(0, scrollPosition - scrollAmount);
        container.style.transform = `translateX(-${scrollPosition}px)`;
        updateArrowVisibility();
    }
    
    function scrollRight() {
        const maxScroll = container.scrollWidth - container.clientWidth;
        scrollPosition = Math.min(maxScroll, scrollPosition + scrollAmount);
        container.style.transform = `translateX(-${scrollPosition}px)`;
        updateArrowVisibility();
    }
    
    // ისრების event listeners
    leftArrow.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        scrollLeft();
    });
    
    rightArrow.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        scrollRight();
    });
    
    // კლავიატურის ღილაკები
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            scrollLeft();
        } else if (e.key === 'ArrowRight') {
            scrollRight();
        }
    });
    
    // ინიციალიზაცია
    updateArrowVisibility();
});


fetch(`https://api.rawg.io/api/games?dates=2025-05-26,2025-06-26&ordering=-added&key=3201a36bbb524226a678e7d1578f3076&page=1&page_size=6`)
        .then(function(response) {
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        });



// New Releases information
