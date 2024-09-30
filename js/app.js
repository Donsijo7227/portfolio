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
  fetch('views/shared/header.html')
    .then(response => response.text())
    .then(htmlData => {
      console.log("Header loaded successfully");
      document.querySelector('header').innerHTML = htmlData;

      // Bind click events to navbar links
      document.querySelectorAll('.navbar-brand, .nav-link').forEach(link => {
        link.addEventListener('click', (event) => {
          event.preventDefault();

          // Set page title based on clicked link's ID
          document.title = event.currentTarget.id;
          console.log(document.title)

          // Load the corresponding page content
          LoadContent();
        });
      });
    })
    .catch(error => {
      console.error('Error loading header:', error);
    });
}

let LoadContent = () => {
  let currentPage = document.title;
  let pageContent = '';

  // Using if-else statements to load content based on the page title
  if (currentPage === 'home') {
    pageContent = 'views/home.html';
  } else if (currentPage === 'aboutme') {
    pageContent = 'views/aboutme.html';
  } else if (currentPage === 'contact') {
    pageContent = 'views/contact.html';
  } else if (currentPage === 'projects') {
    pageContent = 'views/projects.html';
    LoadProjects();
  }  
  else {
    pageContent = 'views/404.html'; // Fallback page if no match is found
  }

  fetch(pageContent)
    .then(response => response.text())
    .then(htmlData => {
      document.querySelector('main').innerHTML = htmlData;
    })
    .catch(error => {
      console.error('Error loading content:', error);
    });
}

let LoadFooter = () => {
  fetch('views/shared/footer.html')
    .then(response => response.text())
    .then(htmlData => {
      document.querySelector('footer').innerHTML = htmlData;
    })
    .catch(error => {
      console.error('Error loading footer:', error);
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


let LoadProjects = () => {
  console.log("loadprojectfunctioncalled")
  fetch('data/projects.json') 
    .then(response => response.json())
    .then(projects => {
      let projectsContainer = document.querySelector('#projectContainer'); // Container for projects
      projectsContainer.innerHTML = ''; 

      projects.forEach(project => {
        // Create a card for each project
        let projectCard = `
          <div class="card">
            <figure class="card__img-wrapper">
              <img src="${project.image}" alt="${project.title}">
            </figure>

            <div class="card__content">
              <h4>${project.title}</h4>

              <p class="card__description">${project.description}</p>
              
              <footer>
                <a href="${project.link}" class="card__btn cd-btn cd-btn--primary" target="_blank">Visit</a>
              </footer>
            </div>
          </div>
        `;

        // Append the card to the projects container
        projectsContainer.innerHTML += projectCard;
      });
    })
    .catch(error => {
      console.error('Error loading projects:', error);
    });
};

