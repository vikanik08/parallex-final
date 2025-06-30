document.addEventListener('DOMContentLoaded', function() {
  let burger = document.getElementById('burger');
  let menu = document.getElementById('menu');
  
  // Функция для закрытия меню
  function closeMenu() {
    menu.classList.remove('open');
    burger.textContent = 'меню';
  }
  
  burger.addEventListener('click', function(e) {
    e.stopPropagation(); // Предотвращаем всплытие, чтобы клик не закрыл меню сразу
    menu.classList.toggle('open');
    
    if (menu.classList.contains('open')) {
      burger.textContent = 'свернуть окно';
    } else {
      burger.textContent = 'меню';
    }
  });

  // Закрытие меню при клике в любом месте документа
  document.addEventListener('click', function(e) {
    // Если клик не по меню и не по бургеру, и меню открыто - закрываем его
    if (!e.target.closest('#menu') && !e.target.closest('#burger') && menu.classList.contains('open')) {
      closeMenu();
    }
    
    // Остальной код для подменю (как было)
    if (!e.target.closest('.has-submenu') && !e.target.closest('.burger')) {
      let openSubmenus = document.querySelectorAll('.submenu');
      for (let j = 0; j < openSubmenus.length; j++) {
        openSubmenus[j].style.opacity = '0';
        openSubmenus[j].style.visibility = 'hidden';
      }
    }
  });

  // Анимация разъезжания для подменю
  let submenuItems = document.querySelectorAll('.has-submenu');
  
  for (let i = 0; i < submenuItems.length; i++) {
    submenuItems[i].addEventListener('mouseenter', function() {
      this.style.marginBottom = '15vw';
    });
    
    submenuItems[i].addEventListener('mouseleave', function() {
      this.style.marginBottom = '0';
    });
  }

  let pageTransition = document.querySelector('.page-transition');
  let links = document.querySelectorAll('a[href^="http"]:not([target="_blank"]), a[href^="/"], a[href^="."]');
  
  function startTransition(e) {
    if (e.target.getAttribute('href') === '#') return;
    
    e.preventDefault();
    let targetUrl = e.target.getAttribute('href');
    
    pageTransition.classList.add('active');
    
    setTimeout(function() {
      window.location.href = targetUrl;
    }, 800);
  }
  
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', startTransition);
  }
  
  pageTransition.classList.remove('active');
});