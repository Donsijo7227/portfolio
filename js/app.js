
//dynamic single page logic 
(function() {
  let Start = () => {
    console.log('App Started');

    // Display Header with Navbar and Footer
    LoadHeader();
    LoadFooter();
  };

  window.addEventListener('load', Start);
})();

let LoadHeader = () => {
  $.get('views/shared/header.html', (htmlData) => {
    console.log("Header loaded successfully");
    $('header').html(htmlData);

    // Bind click events to navbar links
    $('.navbar-brand, .nav-link').on('click', (event) => {
      event.preventDefault();

      // Set page title based on clicked link's ID
      document.title = $(event.currentTarget).prop('id');

      // Load the corresponding page content
      LoadContent();
    });
  });
}

let LoadContent = () => {
  let currentPage = document.title;

  $.get(`/views/${currentPage}.html`, (htmlData) => {
    $('main').html(htmlData);
  });
}

let LoadFooter = () => {
  $.get('views/shared/footer.html', (htmlData) => {
    $('footer').html(htmlData);
  });
};

//homePageOrbit 
const icons = document.querySelectorAll('.icon');
        const orbits = [
            { radius: 200, speed: 0.0003 },
            { radius: 150, speed: 0.0005 },
            { radius: 100, speed: 0.0006 }
        ];
        const centerX = 200;
        const centerY = 200;

        icons.forEach((icon, index) => {
            icon.orbit = orbits[index % 3];
            icon.angle = (index / icons.length) * Math.PI * 2; // Distribute icons evenly
        });

        function animateOrbit() {
            icons.forEach((icon) => {
                icon.angle += icon.orbit.speed;
                const x = centerX + icon.orbit.radius * Math.cos(icon.angle);
                const y = centerY + icon.orbit.radius * Math.sin(icon.angle);
                icon.style.left = `${x - 25}px`;
                icon.style.top = `${y - 25}px`;
            });
            requestAnimationFrame(animateOrbit);
        }

        animateOrbit();
//Matrix
var matrixAnimations = document.querySelectorAll(".matrix-animation");
var animationIds = [];
var originalTexts = [];
var currentIndex = 0;
var isAnimating = false;

for (var i = 0; i < matrixAnimations.length; i++) {
  originalTexts[i] = matrixAnimations[i].innerText;

  matrixAnimations[i].addEventListener(
    "mouseover",
    (function (i) {
      return function () {
        if (isAnimating) return;

        isAnimating = true;
        currentIndex = 0;
        animateText(matrixAnimations[i], originalTexts[i]);
      };
    })(i)
  );

  matrixAnimations[i].addEventListener(
    "mouseout",
    (function (i) {
      return function () {
        cancelAnimationFrame(animationIds[i]);
        resetAnimation(matrixAnimations[i], originalTexts[i]);
        currentIndex = 0;
        isAnimating = false;
      };
    })(i)
  );
}

function animateText(element, originalText) {
  var characters = originalText.split("");
  var randomizedIndices = getRandomIndices(characters.length);

  var startTime = null;
  var duration = 800; // Adjust the duration as desired

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    var progress = timestamp - startTime;

    if (progress >= duration) {
      isAnimating = false;
      return;
    }

    var currentIndex = Math.floor((progress / duration) * characters.length);

    scrambleText(element, characters, randomizedIndices, currentIndex);
    animationIds[i] = requestAnimationFrame(animate);
  }

  animationIds[i] = requestAnimationFrame(animate);
}

function scrambleText(element, characters, randomizedIndices, currentIndex) {
  var scrambledText = "";

  for (var i = 0; i < characters.length; i++) {
    if (i <= currentIndex || characters[i] === " ") {
      scrambledText += characters[i];
    } else {
      var randomIndex = randomizedIndices[i];
      scrambledText += String.fromCharCode(Math.floor(Math.random() * 94) + 33);
    }
  }

  element.innerText = scrambledText;
}

function resetAnimation(element, originalText) {
  element.innerText = originalText;
}

function getRandomIndices(length) {
  var indices = [];

  for (var i = 0; i < length; i++) {
    indices.push(i);
  }

  shuffleArray(indices);
  return indices;
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
