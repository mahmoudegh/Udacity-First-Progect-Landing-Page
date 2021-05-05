// Our Variables
let sections = document.getElementsByTagName('section');
let header = document.querySelector('.page__header');
let linksMain;
let linksAlt;
let links;
let isScrolling;

////////////////////////////////////// All Functions Calls //////////////////////////////////////
createLinks();

handelActiveLinks();

handelActiveSections();

scrollToSection();

showHideNavBar();

upButtonEvents();

collapsSections();

////////////////////////////////////// Start Functions Code //////////////////////////////////////

// Start Page From Top
window.onload = function () {
  window.location.hash = '#';
};

// Create Links
function createLinks() {
  for (let i = 0; i < sections.length; i++) {
    let ul = document.querySelectorAll('.navbar__list');
    for (let x = 0; x < ul.length; x++) {
      let li = document.createElement('li');
      let linkName = document.createTextNode(sections[i].dataset.nav);
      ul[x].appendChild(li);
      li.appendChild(linkName);
    }
  }
  links = document.querySelectorAll('.page__header .navbar__list li');
  linksMain = document.querySelectorAll(
    '.page__header .navbar__menu__main .navbar__list li',
  );
  linksAlt = document.querySelectorAll(
    '.page__header .navbar__menu__alt .navbar__list li',
  );
}

// Remove active class from all Links
function removeLinksActiveClass() {
  for (let i = 0; i < links.length; i++) {
    links[i].classList.remove('active-link');
  }
}

// Handel Active Link
function handelActiveLinks() {
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function () {
      removeLinksActiveClass();
      links[i].classList.add('active-link');
    });
  }
}

// Scroll to section by link click
function scrollToSection() {
  for (let i = 0; i < sections.length; i++) {
    for (let j = 0; j < linksMain.length; j++) {
      for (let k = 0; k < linksAlt.length; k++) {
        if (i === j) {
          linksMain[j].addEventListener('click', () => {
            sections[i].scrollIntoView({ behavior: 'smooth' });
          });
        } else if (i === k) {
          linksAlt[k].addEventListener('click', () => {
            sections[i].scrollIntoView({ behavior: 'smooth' });
          });
        }
      }
    }
  }
}

// Checking if section is partially visible
function isInViewPort(element) {
  // Get the bounding client rectangle position in the viewport
  let bounding = element.getBoundingClientRect();

  if (
    bounding.top <=
      (window.innerHeight / 2 || document.documentElement.clientHeight / 2) &&
    bounding.bottom >= 0
  ) {
    return true;
  } else {
    return false;
  }
}

// Remove active class from all sections
function removeSectionActiveClass() {
  for (let i = 0; i < sections.length; i++) {
    sections[i].classList.remove('your-active-class');
  }
}

// Add active class to visible section
function handelActiveSections() {
  window.addEventListener('scroll', function () {
    for (let i = 0; i < sections.length; i++) {
      if (isInViewPort(sections[i])) {
        removeSectionActiveClass();
        sections[i].classList.add('your-active-class');
      }
    }
  });
}

// Up Button Script
function upButtonEvents() {
  // Remove Active from links by up button click
  document.querySelector('.up').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Up Button Visible When start scrolling
  window.onscroll = function () {
    if (window.scrollY > 300) {
      document.querySelector('.up').style.display = 'block';
    } else {
      document.querySelector('.up').style.display = 'none';
    }
  };
}

// Show & Hide Navbar
function showHideNavBar() {
  window.addEventListener(
    'scroll',
    function () {
      // Clear our timeout throughout the scroll
      window.clearTimeout(isScrolling);
      header.style.display = 'flex';

      // Set a timeout to run after scrolling ends
      isScrolling = setTimeout(function () {
        header.style.display = 'none';
      }, 3000);
    },
    false,
  );

  // NavBar Style on hover
  header.addEventListener('mouseover', function () {
    window.clearTimeout(isScrolling);
  });

  // NavBar Style on leave
  header.addEventListener('mouseleave', function (event) {
    setTimeout(function () {
      event.target.style.display = 'none';
    }, 3000);
  });
}

// Collapse Sections
function collapsSections() {
  for (let i = 0; i < sections.length; i++) {
    sections[i].querySelectorAll('h2').forEach((h2) => {
      h2.addEventListener('click', function () {
        sections[i].querySelectorAll('p').forEach((p) => {
          p.classList.toggle('collapse');
        });
      });
    });
  }
}
