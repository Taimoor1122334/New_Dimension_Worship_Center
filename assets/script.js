// Mobile menu toggle (global for inline onclick)
function toggleMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  const nav = mobileMenu ? mobileMenu.querySelector('nav') : null;
  const menuIconPath = document.getElementById('menuIconPath');
  if (!mobileMenu) return;

  const isHidden = mobileMenu.classList.contains('hidden');
  if (isHidden) {
    mobileMenu.classList.remove('hidden');
    if (nav) {
      nav.classList.remove('opacity-0', 'scale-y-0');
      nav.classList.add('opacity-100', 'scale-y-100');
    }
    if (menuIconPath) menuIconPath.setAttribute('d', 'M6 18L18 6M6 6l12 12');
  } else {
    mobileMenu.classList.add('hidden');
    if (nav) {
      nav.classList.remove('opacity-100', 'scale-y-100');
      nav.classList.add('opacity-0', 'scale-y-0');
    }
    if (menuIconPath) menuIconPath.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
  }
}

// Expose for inline onclick usage
window.toggleMenu = toggleMenu;

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    const mm = document.getElementById('mobileMenu');
    const mip = document.getElementById('menuIconPath');
    if (mm) mm.classList.add('hidden');
    if (mip) mip.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
  });
});



// Mobile dropdown toggles
document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const currentSubmenu = toggle.nextElementSibling;
    if (!currentSubmenu || !currentSubmenu.classList.contains('mobile-submenu')) return;

    // Close other open submenus
    document.querySelectorAll('.mobile-submenu').forEach(menu => {
      if (menu !== currentSubmenu) {
        menu.style.maxHeight = '0px';
        menu.classList.add('hidden');
      }
    });

    // Toggle current submenu
    const isOpen = currentSubmenu.style.maxHeight && currentSubmenu.style.maxHeight !== '0px';
    if (isOpen) {
      currentSubmenu.style.maxHeight = '0px';
      // hide after transition ends to avoid layout gap
      currentSubmenu.addEventListener('transitionend', function handle() {
        currentSubmenu.classList.add('hidden');
        currentSubmenu.removeEventListener('transitionend', handle);
      });
      toggle.querySelector('svg')?.classList.remove('rotate-180');
    } else {
      currentSubmenu.classList.remove('hidden');
      // Let browser compute height, then animate to content height
      requestAnimationFrame(() => {
        currentSubmenu.style.maxHeight = currentSubmenu.scrollHeight + 'px';
      });
      toggle.querySelector('svg')?.classList.add('rotate-180');
    }
  });
});


// Navbar Fixed on Scroll
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('mainNavbar');
  const header = navbar ? navbar.closest('header') : null;
  if (!navbar) return;

  // Use a fixed scroll threshold instead of percentage for consistency across pages
  const scrollThreshold = 300; // pixels from top

  if (window.scrollY > scrollThreshold) {
    navbar.classList.add('fixed', 'top-0', 'left-0', 'right-0', 'z-50', 'animate__animated', 'animate__fadeInDown');
    navbar.classList.remove('relative');

    // Add padding-top to header to prevent content shift
    if (header) {
      // Use a fixed height or calculate navbar height more reliably
      const navbarHeight = navbar.offsetHeight || 80; // fallback to 80px if calculation fails
      header.style.paddingTop = navbarHeight + 'px';
    }
  } else {
    navbar.classList.remove('fixed', 'top-0', 'left-0', 'right-0', 'z-50', 'animate__animated', 'animate__fadeInDown');
    navbar.classList.add('relative');

    // Remove padding-top when navbar returns to relative
    if (header) {
      header.style.paddingTop = '0px';
    }
  }
});

document.querySelectorAll('.dropdown-container').forEach(container => {
    const menu = container.querySelector('.dropdown-menu');
    let timeoutId;
    
    container.addEventListener('mouseenter', () => {
        clearTimeout(timeoutId);
        menu.classList.remove('hidden');
    });
    
    container.addEventListener('mouseleave', () => {
        timeoutId = setTimeout(() => {
            menu.classList.add('hidden');
        }, 150); // Small delay to prevent flickering
    });

    
});

// Auto-open details elements when menu links are clicked
const ministryIds = ['#men-ministry', '#women-ministry', '#young-adult', '#childeren-youth', '#marriage-ministry'];
document.querySelectorAll('.dropdown-menu a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    // Check if link points to a details element on the current page or ministries page
    if (href && ministryIds.some(id => href.includes(id))) {
      // Extract the ID from the href
      const id = href.split('#')[1];
      if (id) {
        // Use setTimeout to ensure the page has scrolled first
        setTimeout(() => {
          const detailsElement = document.getElementById(id);
          if (detailsElement && detailsElement.tagName === 'DETAILS') {
            // Close all other details elements first
            document.querySelectorAll('details').forEach(details => {
              if (details !== detailsElement) {
                details.open = false;
              }
            });
            // Open the target details element
            detailsElement.open = true;
            // Scroll into view with smooth behavior and proper margin
            detailsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  });
});

// Ensure only one details element is open at a time (manual toggle)
document.querySelectorAll('details').forEach(details => {
  details.addEventListener('toggle', function() {
    if (this.open) {
      // Close all other details elements when one opens
      document.querySelectorAll('details').forEach(otherDetails => {
        if (otherDetails !== this) {
          otherDetails.open = false;
        }
      });
    }
  });
});

// -------video play---------------
  const video = document.getElementById("customVideo");
  const playBtn = document.getElementById("playBtn");
  const thumbnail = document.getElementById("videoThumbnail");

  if (video && playBtn) {
    let hasPlayedOnce = false;

    // First play
    playBtn.addEventListener("click", () => {
      video.play();
      playBtn.classList.add("hidden");

      if (!hasPlayedOnce && thumbnail) {
        thumbnail.classList.add("hidden");
        hasPlayedOnce = true;
      }
    });

    // Pause video (thumbnail will NOT return)
    video.addEventListener("click", () => {
      if (!video.paused) {
        video.pause();
        playBtn.classList.remove("hidden");
      }
    });
  }


document.querySelectorAll('.learn-more-btn').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();

    const card = this.closest('.border');
    const content = card?.querySelector('.event-content');
    if (!content) return;

    const isOpen = content.classList.contains('max-h-[1000px]');

    content.classList.toggle('max-h-0', isOpen);
    content.classList.toggle('max-h-[1000px]', !isOpen);

    this.textContent = isOpen ? 'Learn more' : 'Show less';
  });
});
