/* ========  themeSwitcher start ========= */
document.addEventListener('DOMContentLoaded', () => {
  // themeSwitcher
  const themeSwitcher = document.getElementById('themeSwitcher');
  const ud_header = document.querySelector('.ud-header');

  // Theme Vars
  const userTheme = localStorage.getItem('theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Initial Theme Check
  const themeCheck = () => {
    if (userTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (userTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      if (systemTheme) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  // Manual Theme Switch
  const themeSwitch = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      if (ud_header.classList.contains('sticky-header')) {
        document.querySelector('.header-logo').src = '/assets/logo/flopach.png';
      }
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      if (ud_header.classList.contains('sticky-header')) {
        document.querySelector('.header-logo').src = '/assets/logo/flopach-white.png';
      }
    }
  };

  // call theme switch on clicking buttons
  themeSwitcher.addEventListener('click', () => {
    themeSwitch();
  });

  // invoke theme check on initial load
  themeCheck();
});
