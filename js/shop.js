document.addEventListener('DOMContentLoaded', function () {
      var likeButtons = document.querySelectorAll('.like-btn');
      likeButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          btn.classList.toggle('active');
        });
      });
    });