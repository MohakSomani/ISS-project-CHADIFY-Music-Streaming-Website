const navbarLinks = document.querySelectorAll('.navbar a');
navbarLinks.forEach(link => {
  link.addEventListener('mouseover', function() {
    this.style.color = 'rgb(2, 225, 255)';
    this.style.fontSize = '22px';
  });
  link.addEventListener('mouseout', function() {
    this.style.color = '#eeeeee';
    this.style.fontSize = '20px';
  });
});