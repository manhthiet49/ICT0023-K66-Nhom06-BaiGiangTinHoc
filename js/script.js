const quizForm = document.getElementById("quizForm");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const result = document.getElementById("result");

let questions = [];

fetch("questions.json")
.then(response => response.json())
.then(data => {
    questions = data;
    renderQuiz();
})
.catch(() => {
    result.innerHTML =
    `<div class="alert alert-danger">
        Không tải được dữ liệu câu hỏi.
    </div>`;
});

function renderQuiz(){

    const container = document.getElementById("quizContainer");

    let html = "";

    questions.forEach((q,index)=>{

        html += `
        <div class="card shadow-sm mb-4">
            <div class="card-body">

                <h5>${index+1}. ${q.question}</h5>

                ${q.answers.map((ans,i)=>`

                    <div class="form-check">

                        <input
                        class="form-check-input"
                        type="radio"
                        name="q${index}"
                        value="${i}">

                        <label class="form-check-label">

                            ${ans}

                        </label>

                    </div>

                `).join("")}

            </div>
        </div>
        `;

    });

    container.innerHTML = html;

}

submitBtn.addEventListener("click",()=>{

    let score=0;

    let answered=0;

    questions.forEach((q,index)=>{

        const choose=document.querySelector(`input[name=q${index}]:checked`);

        if(choose){

            answered++;

            if(Number(choose.value)===q.correct){

                score++;

            }

        }

    });

    if(answered!==questions.length){

        result.innerHTML=`
        <div class="alert alert-warning">
            Bạn chưa trả lời hết câu hỏi.
        </div>`;

        return;

    }

    let level="";

    if(score===questions.length){

        level="Xuất sắc";

    }else if(score>=4){

        level="Tốt";

    }else if(score>=3){

        level="Đạt";

    }else{

        level="Cần ôn tập thêm";

    }

    result.innerHTML=`

    <div class="alert alert-success mt-4">

        <h4>Kết quả</h4>

        <p><strong>Điểm:</strong> ${score}/${questions.length}</p>

        <p><strong>Đánh giá:</strong> ${level}</p>

    </div>

    `;

    result.scrollIntoView({

        behavior:"smooth",
        block:"center"

    });

});

resetBtn.addEventListener("click",()=>{

    result.innerHTML="";

});

$(function(){

    $(".card").hover(

        function(){

            $(this).addClass("shadow-lg");

        },

        function(){

            $(this).removeClass("shadow-lg");

        }

    );

});
