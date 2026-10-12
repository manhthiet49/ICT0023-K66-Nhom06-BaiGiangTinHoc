document.addEventListener("DOMContentLoaded", function () {

    const topBtn = document.getElementById("topBtn");

    if (topBtn) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 300) {

                topBtn.style.display = "block";

            } else {

                topBtn.style.display = "none";

            }

        });

        topBtn.addEventListener("click", function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

    const cards = document.querySelectorAll(

        ".card,.lesson-box,.question-card,.glossary-card"

    );

    cards.forEach(function (card) {

        card.classList.add("fadeIn");

    });

    const clock = document.getElementById("clock");

    function updateClock() {

        if (!clock) return;

        const now = new Date();

        const h = now.getHours().toString().padStart(2, "0");

        const m = now.getMinutes().toString().padStart(2, "0");

        const s = now.getSeconds().toString().padStart(2, "0");

        clock.innerHTML = h + ":" + m + ":" + s;

    }

    updateClock();

    setInterval(updateClock, 1000);

    const header = document.querySelector("header");

    if (header) {

        header.classList.add("slideUp");

    }

});

const searchInput = document.getElementById("searchQuestion");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const keyword = this.value.toLowerCase().trim();

        const cards = document.querySelectorAll("#glossaryContainer .col-md-4");

        let count = 0;

        cards.forEach(function (item) {

            const text = item.textContent.toLowerCase();

            if (text.includes(keyword)) {

                item.style.display = "";

                count++;

            } else {

                item.style.display = "none";

            }

        });

        let result = document.getElementById("searchResult");

        if (!result) {

            result = document.createElement("p");

            result.id = "searchResult";

            result.className = "text-center fw-bold mt-4";

            document
                .getElementById("glossaryContainer")
                .insertAdjacentElement("afterend", result);

        }

        if (keyword === "") {

            result.innerHTML = "";

        } else if (count === 0) {

            result.className = "text-center text-danger fw-bold mt-4";

            result.innerHTML = "Không tìm thấy thuật ngữ phù hợp.";

        } else {

            result.className = "text-center text-success fw-bold mt-4";

            result.innerHTML = "Tìm thấy " + count + " thuật ngữ.";

        }

    });

}

const glossaryCards = document.querySelectorAll(".glossary-card");

glossaryCards.forEach(function (card) {

    card.addEventListener("mouseenter", function () {

        card.classList.add("shadow");

    });

    card.addEventListener("mouseleave", function () {

        card.classList.remove("shadow");

    });

});

window.addEventListener("load", function () {

    glossaryCards.forEach(function (card, index) {

        setTimeout(function () {

            card.classList.add("fadeIn");

        }, index * 100);

    });

});

let questions = [];

const quizContainer = document.getElementById("quizContainer");

if (quizContainer) {

    fetch("data/questions.json")

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

    quizContainer.innerHTML = "";

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

const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const demoBtn = document.getElementById("demoBtn");

const result = document.getElementById("result");

if (submitBtn) {

    submitBtn.addEventListener("click", function () {

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

        const percent = Math.round(score / total * 100);

        let color = "bg-danger";
        let text = "Bạn cần ôn tập thêm.";

        if (percent >= 90) {

            color = "bg-success";
            text = "🎉 Xuất sắc! Bạn đã nắm rất vững kiến thức.";

        } else if (percent >= 70) {

            color = "bg-info";
            text = "👍 Kết quả tốt! Tiếp tục phát huy.";

        } else if (percent >= 50) {

            color = "bg-warning";
            text = "⚠️ Bạn nên xem lại bài giảng.";

        }

        result.innerHTML = `

            <div class="card shadow mt-5">

                <div class="card-body text-center">

                    <h2 class="text-primary mb-4">

                        KẾT QUẢ BÀI LÀM

                    </h2>

                    <h1 class="display-4 fw-bold">

                        ${score} / ${total}

                    </h1>

                    <div class="progress mt-4 mb-4">

                        <div
                            class="progress-bar ${color}"
                            style="width:${percent}%"
                        >

                            ${percent}%

                        </div>

                    </div>

                    <div class="alert alert-primary">

                        ${text}

                    </div>

                </div>

            </div>

        `;

        result.scrollIntoView({

            behavior: "smooth"

        });

    });

}

if (resetBtn) {

    resetBtn.addEventListener("click", function () {

        document.getElementById("quizForm").reset();

        result.innerHTML = "";

    });

}

if (demoBtn) {

    demoBtn.addEventListener("click", function () {

        questions.forEach(function (q, index) {

            const random = Math.floor(Math.random() * q.options.length);

            const radio = document.getElementById(
                "q" + index + "_" + random
            );

            if (radio) {

                radio.checked = true;

            }

        });

    });

}

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        const success = document.getElementById("successMessage");

        if (
            name.value.trim() === "" ||
            email.value.trim() === "" ||
            message.value.trim() === ""
        ) {

            alert("Vui lòng nhập đầy đủ thông tin.");

            return;

        }

        success.classList.remove("d-none");

        contactForm.reset();

        setTimeout(function () {

            success.classList.add("d-none");

        }, 3000);

    });

}

$("input, textarea, select").on("focus", function () {

    $(this).addClass("shadow");

});

$("input, textarea, select").on("blur", function () {

    $(this).removeClass("shadow");

});

console.log("Website Chủ đề D đã tải thành công.");
