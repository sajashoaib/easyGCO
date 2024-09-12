document.addEventListener("DOMContentLoaded", function () {
  AOS.init();
});

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(
    "#carouselExampleControls .carousel-inner"
  );
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.querySelector(".prev-btn");
  const indicators = document.querySelectorAll(".carousel-indicators button");

  let activeIndex = 0; // Counter to track the active index

  function updateIndicators() {
    console.log("Active Index:", activeIndex);
    indicators.forEach((indicator, index) => {
      if (index === activeIndex) {
        indicator.classList.add("active-indicator");
        console.log(indicator);
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
      nextItem = firstItem; // Loop back to the first item
    }

    activeItem.classList.remove("active");
    nextItem.classList.add("active");

    carousel.appendChild(firstItem);

    // Update the active index counter
    activeIndex = (activeIndex + 1) % indicators.length;

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

    // Update the active index counter
    activeIndex = (activeIndex - 1 + indicators.length) % indicators.length;

    updateIndicators();
  });

  updateIndicators();
});

// ************************************************************************

document.querySelectorAll(".accordion-header .icon-toggle").forEach((icon) => {
  icon.addEventListener("click", function () {
    const button = this.nextElementSibling;

    button.click();

    const isExpanded = button.getAttribute("aria-expanded") === "true";

    // Update the icon class based on the expanded state
    if (isExpanded) {
      this.classList.remove("fa-plus");
      this.classList.add("fa-minus");
    } else {
      this.classList.remove("fa-minus");
      this.classList.add("fa-plus");
    }
  });
});

