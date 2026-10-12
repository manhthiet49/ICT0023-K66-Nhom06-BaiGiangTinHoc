document.addEventListener('DOMContentLoaded', function () 

  const topBtn = document.getElementById('topBtn');

  if (topBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        topBtn.style.display = 'block';
      } else {
        topBtn.style.display = 'none';
      }
    });

    topBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,

        behavior: 'smooth',
      });
    });
  }

  const cards = document.querySelectorAll(
    '.card,.lesson-box,.question-card,.glossary-card'
  );

  cards.forEach(function (card) {
    card.classList.add('fadeIn');
  });

  const clock = document.getElementById('clock');

  function updateClock() {
    if (!clock) return;

    const now = new Date();

    let h = now.getHours().toString().padStart(2, '0');

    let m = now.getMinutes().toString().padStart(2, '0');

    let s = now.getSeconds().toString().padStart(2, '0');

    clock.innerHTML = h + ':' + m + ':' + s;
  }

  updateClock();

  setInterval(updateClock, 1000);

  const header = document.querySelector('header');

  if (header) {
    header.classList.add('slideUp');
  }
});

const searchInput = document.getElementById('searchQuestion');

if (searchInput) {
  searchInput.addEventListener('keyup', function () {
    const keyword = this.value.toLowerCase().trim();

    const cards = document.querySelectorAll('#glossaryContainer .col-md-4');

    let count = 0;

    cards.forEach(function (item) {
      const text = item.textContent.toLowerCase();

      if (text.includes(keyword)) {
        item.style.display = '';

        count++;
      } else {
        item.style.display = 'none';
      }
    });

    let message = document.getElementById('searchResult');

    if (!message) {
      message = document.createElement('p');

      message.id = 'searchResult';
      message.className = 'text-center fw-bold mt-4';

      document
        .getElementById('glossaryContainer')
        .insertAdjacentElement('afterend', message);
    }

    if (keyword === '') {
      message.innerHTML = '';
    } else if (count === 0) {
      message.innerHTML = 'Không tìm thấy thuật ngữ phù hợp.';

      message.className = 'text-center text-danger fw-bold mt-4';
    } else {
      message.innerHTML = 'Tìm thấy ' + count + ' thuật ngữ.';

      message.className = 'text-center text-success fw-bold mt-4';
    }
  });
}

const glossaryCards = document.querySelectorAll('.glossary-card');

glossaryCards.forEach(function (card) {
  card.addEventListener('mouseenter', function () {
    card.classList.add('shadow');
  });

  card.addEventListener('mouseleave', function () {
    card.classList.remove('shadow');
  });
});

window.addEventListener('load', function () {
  glossaryCards.forEach(function (card, index) {
    setTimeout(function () {
      card.classList.add('fadeIn');
    }, index * 100);
  });
});

let questions = [];

const quizContainer = document.getElementById('quizContainer');

if (quizContainer) {
  fetch('questions.json')
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      questions = data;

      renderQuiz();
    })

    .catch(function () {
      quizContainer.innerHTML = `

                <div class="alert alert-danger text-center">

                    Không thể tải file questions.json

                </div>

            `;
    });
}

function renderQuiz() {
  if (!quizContainer) return;

  quizContainer.innerHTML = '';

  questions.forEach(function (q, index) {
    let html = `

        <div class="card question-card shadow mb-4">

            <div class="card-body">

                <h5 class="fw-bold mb-3">

                    Câu ${index + 1}. ${q.question}

                </h5>

        `;

    q.options.forEach(function (option, i) {
      html += `

            <div class="form-check mb-2">

                <input

                    class="form-check-input"

                    type="radio"

                    name="q${index}"

                    id="q${index}_${i}"

                    value="${i}"

                >

                <label

                    class="form-check-label"

                    for="q${index}_${i}"

                >

                    ${option}

                </label>

            </div>

            `;
    });

    html += `

            </div>

        </div>

        `;

    quizContainer.innerHTML += html;
  });
}

const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const demoBtn = document.getElementById('demoBtn');

const resultBox = document.getElementById('resultBox');
const scoreText = document.getElementById('scoreText');
const scoreBar = document.getElementById('scoreBar');
const message = document.getElementById('message');

if (submitBtn) {
  submitBtn.addEventListener('click', function (e) {
    e.preventDefault();

    let score = 0;

    questions.forEach(function (q, index) {
      const answer = document.querySelector(
        'input[name="q' + index + '"]:checked'
      );

      if (answer && Number(answer.value) === q.answer) {
        score++;
      }
    });

    const total = questions.length;

    const percent = Math.round((score / total) * 100);

    resultBox.classList.remove('d-none');

    scoreText.innerHTML = score + ' / ' + total;

    scoreBar.style.width = percent + '%';

    scoreBar.innerHTML = percent + '%';

    if (percent >= 90) {
      message.className = 'alert alert-success';

      message.innerHTML = '🎉 Xuất sắc! Bạn đã nắm rất vững kiến thức.';
    } else if (percent >= 70) {
      message.className = 'alert alert-info';

      message.innerHTML = '👍 Kết quả tốt! Chỉ cần ôn thêm một chút.';
    } else if (percent >= 50) {
      message.className = 'alert alert-warning';

      message.innerHTML = '⚠ Bạn nên xem lại bài giảng trước khi làm lại.';
    } else {
      message.className = 'alert alert-danger';

      message.innerHTML = '❌ Bạn cần ôn tập lại toàn bộ bài học.';
    }

    resultBox.scrollIntoView({
      behavior: 'smooth',
    });
  });
}

if (resetBtn) {
  resetBtn.addEventListener('click', function (e) {
    e.preventDefault();

    document.getElementById('quizForm').reset();

    resultBox.classList.add('d-none');

    scoreBar.style.width = '0%';

    scoreBar.innerHTML = '0%';

    scoreText.innerHTML = '0 / ' + questions.length;
  });
}

if (demoBtn) {
  demoBtn.addEventListener('click', function (e) {
    e.preventDefault();

    questions.forEach(function (q, index) {
      const radio = document.getElementById('q' + index + '_' + q.answer);

      if (radio) {
        radio.checked = true;
      }
    });
  });
}

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const role = document.getElementById('role');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    const successMessage = document.getElementById('successMessage');

    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';

    let valid = true;

    if (name.value.trim() === '') {
      nameError.textContent = 'Vui lòng nhập họ và tên.';

      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {
      emailError.textContent = 'Email không hợp lệ.';

      valid = false;
    }

    if (messageInput.value.trim().length < 10) {
      messageError.textContent = 'Nội dung phải có ít nhất 10 ký tự.';

      valid = false;
    }

    if (!valid) return;

    successMessage.classList.remove('d-none');

    contactForm.reset();

    setTimeout(function () {
      successMessage.classList.add('d-none');
    }, 3000);
  });
}

$('input, textarea, select').on('focus', function () {
  $(this).addClass('shadow');
});

$('input, textarea, select').on('blur', function () {
  $(this).removeClass('shadow');
});

console.log('Website Chủ đề D đã tải thành công.');
