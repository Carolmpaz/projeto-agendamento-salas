document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.getElementById('menu-btn');
  const sidebar = document.getElementById('sidebar');

  menuBtn.addEventListener('click', function() {
    sidebar.classList.toggle('active');
  });

  
  document.addEventListener('click', function(event) {
    if (!sidebar.contains(event.target) && !menuBtn.contains(event.target)) {
      sidebar.classList.remove('active');
    }
  });
});
