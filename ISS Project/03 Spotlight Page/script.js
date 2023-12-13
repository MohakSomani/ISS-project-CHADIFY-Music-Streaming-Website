 

const content = document.querySelector('.content');
const img = content.querySelector('img');

content.style.position = 'absolute';
content.style.inset = '10px';
content.style.border = '6px solid #00000000';
content.style.zIndex = '3';
content.style.borderRadius = '50%';
content.style.overflow = 'hidden';

img.style.position = 'absolute';
img.style.top = '0';
img.style.left = '0';
img.style.width = '100%';
img.style.height = '100%';
img.style.objectFit = 'cover';
img.style.transition = 'transform 0.3s ease-out';

content.addEventListener('mouseover', () => {
  img.style.transform = 'scale(1.1)';
});

content.addEventListener('mouseout', () => {
  img.style.transform = 'scale(1)';
});




 var countDownDate = new Date("June 30, 2023 00:00:00").getTime();


 var x = setInterval(function() {

 
   var now = new Date().getTime();

   var timeRemaining = countDownDate - now;

   var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
   var hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
   var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
   var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

   document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
   + minutes + "m " + seconds + "s ";

   if (timeRemaining < 0) {
     clearInterval(x);
     document.getElementById("countdown").innerHTML = "EXPIRED";
   }
 }, 1000);

var i = 0;
var txt = "The Spotlight Artist is... ";
var speed = 50;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("heading").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

window.onload = function () {
  typeWriter();

};

const reviewForm = document.getElementById('review-form');
      const reviewTable = document.getElementById('review-table').getElementsByTagName('tbody')[0];

      function handleSubmit(event) {
        event.preventDefault();

        alert("Thank you for your Review : )");

        const rating = document.querySelector('input[name="rating"]:checked').value;
        const review = document.getElementById('review').value;
        const userName = document.getElementById('user-name').value;

        const reviewEntry = {
          'userName': userName,
          'rating': rating,
          'review': review          
        };

        const row = reviewTable.insertRow();
        for (let key in reviewEntry) {
          const cell = row.insertCell();
          const text = document.createTextNode(reviewEntry[key]);
          cell.appendChild(text);
        }

        reviewForm.reset();
      }

      reviewForm.addEventListener('submit', handleSubmit);

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