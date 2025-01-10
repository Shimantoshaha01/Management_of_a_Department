let currentSlide = 1;
        showSlide(currentSlide);

        function showSlide(n) {
            const slides = document.getElementsByClassName("slide");
            const dots = document.getElementsByClassName("dot");
            
            if (n > slides.length) currentSlide = 1;
            if (n < 1) currentSlide = slides.length;

            for (let slide of slides) {
                slide.classList.remove("active");
            }
            for (let dot of dots) {
                dot.classList.remove("active");
            }
            
            slides[currentSlide - 1].classList.add("active");
            dots[currentSlide - 1].classList.add("active");
        }

        function changeSlide(n) {
            showSlide(currentSlide += n);
        }

        function setSlide(n) {
            showSlide(currentSlide = n);
        }

        // Auto slide
        setInterval(() => {
            changeSlide(1);
        }, 3000); // Change slide every 3 seconds

        function navigateToLogin() {
            window.location.href = '/Loginpage.html';
          }