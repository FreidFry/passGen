window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

const copyButton = document.getElementById('copy');
const mailToCopy = document.getElementById('uotputmail');
const passToCopy = document.getElementById('uotputpass');

function copyToClipboard(type) {
    const inputElement = document.querySelector(`.output.${type}`);
    if (inputElement) {
        inputElement.select();
        navigator.clipboard.writeText(inputElement.value)
            .then(() => {
                showNotification();
            })
            .catch(err => {
                console.error('Ошибка копирования: ', err);
            });
    }
}

function copyAll() {
  const inputs = document.querySelectorAll('.output');
  let textToCopy = '';

  inputs.forEach(input => {
      const button = input.nextElementSibling;
      const additionalText = button.getAttribute('data-copy-text');
      textToCopy += additionalText + input.value + '\n';
  });
  const tempInput = document.createElement('textarea');
  document.body.appendChild(tempInput);
  tempInput.value = textToCopy.trim();
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  showNotification();
}


const generateButton = document.getElementById('generate');

function generate() {
    const elements = document.querySelectorAll('input');
    const outputs = document.querySelectorAll('.output');
    let first = true;
    elements.forEach((element, index) => {
        const len = parseInt(element.value) || 20;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < len; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
            
        }
        if(first){
            result += "@gmail.com";
            first = false;
        }
        if (outputs[index]) {
            outputs[index].value = result;
        }
    });
}

function showNotification() {
    var notification = document.getElementById('notification');
    notification.style.display = 'block';
    setTimeout(function () {
        notification.style.display = 'none';
    }, 3000);
}

const themeToggleButton = document.getElementById('theme-toggle');


if (localStorage.getItem('theme') === 'dark') {
  loadDarkThemeStyles();
} else {
  loadLightThemeStyles();
}

themeToggleButton.addEventListener('click', () => {
  if (document.body.classList.contains('dark-theme')) {
    localStorage.removeItem('theme');
    loadLightThemeStyles();
  } else {
    localStorage.setItem('theme', 'dark');
    loadDarkThemeStyles();
  }
});

function loadDarkThemeStyles() {
  document.body.classList.add('dark-theme');
  document.body.classList.remove('light-theme');
  

  removeThemeStyles('css/light-theme.css');
  
  const darkThemeLink = document.createElement('link');
  darkThemeLink.rel = 'stylesheet';
  darkThemeLink.href = 'css/dark-theme.css';
  darkThemeLink.id = 'dark-theme-link';
  document.head.appendChild(darkThemeLink);
}

function loadLightThemeStyles() {
  document.body.classList.add('light-theme');
  document.body.classList.remove('dark-theme');
  
  removeThemeStyles('css/dark-theme.css');
  
  const lightThemeLink = document.createElement('link');
  lightThemeLink.rel = 'stylesheet';
  lightThemeLink.href = 'css/light-theme.css';
  lightThemeLink.id = 'light-theme-link';
  document.head.appendChild(lightThemeLink);
}

function removeThemeStyles(themeFileName) {
  const existingLink = document.querySelector(`link[href="${themeFileName}"]`);
  if (existingLink) {
    existingLink.remove();
  }
}
