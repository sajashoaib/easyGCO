document.addEventListener("DOMContentLoaded", function () {
  AOS.init();
});

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(
    "#carouselExampleControls .carousel-inner"
  );
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.querySelector(".prev-btn");
  const indicators = document.querySelectorAll(
    ".carousel-indicators .indicator"
  );

  // Function to update indicator colors based on the active index
  function updateIndicators() {
    const activeIndex = Array.from(carousel.children).indexOf(
      carousel.querySelector(".carousel-item.active")
    );
    console.log("Active Index:", activeIndex);
    indicators.forEach((indicator, index) => {
      // Add or remove active class based on the active index
      if (index === activeIndex) {
        indicator.classList.add("active-indicator");
        console.log("active");
      } else {
        indicator.classList.remove("active-indicator");
      }
    });
  }

  // Move to the next item
  nextBtn.addEventListener("click", function () {
    const activeItem = carousel.querySelector(".carousel-item.active");
    const firstItem = carousel.querySelector(".carousel-item:first-child");

    let nextItem = activeItem.nextElementSibling;
    if (!nextItem) {
      nextItem = firstItem;
    }

    activeItem.classList.remove("active");
    nextItem.classList.add("active");

    carousel.appendChild(firstItem);

    // Update indicators after moving items
    updateIndicators();
  });

  // Move to the previous item
  prevBtn.addEventListener("click", function () {
    const activeItem = carousel.querySelector(".carousel-item.active");
    const lastItem = carousel.querySelector(".carousel-item:last-child");

    let prevItem = activeItem.previousElementSibling;
    if (!prevItem) {
      prevItem = lastItem;
    }

    activeItem.classList.remove("active");
    prevItem.classList.add("active");

    carousel.insertBefore(lastItem, carousel.firstChild);

    updateIndicators();
  });

  // Initialize indicators on page load
  updateIndicators();
});

// ************************************************************************
document.querySelectorAll(".accordion-header img").forEach((img) => {
  img.addEventListener("click", function () {
    const button = this.nextElementSibling; 

    button.click();

    // Toggle the image src based on the button's collapsed state
    if (button.classList.contains("collapsed")) {
      this.src = "../images/discover-img/plus.svg"; 
    } else {
      this.src = "../images/discover-img/mnuis.svg"; 
    }
  });
});
