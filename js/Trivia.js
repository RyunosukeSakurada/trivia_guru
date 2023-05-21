let score = 0
const answerData = []

//Automatically call the showData() function after the page is loaded.
window.addEventListener('DOMContentLoaded', showData)

//Fetch API 
async function fetchQuizData(id, amount) {
  const options = {
    method: 'GET',
    url: `https://opentdb.com/api.php?amount=${amount}&category=${id}&type=multiple`,
  }
  return await axios
    .request(options)
    .then(async function (response) {
      const { results } = await response.data
      return results
    })
    .catch(function (error) {
      console.error(error)
    })
}

function getQuestions(trivia) {
  //Used later to store the question and answer choices.
  let questions = []
  let answers = []
  //Get information for each question. Iterate through all keys of the object trivia in order.
  for (const key in trivia) {
    //Check whether an object has a key.
    if (Object.hasOwnProperty.call(trivia, key)) {
      //Get the value corresponding to the key from the trivia object, and store it in a variable named element.
      const element = trivia[key]
      questions.push(element.question) //Adds the question of the current trivia element to the questions array.
      answers.push(element.correct_answer) //Adds the correct answer of the current trivia element to the answers array.
      let all_answers = element.incorrect_answers //Access the incorrect_answers property of the retrieved element.
      all_answers.push(element.correct_answer) 
      answers.push(all_answers) 
    }
  }

  return [questions, answers]
}


async function showData(e) {
  //Get the name of the genre stored in the localStorage.
  const category = localStorage.getItem('genre')
  //Get the id of the genre stored in the localStorage.
  const id = localStorage.getItem('id')
  //Get the amount of the question stored in the localStorage.
  const amount = localStorage.getItem('amount')

  //Pass the id & amount to fetchQuizData() = trivia
  let trivia = await fetchQuizData(id, amount)
  let [questions, answers] = getQuestions(trivia)

  showQuestions(questions, answers, id, category, amount)
}




function showQuestions(questions, answers, id, category, amount) {
  let actual_question = 0
  let isCorrect = false

  // First question setup.
  document.getElementById('category-title').innerHTML = category + ' Trivia '
  updateData(questions, answers, actual_question)

  // Button event listeners for prev and next functionality.
  next_btn = document.getElementById('next-btn')
  prev_btn = document.getElementById('previous-btn')

  //Event that is executed when the next_btn is clicked.
  next_btn.addEventListener('click', function () {
    let hasAnswered = checkAnswer(answers[2 * actual_question], isCorrect)
    if (hasAnswered && score <= Number(amount)) {
      actual_question < questions.length - 1
        ? (actual_question += 1)
        : (window.location.href = '../score/Score.html')

      updateData(questions, answers, actual_question)
    } else {
      console.log('Answer!')
    }
  })
  
  //Event that is executed when the prev_btn is clicked.
  prev_btn.addEventListener('click', function () {
    actual_question > 0 ? (actual_question -= 1) : (actual_question = 0)
    updateData(questions, answers, actual_question)
    checkAnswerData(answerData)
  })
}



/* Updates question and answers html elements text */
function updateData(questions, answers, actual_question) {
  document.getElementById('remaining-question').innerHTML = `(${actual_question + 1} of ${questions.length})`
  document.getElementById('question').innerHTML = questions[actual_question]

  const correct_answer = answers[2 * actual_question]

  let all_answers = answers[2 * actual_question + 1]
  all_answers = randomShuffle(all_answers)
  document.getElementById('answer1').innerHTML = all_answers[0]
  document.getElementById('answer2').innerHTML = all_answers[1]
  document.getElementById('answer3').innerHTML = all_answers[2]
  document.getElementById('answer4').innerHTML = all_answers[3]

  document.getElementById('answer1').previousElementSibling.value = all_answers[0]
  document.getElementById('answer2').previousElementSibling.value = all_answers[1]
  document.getElementById('answer3').previousElementSibling.value = all_answers[2]
  document.getElementById('answer4').previousElementSibling.value = all_answers[3]

  console.log({
    correct_answer,
  })
}

function checkAnswer(correct_answer, isCorrect){
  let user_answer
  let checked = false
  document.querySelectorAll('.radio input').forEach(function (answer) {
    if (answer.checked) {
      user_answer = htmlDecode(answer.value)
      countUpScore(htmlDecode(correct_answer), user_answer, isCorrect)
      answer.checked = false
      checked = true
    }
  })
  return checked
}

//count up the score
function countUpScore(correct_answer, user_answer, isCorrect) {
  if (correct_answer === user_answer) {
    score += 1
    isCorrect = true
  }
  answerData.push(isCorrect)
  localStorage.setItem('score', score)
}


function checkAnswerData(answerData) {
  const prevAnswer = answerData.pop()
  if (prevAnswer && score >= 0) {
    score -= 1
    localStorage.setItem('score', score)
  }
  console.log(score)
}


// decode escape sequences
function htmlDecode(input) {
  let doc = new DOMParser().parseFromString(input, 'text/html')
  return doc.documentElement.textContent
}

function randomShuffle(array) {
  let currentIndex = array.length,randomIndex

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }
  return array
}
