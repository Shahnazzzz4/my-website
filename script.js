 const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    const dotsContainer = document.querySelector('.dots');
    let index = 0;

    // Create dots
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => moveToSlide(i));
      dotsContainer.appendChild(dot);
    });
    const dots = document.querySelectorAll('.dot');

    function changeSlide(n) {
      slides[index].classList.remove('active');
      dots[index].classList.remove('active');
      index = (n + slides.length) % slides.length;
      slides[index].classList.add('active');
      dots[index].classList.add('active');
    }

    function nextSlide() { changeSlide(index + 1); }
    function prevSlide() { changeSlide(index - 1); }
    function moveToSlide(n) { changeSlide(n); }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Autoplay
    setInterval(nextSlide, 5000);

    // Pause on hover
    document.querySelector('.hero').addEventListener('mouseenter', () => clearInterval(auto));
  