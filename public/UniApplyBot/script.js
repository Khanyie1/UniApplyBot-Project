document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a, .mobile-menu a');

    const observerOptions = {
      root: null, 
      rootMargin: '0px',
      threshold: 0.2 
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          console.log(entry.target.id);
        if (entry.isIntersecting) {
          const sectionID = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionID) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });

    document.getElementById('toggleBotButton').addEventListener('click', function() {
      const botElement = document.querySelector('df-messenger');
      if (botElement.style.display === 'none') {
          botElement.style.display = 'block';
          this.textContent = 'Bot';
      } else {
          botElement.style.display = 'none';
          this.textContent = 'Bot';
      }
    });

    const menuIcon = document.getElementById('menu-icon');
    const mobileMenu = document.querySelector('.mobile-menu');

    menuIcon.addEventListener('click', function() {

        mobileMenu.classList.toggle('show');
    });
});


import { auth } from '../frontend/firebaseAPI.js';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

try {
  const logoutBtn = document.getElementById('logout');

  logoutBtn.addEventListener("click", () => {
    localStorage['loggedInUserId'] = '';
  
    signOut(auth)
    .then(() => {
      window.location.href = "../frontend/login.html"
    })
    .catch((error) => {
      console.error("Error signing out", error)
    })
  })
} catch {
  console.log("Failed to log out.")
}

try {
  const logout2 = document.getElementById("logout2");

  logout2.addEventListener("click", () => {
    signOut(auth)
    .then(() => {
      window.location.href = "../frontend/login.html"
    })
    .catch((error) => {
      console.error("Error signing out", error)
    })
  })
} catch {
  console.log("Failed to log out.")
}
