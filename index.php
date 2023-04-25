<!DOCTYPE html>
<html>
  <head>
    <title>test page</title>
    <!-- Load CSS files -->
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="stylesheet" href="css/sections.css">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css" />
    <!-- AOS CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" />
  </head>
  <body>
    <!-- Navigation Bar -->
    <div class="navbar">
      <!-- Include navbar HTML from navbar.html file -->
      <?php include 'navbar.html'; ?>
    </div>
    <!-- Main Content -->
    <div class="main-content">
      <!-- Include sections HTML from sections.html file -->
      <?php include 'sections.html'; ?>
    </div>
    <!-- Load JavaScript files -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- Bootstrap JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/js/bootstrap.min.js"></script>
    <!-- AOS JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
    <script>
      // Add active class based on the visible section
      const navLinks = document.querySelectorAll('.nav a');
      const sections = document.querySelectorAll('section');
      const options = {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
      };
      const intersectionCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const activeLink = document.querySelector(`.nav a[href="#${entry.target.id}"]`);
            activeLink.closest('li').classList.add('active');
          } else {
            const inactiveLink = document.querySelector(`.nav a[href="#${entry.target.id}"]`);
            inactiveLink.closest('li').classList.remove('active');
          }
        });
      };
      const observer = new IntersectionObserver(intersectionCallback, options);
      sections.forEach((section) => observer.observe(section));
      // Smooth scrolling for anchor links
      $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear');
      });

      // Initialize AOS
      AOS.init();

    </script>
  </body>
</html>