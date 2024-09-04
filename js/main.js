
// document.addEventListener('DOMContentLoaded', function () {
//   const cards = document.querySelectorAll('.card-features');
//   const nextBtn = document.querySelector('.next-btn');
//   const prevBtn = document.querySelector('.prev-btn');
//   const cardsPerPage = 4; // Number of cards per page
//   let currentPage = 0;

//   // Function to show cards for the current page
//   function showPage(page) {
//     const start = page * cardsPerPage;
//     const end = start + cardsPerPage;

//     // Hide all cards
//     cards.forEach((card, index) => {
//       if (index >= start && index < end) {
//         card.style.display = 'block';
//       } else {
//         card.style.display = 'none';
//       }
//     });

//     // Disable/enable buttons based on page
//     prevBtn.style.display = currentPage === 0 ? 'none' : 'inline-block';
//     nextBtn.style.display = end >= cards.length ? 'none' : 'inline-block';
//   }

//   // Event listeners for buttons
//   nextBtn.addEventListener('click', () => {
//     currentPage++;
//     showPage(currentPage);
//   });

//   prevBtn.addEventListener('click', () => {
//     currentPage--;
//     showPage(currentPage);
//   });

//   // Initialize the first page
//   showPage(currentPage);
// });

