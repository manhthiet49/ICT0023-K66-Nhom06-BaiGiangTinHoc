const quizForm = document.getElementById("quizForm");
const quizContainer = document.getElementById("quizContainer");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const demoBtn = document.getElementById("demoBtn");
const result = document.getElementById("result");

let questions = [];

fetch("./data/questions.json")
    .then(response => {

        if (!response.ok) {
            throw new Error("Không tìm thấy questions.json");
        }

        return response.json();

    })
    .then(data => {

        questions = data;

        renderQuiz();

    })
    .catch(error => {

        console.error(error);

        result.classList.remove("d-none");

        result.innerHTML = `
        <div class="alert alert-danger">

            <h5>Lỗi</h5>

            Không tải được dữ liệu câu hỏi.

            <br>

            Kiểm tra lại thư mục
            <strong>data/questions.json</strong>

        </div>
        `;

    });

function renderQuiz() {

    let html = "";

    questions.forEach((q, index) => {

        html += `

        <div class="card shadow-sm mb-4">

            <div class="card-body">

                <h5 class="mb-3">

                    Câu ${index + 1}. ${q.question}

                </h5>

                ${q.answers.map((answer, i) => `

                    <div class="form-check mb-2">

                        <input
                            class="form-check-input"
                            type="radio"
                            id="q${index}_${i}"
                            name="q${index}"
                            value="${i}">

                        <label
                            class="form-check-label"
                            for="q${index}_${i}">

                            ${answer}

                        </label>

                    </div>

                `).join("")}

            </div>

        </div>

        `;

    });

    quizContainer.innerHTML = html;

}

if (demoBtn) {

    demoBtn.addEventListener("click", () => {

        questions.forEach((q, index) => {

            const radios = document.getElementsByName(`q${index}`);

            if (radios.length > 0) {

                radios[q.correct].checked = true;

            }

        });

    });

}

submitBtn.addEventListener("click", () => {

    let score = 0;
    let answered = 0;
    let explainHTML = "";

    questions.forEach((q, index) => {

        const choose = document.querySelector(
            `input[name="q${index}"]:checked`
        );

        if (choose) {

            answered++;

            const userAnswer = Number(choose.value);

            if (userAnswer === q.correct) {

                score++;

                explainHTML += `
                <div class="alert alert-success mt-3">

                    <strong>Câu ${index + 1}: Đúng</strong>

                    <br>

                    ${q.explain}

                </div>
                `;

            } else {

                explainHTML += `
                <div class="alert alert-danger mt-3">

                    <strong>Câu ${index + 1}: Sai</strong>

                    <br>

                    Đáp án đúng:
                    <strong>${q.answers[q.correct]}</strong>

                    <br>

                    ${q.explain}

                </div>
                `;

            }

        }

    });

    result.classList.remove("d-none");

    if (answered !== questions.length) {

        result.innerHTML = `
        <div class="alert alert-warning">

            <h5>Bạn chưa hoàn thành bài.</h5>

            Vui lòng trả lời đủ
            <strong>${questions.length}</strong>
            câu hỏi.

        </div>
        `;

        return;

    }

    let level = "";

    if (score === questions.length) {

        level = "🌟 Xuất sắc";

    } else if (score >= 5) {

        level = "👍 Tốt";

    } else if (score >= 3) {

        level = "🙂 Đạt";

    } else {

        level = "📚 Cần ôn tập thêm";

    }

    result.innerHTML = `

    <div class="alert alert-primary">

        <h3>Kết quả bài làm</h3>

        <hr>

        <p>

            <strong>Điểm:</strong>

            ${score}/${questions.length}

        </p>

        <p>

            <strong>Đánh giá:</strong>

            ${level}

        </p>

    </div>

    ${explainHTML}

    `;

});

resetBtn.addEventListener("click", () => {

    quizForm.reset();

    result.classList.add("d-none");

    result.innerHTML = "";

});

$(document).ready(function () {

    $(document).on("mouseenter", ".card", function () {

        $(this).addClass("shadow-lg");

    });

    $(document).on("mouseleave", ".card", function () {

        $(this).removeClass("shadow-lg");

    });

    $(".btn").hover(

        function () {

            $(this).addClass("shadow");

        },

        function () {

            $(this).removeClass("shadow");

        }

    );

});
