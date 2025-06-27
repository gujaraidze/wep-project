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

// CSS-ში დაამატეთ:
// .main-games-image.active { outline: 3px solid #0090ff; filter: brightness(1.1); }
// .main-games-circles .circle.active { background: #0090ff !important; transform: scale(1.5); }
