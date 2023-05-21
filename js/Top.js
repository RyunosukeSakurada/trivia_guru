
const form = document.querySelector('#myForm')
//Event that is executed when the form is submitted.
form.addEventListener('submit', (e) => {
  e.PreventDefault(); //Cancel the default behavior (page reload)
  const selectedOption1 = option1.value; 
  const selectedOption2 = option2.value; 
  localStorage.setItem('selectedOption1', selectedOption1); //Save the key "selectedOption1" and value "selectedOption1" to the local storage.
  localStorage.setItem('selectedOption2',selectedOption2); //Save the key "selectedOption2" and value "selectedOption2" to the local storage.

  //replacing the current page with a new URL and redirecting to the new URL
  window.location.href = '../trivia/Trivia.html';
})


const startEl = document.querySelector('.start_btn')
//Event that is executed when the start_btn is clicked.
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
    //Save the name of the currently selected genre to the local storage
    localStorage.setItem('genre',document.getElementById(genreEl.value).innerHTML); 
    //Save the data with the key 'id' and the value equal to the value attribute of the genreEl element to the local storage
    localStorage.setItem('id',genreEl.value); 
    //Save the data with the key 'amount' and the value equal to the value attribute of the amountEl element to the local storage
    localStorage.setItem('amount',amountEl.value);
    //replacing the current page with a new URL and redirecting to the new URL
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