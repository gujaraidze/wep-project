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
        
        // Wishlist ღილაკის განახლება
        if (window.mainWishlistManager) {
            window.mainWishlistManager.updateMainWishlistButton(games[index].title);
        }
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
    const scrollAmount = 300; // 1400 300 ერთი თამაშის სიგანე (270px) + gap (30px)
    
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
    delay: 250,
    distance: '50px',
    easing: 'ease-in-out',
    origin: 'bottom',
});

ScrollReveal().reveal('.game-genres' , {
    delay: 250,
    distance: '50px',
    easing: 'ease-in-out',
    origin: 'bottom',
});

ScrollReveal().reveal('.popular-games' , {
    delay: 250,
    distance: '50px',
    easing: 'ease-in-out',
    origin: 'bottom',
});

ScrollReveal().reveal('.bestseller-games' , {
    delay: 250,
    distance: '50px',
    easing: 'ease-in-out',
    origin: 'bottom',
});

ScrollReveal().reveal('.game-deals' , {
    delay: 250,
    distance: '50px',
    easing: 'ease-in-out',
    origin: 'bottom',
});

ScrollReveal().reveal('.pre-orders' , {
    delay: 250,
    distance: '50px',
    easing: 'ease-in-out',
    origin: 'bottom',
});

ScrollReveal().reveal('.game-reviews' , {
    delay: 250,
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

// WISHLIST FUNCTIONALITY FOR MAIN GAMES CAROUSEL
document.addEventListener('DOMContentLoaded', function() {
    // Wishlist ფუნქციები მთავარი კაროუსელისთვის
    const mainWishlistManager = {
        // Wishlist-ის მიღება
        getWishlist() {
            const saved = localStorage.getItem('oasis_main_wishlist');
            return saved ? JSON.parse(saved) : [];
        },

        // Wishlist-ში დამატება
        addToWishlist(gameData) {
            let wishlist = this.getWishlist();
            
            // შეამოწმეთ თუ თამაში უკვე არის wishlist-ში
            const existingGame = wishlist.find(game => game.name === gameData.name);
            if (existingGame) {
                console.log('Game already in wishlist');
                return false;
            }

            // ახალი თამაშის დამატება
            const newGame = {
                name: gameData.name,
                price: gameData.price,
                image: gameData.image,
                addedAt: new Date().toISOString()
            };

            wishlist.push(newGame);
            localStorage.setItem('oasis_main_wishlist', JSON.stringify(wishlist));
            
            // Wishlist ინდიკატორის განახლება
            this.updateWishlistIndicator();
            
            return true;
        },

        // Wishlist-დან წაშლა
        removeFromWishlist(gameName) {
            let wishlist = this.getWishlist();
            wishlist = wishlist.filter(game => game.name !== gameName);
            localStorage.setItem('oasis_main_wishlist', JSON.stringify(wishlist));
            
            this.updateWishlistIndicator();
        },

        // შეამოწმეთ თუ თამაში არის wishlist-ში
        isInWishlist(gameName) {
            const wishlist = this.getWishlist();
            return wishlist.some(game => game.name === gameName);
        },

        // Wishlist ინდიკატორის განახლება
        updateWishlistIndicator() {
            const wishlist = this.getWishlist();
            const wishlistCount = wishlist.length;
            
            const wishlistCountElement = document.getElementById('wishlist-count');
            if (wishlistCountElement) {
                // Bounce ანიმაცია
                wishlistCountElement.classList.add('updating');
                
                setTimeout(() => {
                    wishlistCountElement.textContent = wishlistCount;
                    wishlistCountElement.classList.remove('updating');
                    
                    // ინდიკატორის ჩვენება/დამალვა
                    if (wishlistCount > 0) {
                        wishlistCountElement.style.display = 'inline-flex';
                    } else {
                        wishlistCountElement.style.display = 'none';
                    }
                }, 300);
            }
        },

        // მთავარი wishlist ღილაკის განახლება
        updateMainWishlistButton(currentGameName) {
            const wishlistButton = document.getElementById('wishlist');
            if (wishlistButton) {
                const isInWishlist = this.isInWishlist(currentGameName);
                
                if (isInWishlist) {
                    wishlistButton.textContent = 'remove from wishlist';
                    wishlistButton.style.background = '#e74c3c';
                    wishlistButton.style.borderColor = '#e74c3c';
                } else {
                    wishlistButton.textContent = 'add to wishlist';
                    wishlistButton.style.background = '';
                    wishlistButton.style.borderColor = '';
                }
            }
        }
    };

    // მთავარი wishlist ღილაკის event listener
    const wishlistButton = document.getElementById('wishlist');
    if (wishlistButton) {
        wishlistButton.addEventListener('click', function() {
            // მიმდინარე თამაშის მონაცემების მიღება
            const currentGameTitle = document.getElementById('main-game-title').textContent;
            const currentGamePrice = document.getElementById('main-game-price').textContent;
            
            // მიმდინარე თამაშის სურათის მიღება
            const activeImage = document.querySelector('.main-games-image.active img');
            const currentGameImage = activeImage ? activeImage.src : 'img/dune.jpg';
            
            const gameData = {
                name: currentGameTitle,
                price: currentGamePrice,
                image: currentGameImage
            };

            if (mainWishlistManager.isInWishlist(currentGameTitle)) {
                // თამაშის წაშლა wishlist-დან
                mainWishlistManager.removeFromWishlist(currentGameTitle);
                this.textContent = 'add to wishlist';
                this.style.background = '';
                this.style.borderColor = '';
                
                // შეტყობინება
                showNotification('Game removed from wishlist', 'info');
            } else {
                // თამაშის დამატება wishlist-ში
                const success = mainWishlistManager.addToWishlist(gameData);
                
                if (success) {
                    this.textContent = 'remove from wishlist';
                    this.style.background = '#e74c3c';
                    this.style.borderColor = '#e74c3c';
                    
                    // შეტყობინება
                    showNotification('Game added to wishlist!', 'success');
                }
            }
        });
    }

    // შეტყობინებების ფუნქცია
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        // იკონის დამატება
        const icon = type === 'success' ? '✓' : '';
        notification.innerHTML = `
            <span style="margin-right: 8px; font-size: 16px;">${icon}</span>
            <span>${message}</span>
        `;
        
        // CSS სტილები
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#05980A' : '#0090ff'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 1000;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            display: flex;
            align-items: center;
            min-width: 200px;
        `;
        
        document.body.appendChild(notification);
        
        // ანიმაცია
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // ავტომატური წაშლა
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Wishlist გვერდის ფუნქციონალი
    const wishlistLink = document.getElementById('wishlist-link');
    if (wishlistLink) {
        wishlistLink.addEventListener('click', function(e) {
            e.preventDefault();
            showWishlistModal();
        });
    }

    function showWishlistModal() {
        const wishlist = mainWishlistManager.getWishlist();
        
        if (wishlist.length === 0) {
            showNotification('Your wishlist is empty. Add some games to get started!', 'info');
            return;
        }
        
        // Wishlist მოდალის შექმნა
        const modal = document.createElement('div');
        modal.className = 'wishlist-modal';
        modal.innerHTML = `
            <div class="wishlist-modal-content">
                <div class="wishlist-modal-header">
                    <h3>🎮 My Wishlist (${wishlist.length})</h3>
                    <button class="close-btn" title="Close">&times;</button>
                </div>
                <div class="wishlist-items">
                    ${wishlist.map((game, index) => `
                        <div class="wishlist-item" data-index="${index}">
                            <img src="${game.image}" alt="${game.name}" onerror="this.src='img/placeholder-600x400.png'">
                            <div class="wishlist-item-info">
                                <h4>${game.name}</h4>
                                <p class="game-price">${game.price}</p>
                                <p class="added-date">Added: ${new Date(game.addedAt).toLocaleDateString()}</p>
                                <button class="remove-wishlist-btn" data-game-name="${game.name}" title="Remove from wishlist">
                                    🗑️ Remove
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="wishlist-footer">
                    <button class="clear-all-btn" id="clear-all-wishlist">Clear All</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // წაშლის ღილაკების event listeners
        modal.querySelectorAll('.remove-wishlist-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const gameName = this.dataset.gameName;
                mainWishlistManager.removeFromWishlist(gameName);
                this.closest('.wishlist-item').remove();
                
                // ინდიკატორის განახლება
                const count = mainWishlistManager.getWishlist().length;
                document.getElementById('wishlist-count').textContent = count;
                
                if (count === 0) {
                    modal.remove();
                    showNotification('Wishlist is now empty', 'info');
                } else {
                    // მოდალის სათაურის განახლება
                    const header = modal.querySelector('.wishlist-modal-header h3');
                    if (header) {
                        header.textContent = `🎮 My Wishlist (${count})`;
                    }
                    showNotification('Game removed from wishlist', 'info');
                }
            });
        });
        
        // Clear All ღილაკის ფუნქციონალი
        const clearAllBtn = modal.querySelector('#clear-all-wishlist');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to clear all items from your wishlist? This action cannot be undone.')) {
                    localStorage.removeItem('oasis_main_wishlist');
                    mainWishlistManager.updateWishlistIndicator();
                    modal.remove();
                    showNotification('All items removed from wishlist!', 'success');
                    
                    // მთავარი wishlist ღილაკის განახლება
                    const currentGameTitle = document.getElementById('main-game-title').textContent;
                    if (currentGameTitle) {
                        mainWishlistManager.updateMainWishlistButton(currentGameTitle);
                    }
                }
            });
        }
        
        // დახურვის ღილაკი
        modal.querySelector('.close-btn').addEventListener('click', () => {
            modal.remove();
        });
        
        // მოდალის გარეთ დაჭერა
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // კლავიატურის მხარდაჭერა (Escape ღილაკი)
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
        
        // მოდალის წაშლისას event listener-ის წაშლა
        const originalRemove = modal.remove;
        modal.remove = function() {
            document.removeEventListener('keydown', handleEscape);
            return originalRemove.call(this);
        };
    }

    // მთავარი კაროუსელის setActive ფუნქციის განახლება
    const originalSetActive = window.setActive;
    if (originalSetActive) {
        window.setActive = function(index) {
            originalSetActive(index);
            
            // მიმდინარე თამაშის სახელის მიღება
            const currentGameTitle = document.getElementById('main-game-title').textContent;
            mainWishlistManager.updateMainWishlistButton(currentGameTitle);
        };
    }

    // ინიციალიზაცია
    mainWishlistManager.updateWishlistIndicator();
    
    // მთავარი კაროუსელის ინიციალიზაციის შემდეგ wishlist ღილაკის განახლება
    setTimeout(() => {
        const currentGameTitle = document.getElementById('main-game-title').textContent;
        if (currentGameTitle) {
            mainWishlistManager.updateMainWishlistButton(currentGameTitle);
        }
    }, 100);

    // გლობალურად ხელმისაწვდომი
    window.mainWishlistManager = mainWishlistManager;
});