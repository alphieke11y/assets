$(document).ready(function(){

  //for the sub navbar
  var subNavbar = $('#sub-navbar');

  $(window).scroll(function(){
    var scrollPosition = $(window).scrollTop();
    var heroSectionHeight = $('#hero').outerHeight();
    if (scrollPosition >= heroSectionHeight) {
      $('.navbar').addClass('solid-bg');
      $('.navbar').removeClass('no-bg');
      $('.search-form').appendTo('#lead1');
      // Add a fixed position to the sub navbar
      subNavbar.addClass('fixed-tops solid-bg pb-3');
    } else {
      $('.navbar').removeClass('solid-bg');
      $('.navbar').addClass('no-bg');
      $('.search-form').appendTo('#lead');
      // Remove the fixed position from the sub navbar
      subNavbar.removeClass('fixed-tops solid-bg pb-3');
    }
  });

  // Keep dropdown menu open when either the link or the dropdown menu is being hovered over
  $('.hover-dropdown').hover(function() {
    $(this).find('.dropdown-menu').show();
  }, function() {
    $(this).find('.dropdown-menu').hide();
  });

  // Copyright year
  const currentYear = new Date().getFullYear();
  console.log("Current year:", currentYear);
  $(".copyright-year").html(currentYear);
  if(currentYear !== 2024) {
    $('.founded').removeClass('d-none');
  }

  $('.login-btn').click(function(){
    // Redirect to the login page
    window.location.href = "{{ route('login') }}";
  });
  

  const container = document.querySelector('.row'); // Assuming your cards are within a row element
  const cards = container.querySelectorAll('.card'); // Select all card elements

  let currentSlide = 0; // Keeps track of the current slide

  function showSlides() {
    // Hide all cards initially
    cards.forEach(card => card.classList.add('hidden'));

    // Show only the current set of 4 cards
    for (let i = 0; i < 4; i++) {
      const index = (currentSlide + i) % cards.length; // Wrap around if needed
      cards[index].classList.remove('hidden');
    }

    currentSlide = (currentSlide + 1) % cards.length; // Update current slide
  }

  // Show initial slides
  showSlides();

  // Set interval for automatic sliding
  setInterval(showSlides, 3000); // Change 3000 to adjust slide interval in milliseconds

});


// Function to allow dropping
function allowDrop(event) {
  event.preventDefault();
}

// Function to handle dragging
function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var draggedElement = document.getElementById(data);
  var target = event.target;

  // Prevent dropping inside another card or outside card-body
  if (draggedElement === target || draggedElement.contains(target)) {
    return; // Exit if target is the dragged element or its descendant
  }

  // Find the closest valid dropzone (card-body)
  var dropzone = target.closest('.card-container');

  // Check if the dropzone is valid and get its position
  if (dropzone && dropzone.classList.contains('card-container')) {
    var dropzoneRect = dropzone.getBoundingClientRect();

    // Check if the drop position is within the valid area of the card-body
    if (event.clientY < dropzoneRect.bottom) {
      dropzone.appendChild(draggedElement); // Append to the dropzone
      draggedElement.setAttribute('draggable', 'true'); // Re-enable dragging
    } else {
      // Handle invalid drop (optional: visual cue or error message)
    }
  } else {
    // Handle invalid drop (optional)
  }
}

