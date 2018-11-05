init();

function init() {
  const bgColorInput = document.getElementById('bgColorInput');
  const generateBtn = document.getElementById('generateBtn');
  const title = document.getElementById('title');
  const subject = document.getElementById('subject');
  const cover = document.getElementById('cover');

  const preference = loadPreference();
  title.innerHTML = preference.title;
  subject.innerHTML = preference.subject;
  bgColorInput.value = preference.color;
  cover.style.backgroundColor = preference.color;

  bgColorInput.addEventListener('keyup', function(event) {
  	cover.style.backgroundColor = bgColorInput.value;
  });

  generateBtn.addEventListener('click', function() {
    savePreference({
      title: title.innerHTML,
      subject: subject.innerHTML,
      color: bgColorInput.value
    });
  	html2canvas(cover, {
      scale: 2
    }).then(function(canvas) {
      window.open(canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream'));
  	});
  });
}

function savePreference(preference) {
  localStorage.setItem('preference', JSON.stringify(preference));
}

function loadPreference() {
  const defaultPreference = {
    title: 'Variables',
    subject: 'JavaScript',
    color: '#808080'
  };
  const preference = localStorage.getItem('preference');
  if (preference) {
    return JSON.parse(preference);
  }
  return defaultPreference;
}