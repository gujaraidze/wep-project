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



//new releases

// document.addEventListener('DOMContentLoaded', function() {
//     const page = 1;

//     fetch(`https://api.rawg.io/api/games?dates=2025-05-26,2025-06-26&ordering=-added&key=3201a36bbb524226a678e7d1578f3076&page=${page}&page_size=6`)
//     .then(function(response) {
//         if (response.status !== 200) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             return response.json();
//         })
//     .then(function(info) {
//         info.results.slice(0, 6).forEach((game, index) => {
//             const gameNumber = index + 1;
//             const imgElement = document.querySelector(`#New-Releases-game-${gameNumber} img`);
//             const nameElement = document.querySelector(`#New-Releases-game-${gameNumber} .New-Releases-game-name`);
//             if (nameElement) {
//                 nameElement.textContent = game.name;
//                 imgElement.src = game.background_image;
//             };      
//         }) 
//     })
//     .catch(function(error) {
//         console.error('Error fetching new releases:', error);
//     });
// });


// // genres

// document.addEventListener('DOMContentLoaded', function() {
//     const genres = [
//         "action",
//         "shooter",
//         "role-playing-games-rpg",
//         "sports",
//         "indie",
//         "strategy",
//         "racing",
//         "fighting"
//     ];
    
//     const usedImages = new Set();

//     genres.forEach((genre, index) => {
//         fetch(`https://api.rawg.io/api/games?genres=${genre}&dates=2020-01-01,2025-12-31&ordering=-released,-rating&key=3201a36bbb524226a678e7d1578f3076&page=1&page_size=7`)
//         .then(function(response) {
//             if (response.status !== 200) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(function(data) {
//             const gameNumber = index + 1;
//             const imgElement = document.querySelector(`#game-genre-${gameNumber} img`);
//             const uniqueGame = data.results.find(game => 
//                 game.background_image && !usedImages.has(game.background_image)
//             );
//             if (uniqueGame && imgElement) {
//                 imgElement.src = uniqueGame.background_image;
//                 usedImages.add(uniqueGame.background_image);
//             } else if (imgElement) {
//                 imgElement.src = 'img/placeholder-600x400.png';
//             }
//         })
//         .catch(function(error) {
//             console.error('Error fetching genre games:', error);
//         });
//     });
// });


// // popular

// document.addEventListener('DOMContentLoaded', function() {
//     const page = 1;

//     fetch(`https://api.rawg.io/api/games?dates=2025-01-26,2025-05-26&ordering=-added&key=3201a36bbb524226a678e7d1578f3076&page=${page}&page_size=6`)
//     .then(function(response) {
//         if (response.status !== 200) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             return response.json();
//         })
//     .then(function(info) {
//         info.results.slice(0, 6).forEach((game, index) => {
//             const gameNumber = index + 1;
//             const imgElement = document.querySelector(`#popular-game-${gameNumber} img`);
//             const nameElement = document.querySelector(`#popular-game-${gameNumber} .popular-game-name`);
//             if (nameElement) {
//                 nameElement.textContent = game.name;
//                 imgElement.src = game.background_image;
//             };      
//         }) 
//     })
//     .catch(function(error) {
//         console.error('Error fetching new releases:', error);
//     });
// });

// // best seller 

// document.addEventListener('DOMContentLoaded', function() {
//     const page = 1;

//     fetch(`https://api.rawg.io/api/games?&ordering=-added&key=3201a36bbb524226a678e7d1578f3076&page=${page}&page_size=14`)
//     .then(function(response) {
//         if (response.status !== 200) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             return response.json();
//         })

//     .then(function(info) {
//         info.results.slice(0, 14).forEach((game, index) => {
//             const gameNumber = index + 1;
//             const imgElement = document.querySelector(`#bestseller-game-${gameNumber} img`);
//             const nameElement = document.querySelector(`#bestseller-game-${gameNumber} .bestseller-game-name`);
//             if (nameElement) {
//                 nameElement.textContent = game.name;
//                 imgElement.src = game.background_image;
//             };      
//         }) 
//     })
//     .catch(function(error) {
//         console.error('Error fetching new releases:', error);
//     });
// });



// //pre order
// document.addEventListener('DOMContentLoaded', function() {
//     const page = 1;

// const today = new Date();
// const future = new Date();
// future.setDate(today.getDate() + 120); // 90 days ahead

// const start = today.toISOString().split("T")[0];
// const end = future.toISOString().split("T")[0];

// fetch(`https://api.rawg.io/api/games?key=3201a36bbb524226a678e7d1578f3076&dates=${start},${end}&ordering=-added&page=${page}&page_size=5`)
// .then(function(response) {
//     if (response.status !== 200) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//     })

// .then(function(info) {
//     info.results.slice(0, 5).forEach((game, index) => {
//         const gameNumber = index + 1;
//         const imgElement = document.querySelector(`#pre-orders-game-${gameNumber}`);
//         const nameElement = document.querySelector(`#pre-orders-game-${gameNumber} .pre-orders-game-name`);
//         if (nameElement) {
//             nameElement.textContent = game.name;
//             imgElement.style.backgroundImage = `url("${game.background_image}")`;
//         };      
//     }) 
// })
// .catch(function(error) {
//     console.error('Error fetching new releases:', error);
// });
// });



// //deals
// // CheapShark API for game deals and images from RAWG API

// document.addEventListener('DOMContentLoaded', function () {
//     fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15&pageSize=12')
//       .then(function (response) {
//         if (response.status !== 200) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json(); 
//       })

//         .then(function (data) {
//         data.slice(0, 12).forEach((game, index) => {
//             const gameNumber = index + 1;
//             const dealBlock = document.querySelector(`#game-deal-${gameNumber}`);
//             const imgElement = dealBlock.querySelector(`img`);
//             const nameElement = document.querySelector(`#game-deal-${gameNumber} .game-deal-name`);
//             const gamePrice = document.querySelector(`#game-deal-${gameNumber} .game-deal-final-price`)
//             const gameDiascount = document.querySelector(`#game-deal-${gameNumber} .game-deal-discount`)
//             const previousPrice = document.querySelector(`#game-deal-${gameNumber} .game-deal-previous-price`)
//             if (nameElement) {
//                 nameElement.textContent = game.title;
//                 gamePrice.textContent = game.salePrice + '$';
//                 previousPrice.textContent = game.normalPrice;
//                 gameDiascount.textContent ='-' + Math.floor(game.savings) + '%';
                
//                 fetch(`https://api.rawg.io/api/games?&key=3201a36bbb524226a678e7d1578f3076&search=${encodeURIComponent(game.title)}&page_size=1`)
//                 .then (response => response.json())

//                 .then (function (data) {
//                     imgElement.src = data.results[0].background_image;
//                 });
//             };      
//         }) 
//     })
//       .catch(function (error) {
//         console.error('Error fetching CheapShark deals:', error);
//       });
//   });




// ScrollReveal animations  

ScrollReveal().reveal('.New-Releases-games' , {
    delay: 300,
    distance: '50px',
    easing: 'ease-in-out',
    origin: 'bottom',
});

ScrollReveal().reveal('.game-genres' , {
    delay: 300,
    distance: '50px',
    easing: 'ease-in-out',
    origin: 'bottom',
});

ScrollReveal().reveal('.popular-games' , {
    delay: 300,
    distance: '50px',
    easing: 'ease-in-out',
    origin: 'bottom',
});

ScrollReveal().reveal('.bestseller-games' , {
    delay: 300,
    distance: '50px',
    easing: 'ease-in-out',
    origin: 'bottom',
});

ScrollReveal().reveal('.game-deals' , {
    delay: 300,
    distance: '50px',
    easing: 'ease-in-out',
    origin: 'bottom',
});

ScrollReveal().reveal('.pre-orders' , {
    delay: 300,
    distance: '50px',
    easing: 'ease-in-out',
    origin: 'bottom',
});

ScrollReveal().reveal('.game-reviews' , {
    delay: 300,
    distance: '50px',
    easing: 'ease-in-out',
    origin: 'bottom',

});

//



/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId)
 
    toggle.addEventListener('click', () =>{
        // Add show-menu class to nav menu
        nav.classList.toggle('show-menu')
 
        // Add show-icon to show and hide the menu icon
        toggle.classList.toggle('show-icon')
    })
 }
 
 showMenu('nav-toggle','nav-menu')




//  form validation

const form = document.getElementById('form');

const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const container = document.querySelector('.form-container');
const overlay = document.querySelector('.modal-blur');
const signInBtn = document.getElementById('sign-in-buttn');
const closeBtn = document.getElementById('form-close-btn');

signInBtn.addEventListener('click', () => {
  container.style.display = 'block';
  overlay.classList.add('active');
});

function closeModal() {
  container.style.display = 'none';
  overlay.classList.remove('active');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  checkInputs();
});

const checkInputs = () => {
  // Get values from the inputs
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();
  
  if(!usernameValue) {
    //Show error    
    //Add error class
    setErrorFor(username, 'Username cannot be blank');
  } else {
    //Add succes class
    setSuccessFor(username);
  }
  
  if(!emailValue) {
    //Show error    
    //Add error class
    setErrorFor(email, 'Email cannot be blank');
  } else if(!isEmail(emailValue)) {
    //Show error    
    //Add error class
    setErrorFor(email, 'Email is not valid');
  } else {
    //Add succes class
    setSuccessFor(email);
  }
  
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  if(!passwordValue) {
    //Show error    
    //Add error class
    setErrorFor(password, 'Password cannot be blank');
  } else if(passwordValue.length < 8){
    //Add succes class
    setErrorFor(password, 'Password to short');
  } else if(!passwordValue.match(re)){
    //Add succes class
    setErrorFor(password, 'it have to contains a upper, lower and a number');
  } else {
    //Add succes class
    setSuccessFor(password);
  }
  
  if(!password2Value) {
    //Show error    
    //Add error class
    setErrorFor(password2, 'write again your password');
  } else if(passwordValue !== password2Value){
    //Add succes class
    setErrorFor(password2, 'does not match');
  } else {
    //Add succes class
    setSuccessFor(password2);
  }
  
  if (
    username.parentElement.classList.contains('success') &&
    email.parentElement.classList.contains('success') &&
    password.parentElement.classList.contains('success') &&
    password2.parentElement.classList.contains('success')
  ) {
    closeModal();
    form.reset();
  }
  //HomeWork mostrar un mensaje de exito al hacer click y todo este correcto
}

const setErrorFor = (input, message) => {
  const formControl = input.parentElement; //this is the .form-control
  const small = formControl.querySelector('small');
  
  //add error message inside small
  small.innerText = message;
  
  //add error class
  formControl.className = 'form-control error';
} 

const setSuccessFor = (input) => {
  const formControl = input.parentElement; //this is the .form-control
  
  //add success class
  formControl.className = 'form-control success';
}

const isEmail = (email) => {  
  //this checks if the email is valid
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

const togglePassword = () => {
  const psw = document.getElementById('password');
  
  const show = document.getElementById('show');
  const hide = document.getElementById('hide');
  
  

  if (psw.type === "password") {
      psw.type = "text";
      show.style.visibility = 'hidden';
      hide.style.visibility = 'visible';
    } else {
      psw.type = "password";
      show.style.visibility = 'visible';
      hide.style.visibility = 'hidden';
    }
  
  
}

const toggleConfirm = () => {
  const confirm = document.getElementById('password2');
  
  const show2 = document.getElementById('show2');
  const hide2 = document.getElementById('hide2');
  
  if (confirm.type === "password") {
      confirm.type = "text";
      show2.style.visibility = 'hidden';
      hide2.style.visibility = 'visible';
    } else {
      confirm.type = "password";
      show2.style.visibility = 'visible';
      hide2.style.visibility = 'hidden';
    }
}

if (closeBtn) {
  closeBtn.addEventListener('click', closeModal);
}