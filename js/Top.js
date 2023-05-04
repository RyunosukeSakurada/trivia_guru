const form = document.querySelector('#myForm')
form.addEventListener('submit', (e) => {
    e.PreventDefault();
    const selectedOption1 = option1.value;  
    const selectedOption2 = option2.value;
    localStorage.setItem('selectedOption1', selectedOption1);
    localStorage.setItem('selectedOption2',selectedOption2);

    window.location.href = '../trivia/Trivia.html';
  })

  const startEl = document.querySelector('.start_btn')
  startEl.addEventListener('click', function() {

    const genreEl = document.getElementById('genre-select');
    const amountEl = document.getElementById('question-select');

    if (genreEl.value == 0 || amountEl.value == 0) {
      const modalView = document.getElementById("modalView");
      modalView.style.display = "flex";
      const closeBtn = document.getElementById("modalView__closeBtn");

      closeBtn.addEventListener("click", () => {
        modalView.style.display = "none";
      });
    }else {
      localStorage.setItem('genre',document.getElementById(genreEl.value).innerHTML);
      localStorage.setItem('id',genreEl.value);
      localStorage.setItem('amount',amountEl.value);

      window.location.href = "../trivia/Trivia.html";
    }
  })



// GSAP
document.getElementById('curtain').addEventListener('click',function () {
  tl = new TimelineMax();

  tl.fromTo('#left-curtain', { x: 0 }, { x: -1000, duration: 2 }, 0)
    .fromTo('#right-curtain', { x: 0 }, { x: 1000, duration: 2 }, 0)
    .fromTo('#curtain', { x: 0 }, { x: 8000, duration: 0.01 }, '<2');
},{ once: true });