(function() {
  let Start = () => {
    console.log('App Started');
    console.log("app.js is loaded");

    

    // Display Header with Navbar and Footer
    LoadHeader();
    LoadFooter();
  };

  window.addEventListener('load', Start);
})();

let LoadHeader = () => {
  fetch('./views/shared/header.html')
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
  if (currentPage === 'home' || currentPage === 'Home') {
    console.log("home or home");

    pageContent = 'index.html';
  } else if (currentPage === 'aboutme') {
    pageContent = 'views/aboutme.html';
  } else if (currentPage === 'contact') {
    pageContent = 'views/contact.html';
  } else if (currentPage === 'projects') {
    pageContent = 'views/projects.html';
  } 
  else if (currentPage === 'getintouch') {
    pageContent = 'views/getintouch.html';
  } 
  else if (currentPage === 'skills') {
    pageContent = 'views/skills.html';
  }  
  else {
    pageContent = 'views/404.html'; // Fallback page if no match is found
  }

  fetch(pageContent)
    .then(response => response.text())
    .then(htmlData => {
      document.querySelector('main').innerHTML = htmlData;
      if (currentPage === 'projects') {
        LoadProjects();
      }
    })
    .catch(error => {
      console.error('Error loading content:', error);
    });
}

let LoadFooter = () => {
  fetch('./views/shared/footer.html')
    .then(response => response.text())
    .then(htmlData => {
      document.querySelector('footer').innerHTML = htmlData;
    })
    .catch(error => {
      console.error('Error loading footer:', error);
    });
};



//project page 
let LoadProjects = () => {
  console.log("loadprojectfunctioncalled")
  fetch('data/projects.json') 
    .then(response => response.json())
    .then(projects => {
      let projectsContainer = document.querySelector('#projectContainer'); 
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
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get the form data
  const serviceID = 'service_0aju5j8'; 
  const templateID = 'template_6uo8b7p'; 

  // Send the email
  emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
          document.getElementById('response-message').innerText = 'Message sent successfully!';
          document.getElementById('contact-form').reset(); // Reset the form
      }, (err) => {
          document.getElementById('response-message').innerText = 'Failed to send the message. Please try again.';
          console.error(err);
      });
});

(function(){
  emailjs.init("Lq5hvNAE4ULjK3CmV");
})();
