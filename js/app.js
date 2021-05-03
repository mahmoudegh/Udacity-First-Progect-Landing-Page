// Our Variables
let sections = document.getElementsByTagName("section");
let header = document.querySelector(".page__header");
let links;
let isScrolling;

////////////////////////////////////// All Functions Calls //////////////////////////////////////
createLinks();

handelActiveLinks();

handelActiveSections();

showHideNavBar();

upButtonEvents();

collapsSections();

////////////////////////////////////// Start Functions Code //////////////////////////////////////

// Start Page From Top
window.onload = function () {
  window.location.hash = "#";
};

// Create Links
function createLinks() {
  for (let i = 0; i < sections.length; i++) {
    let ul = document.querySelectorAll(".navbar__list");
    for (let x = 0; x < ul.length; x++) {
      let li = document.createElement("li");
      let anchor = document.createElement("a");
      let linkName = document.createTextNode(sections[i].dataset.nav);
      let hrefAttr = document.createAttribute("href");
      hrefAttr.value = "#" + sections[i].id;
      anchor.setAttributeNode(hrefAttr);
      ul[x].appendChild(li);
      li.appendChild(anchor);
      anchor.appendChild(linkName);
    }
  }
  links = document.querySelectorAll(".page__header .navbar__list li a");
}

// Remove active class from all Links
function removeLinksActiveClass() {
  for (let i = 0; i < links.length; i++) {
    links[i].classList.remove("active-link");
  }
}

// Handel Active Link
function handelActiveLinks() {
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
      removeLinksActiveClass();
      links[i].classList.add("active-link");
    });
  }
}

// Checking if section is fully visible
function isInViewPort(element) {
  // Get the bounding client rectangle position in the viewport
  let bounding = element.getBoundingClientRect();

  if (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  ) {
    return true;
  } else {
    return false;
  }
}

// Remove active class from all sections
function removeSectionActiveClass() {
  for (let i = 0; i < sections.length; i++) {
    sections[i].classList.remove("your-active-class");
  }
}

// Add active class to visible section
function handelActiveSections() {
  window.addEventListener("scroll", function () {
    for (let i = 0; i < sections.length; i++) {
      if (isInViewPort(sections[i])) {
        removeSectionActiveClass();
        sections[i].classList.add("your-active-class");
      }
    }
  });
}

// Up Button Script
function upButtonEvents() {
  // Remove Active from links by up button click
  document.querySelector(".up").addEventListener("click", removeLinksActiveClass);

  // Up Button Visible When start scrolling
  window.onscroll = function () {
    if (window.scrollY > 1000) {
      document.querySelector(".up").style.display = "block";
    } else {
      document.querySelector(".up").style.display = "none";
    }
  };
}

// Show & Hide Navbar
function showHideNavBar() {
  window.addEventListener(
    "scroll",
    function () {
      // Clear our timeout throughout the scroll
      window.clearTimeout(isScrolling);
      header.style.display = "flex";

      // Set a timeout to run after scrolling ends
      isScrolling = setTimeout(function () {
        header.style.display = "none";
      }, 2000);
    },
    false
  );

  // NavBar Style on hover
  header.addEventListener("mouseover", function () {
    window.clearTimeout(isScrolling);
  });

  // NavBar Style on leave
  header.addEventListener("mouseleave", function (event) {
    setTimeout(function () {
      event.target.style.display = "none";
    }, 2000);
  });
}

// Collapse Sections
function collapsSections() {
  for (let i = 0; i < sections.length; i++) {
    sections[i].addEventListener("click", function () {
      sections[i].querySelectorAll("p").forEach((p) => {
        p.classList.toggle("collapse");
      });
    });
  }
}
