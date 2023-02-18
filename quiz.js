const start_btn = document.querySelector(".start-btn button");
const info_box = document.querySelector(".info-box");
const exit_btn = document.querySelector(".buttons .quit");
const continue_btn = document.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz-box");
const option_list = document.querySelector(".option-list");
const timecount = quiz_box.querySelector(".timer-sec");
const timeline = quiz_box.querySelector(".time-line");
const timeoff = quiz_box.querySelector(".time-text");

let next_btn = document.querySelector(".next-btn");
const result_box = document.querySelector(".result-box");
const thanku=document.querySelector(".thanku");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");




const score_text=document.querySelector(".score-text");

quit_quiz.onclick=()=>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    start_btn.classList.remove("activestart");
    result_box.classList.remove("result-box-block");
  thanku.classList.toggle(".thanku_block");
 }

restart_quiz.onclick=()=>{
   window.location.reload();

}


//  if start quiz button click
start_btn.onclick = () => {
    info_box.classList.add("activeInfo");
}
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
}
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showquestions(0);
    queCount(1);
    startTimer(15);
    startTimeline(0);
    timeoff.textContent="Time Left";
}
let que_count = 0;
let que_numb = 1;
let counter;
let timeValue = 15;
let widthValue = 0;

// if next bun click
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showquestions(que_count);
        queCount(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterline);
        startTimeline(widthValue);
        next_btn.style.display = "none";
        timeoff.textContent="Time Left";


    }
    else {
        clearInterval(counter);
        clearInterval(counterline);
        console.log("completed");
        showresultbox();
    }
}
function showquestions(index) {
    const que_text = document.querySelector(".que-text");

    let que_tag = '<span>' + questions[index].numb + "." + questions[index].question + '</span>';
    let option_tag =
        '<div class="option">' + questions[index].option[0] + '</span></span></div>'
        + '<div class="option">' + questions[index].option[1] + '</span></span></div>'
        + '<div class="option">' + questions[index].option[2] + '</span></span></div>'
        + '<div class="option">' + questions[index].option[3] + '</span></span></div>';


    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;


    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
let tickIcon = '<div class="icon cross">&#10004;</i></div>'
let crossIcon = '<div class="icon cross">&#10006;</i></div>'

var count = 0;
function optionSelected(answer) {
    
    clearInterval(counter);
    clearInterval(counterline);
    clearInterval(counterline);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let alloptions = option_list.children.length;
    if (userAns == correctAns) {
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
        count++;
        console.log(count);
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        // if ans is incorrect then auto select the correct
        for (let i = 0; i < alloptions; i++) {
            if (option_list.children[i].textContent == correctAns) {
                option_list.children[i].setAttribute("class", "option correct")
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);

            }
        }
    }
    // // once user select the ans all are disable
    for (let i = 0; i < alloptions; i++) {
        option_list.children[i].classList.add("disable")
    }
    next_btn.style.display = "block";
}

function showresultbox() {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    start_btn.classList.remove("activestart");
    result_box.classList.toggle("result-box-block");
    totalMarks();

}


function startTimer(time) {
    counter = setInterval(timer, 1000)
    function timer() {
        timecount.textContent = time;
        time--;
        if (time < 9) {
            let addzero = timecount.textContent;
            timecount.textContent = "0" + addzero;
        }
        if (time < 0) {
            clearInterval(counter);
            timecount.textContent = "00";
            timeoff.textContent="Time Off";
            let correctAns = questions[que_count].answer;
            let alloptions = option_list.children.length;
            for (let i = 0; i < alloptions; i++) {
                if (time < 0) {
                    option_list.style.cursor="pointer";
                }
            }
            for (let i = 0; i < alloptions; i++) {
                option_list.children[i].classList.add("disable")
            }
            next_btn.style.display = "block";
        }
    }
}

function startTimeline(time) {
    counterline = setInterval(timer, 29);
    function timer() {
        time += 1;
        timeline.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterline);
        }
    }
}

function totalMarks(){

let result= '<span>     And Congrats you got only <strong>'+ count+'</strong> out of<strong> '+que_numb+'</strong></span>';
score_text.innerHTML=result;
}
function queCount(index) {
    const btn_que_counter = quiz_box.querySelector(".total-que");
    let total_queCountTag = '<span><p>' + index + '</p>of</p>' + questions.length + '</p>Questions</span>';
    btn_que_counter.innerHTML = total_queCountTag;
}
