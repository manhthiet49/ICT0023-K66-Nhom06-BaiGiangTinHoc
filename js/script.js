const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const result = document.getElementById("result");

if (submitBtn) {

    submitBtn.addEventListener("click", function () {

        const totalQuestions = 5;

        let score = 0;

        for (let i = 1; i <= totalQuestions; i++) {

            const answer = document.querySelector(
                `input[name="q${i}"]:checked`
            );

            if (!answer) {

                result.className = "alert alert-warning mt-4";

                result.innerHTML =
                    `<strong>Bạn chưa trả lời câu ${i}.</strong>`;

                return;
            }

            if (answer.value === "1") {

                score++;

            }

        }

        let message = "";

        let color = "";

        if (score === 5) {

            color = "success";

            message = "Xuất sắc! Bạn đã nắm vững kiến thức.";

        }

        else if (score >= 3) {

            color = "info";

            message = "Bạn đã hiểu phần lớn nội dung bài học.";

        }

        else {

            color = "danger";

            message = "Bạn nên xem lại bài giảng trước khi làm lại.";

        }

        result.className = `alert alert-${color} mt-4`;

        result.innerHTML = `
            <h4>Kết quả bài làm</h4>
            <hr>
            <h3>${score}/5 điểm</h3>
            <p>${message}</p>
        `;

    });

}



if (resetBtn) {

    resetBtn.addEventListener("click", function () {

        result.className = "d-none";

        result.innerHTML = "";

    });

}

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const message = document.getElementById("message").value.trim();

        if (name === "") {

            alert("Vui lòng nhập họ và tên.");

            return;

        }

        if (email === "") {

            alert("Vui lòng nhập email.");

            return;

        }

        if (!email.includes("@")) {

            alert("Email không hợp lệ.");

            return;

        }

        if (message.length < 10) {

            alert("Nội dung góp ý quá ngắn.");

            return;

        }

        alert("Gửi góp ý thành công!");

        contactForm.reset();

    });

}

const searchInput = document.getElementById("search");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const keyword = this.value.toLowerCase();

        const cards = document.querySelectorAll(".term-card");

        cards.forEach(function (card) {

            const text = card.innerText.toLowerCase();

            if (text.includes(keyword)) {

                card.style.display = "block";

            }

            else {

                card.style.display = "none";

            }

        });

    });

}


$(document).ready(function () {

    $(".card").hover(

        function () {

            $(this).addClass("shadow-lg");

        },

        function () {

            $(this).removeClass("shadow-lg");

        }

    );

});
