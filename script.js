
const track = document.querySelector(".carousel-track");
let slides = Array.from(document.querySelectorAll(".project-slide"));

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

// START IN THE FIRST REAL SLIDE
let currentIndex = 1;

// Clone first & last slide for infinite loop
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.classList.add("clone");
lastClone.classList.add("clone");

// Insert clones
track.insertBefore(lastClone, slides[0]);
track.appendChild(firstClone);

slides = Array.from(document.querySelectorAll(".project-slide"));

/* ----------------------------------
   FUNCTION: Center the active slide
---------------------------------- */
function getOffset() {
  const slideWidth = slides[1].offsetWidth + 60; // width + your gap
  const containerWidth = track.parentElement.offsetWidth;

  // Center formula
  const offset = (slideWidth * currentIndex) - (containerWidth / 2) + (slideWidth / 2);

  return offset;
}

function positionTrack() {
  track.style.transform = `translateX(${-getOffset()}px)`;
}

positionTrack();

/* ----------------------------------
   ACTIVE STATE STYLE
---------------------------------- */
function setActive() {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentIndex);
  });
}
setActive();

/* ----------------------------------
   SLIDE MOVEMENT
---------------------------------- */
function moveSlide() {
  track.style.transition = "transform 0.6s ease";
  track.style.transform = `translateX(${-getOffset()}px)`;
  setActive();
}

// Next / Prev buttons
nextBtn.addEventListener("click", () => {
  currentIndex++;
  moveSlide();
});

prevBtn.addEventListener("click", () => {
  currentIndex--;
  moveSlide();
});

/* ----------------------------------
   LOOP AROUND WHEN HITTING CLONES
---------------------------------- */
track.addEventListener("transitionend", () => {
  if (slides[currentIndex].classList.contains("clone")) {
    track.style.transition = "none";

    if (currentIndex === slides.length - 1) {
      currentIndex = 1; // back to first real slide
    } else if (currentIndex === 0) {
      currentIndex = slides.length - 2; // back to last real slide
    }

    positionTrack();
    setActive();
  }
});

/* ----------------------------------
   RESPONSIVE REALIGNMENT
---------------------------------- */
window.addEventListener("resize", () => {
  track.style.transition = "none";
  positionTrack();
});

// Show overlay
document.querySelectorAll('.learn-more').forEach(btn => {
    btn.addEventListener('click', e => {
      const slide = e.currentTarget.closest('.project-slide');
      slide.querySelector('.project-desc').style.display = 'block';
    });
  });

  // Close overlay
  document.querySelectorAll('.close-desc').forEach(btn => {
    btn.addEventListener('click', e => {
      const overlay = e.currentTarget.closest('.project-desc');
      overlay.style.display = 'none';
    });
  });