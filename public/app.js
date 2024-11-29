// ================== active Page ==================================
document.querySelectorAll('.menu-button a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.menu-button a').forEach(item => item.classList.remove('active'));
        this.classList.add('active');
    });
});



// ============================== Slider ========================
        $('.slider').each(function () {
            var $this = $(this);
            var $group = $this.find('.slide_group');
            var $slides = $this.find('.slide');
            var bulletArray = [];
            var currentIndex = 0;
            var timeout;

            function move(newIndex) {
                var animateLeft, slideLeft;

                advance();

                if ($group.is(':animated') || currentIndex === newIndex) {
                    return;
                }

                bulletArray[currentIndex].removeClass('active');
                bulletArray[newIndex].addClass('active');

                if (newIndex > currentIndex) {
                    slideLeft = '100%';
                    animateLeft = '-100%';
                } else {
                    slideLeft = '-100%';
                    animateLeft = '100%';
                }

                $slides.eq(newIndex).css({
                    display: 'block',
                    left: slideLeft
                });
                $group.animate({
                    left: animateLeft
                }, function () {
                    $slides.eq(currentIndex).css({
                        display: 'none'
                    });
                    $slides.eq(newIndex).css({
                        left: 0
                    });
                    $group.css({
                        left: 0
                    });
                    currentIndex = newIndex;
                });
            }

            function advance() {
                clearTimeout(timeout);
                timeout = setTimeout(function () {
                    if (currentIndex < ($slides.length - 1)) {
                        move(currentIndex + 1);
                    } else {
                        move(0);
                    }
                }, 4000);
            }

            $('.next_btn').on('click', function () {
                if (currentIndex < ($slides.length - 1)) {
                    move(currentIndex + 1);
                } else {
                    move(0);
                }
            });

            $('.previous_btn').on('click', function () {
                if (currentIndex !== 0) {
                    move(currentIndex - 1);
                } else {
                    move(3);
                }
            });

            $.each($slides, function (index) {
                var $button = $('<a class="slide_btn">&bull;</a>');

                if (index === currentIndex) {
                    $button.addClass('active');
                }
                $button.on('click', function () {
                    move(index);
                }).appendTo('.slide_buttons');
                bulletArray.push($button);
            });

            advance();
        });

        // ================================ card for donner =================================
        // Sample data for food donation items with images
        const foodItems = [
            {
                name: "Freshly Baked Artisan Bread",
                status: "Available",
                donor: "Dr. Avneesh",
                quantity: 30,
                location: "Grater Noida",
                expiration: "36 hr",
                notes: "Delicious handcrafted artisan bread.",
                image: "/demo/assets/foods/Freshly Baked Artisan Bread.jpg" // Add image URL
            },
            {
                name: "Party Platter of Sandwiches",
                status: "Available",
                donor: "Mr. Anurag Khandelwal",
                quantity: 24,
                location: "Delhi",
                expiration: "36 hr",
                notes: "A variety of freshly baked pastries for breakfast.",
                image: "/demo//assets//foods//PartyPlatterofSandwiches.jpg" // Add image URL
            },
            {
                name: "Family-Sized Fruit Salad",
                status: "Available",
                donor: "Mrs. Asmita Gupta",
                quantity: 20,
                location: "Greater Noida",
                expiration: "60 hr",
                notes: "Assorted sandwiches with a variety of fillings.",
                image: "/demo/assets/foods/Family-Sized Fruit Salad.png" // Add image URL
            }
        ];

        // Function to create a card
        function createCard(item) {
            return `
                <div class="card">
                    <img src="${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p><span class="highlight">Status:</span> ${item.status}</p>
                    <p><span class="highlight">Donor:</span> ${item.donor}</p>
                    <p><span class="highlight">Food Quantity (no. of persons served):</span> ${item.quantity}</p>
                    <p><span class="highlight">Pickup Location:</span> ${item.location}</p>
                    <p><span class="highlight">Expiration Time:</span> ${item.expiration}</p>
                    <p><span class="highlight">Donor Notes:</span> ${item.notes}</p>
                    <button class="details-btn">View Details</button>
                </div>
            `;
        }

        // Rendering cards in the container
        const cardContainer = document.getElementById('cardContainer');
        cardContainer.innerHTML = foodItems.map(createCard).join('');