const rounds = [
  {
    questions: [
      "Round 1 - Bank Loans",
      "What is a loan?",
      "What is a bank loan?",
      "What is a loan term?",
      "What is an advantage of bank loans?",
      "What are the disadvantages of bank loans?",
      "How can bank loans be helpful?",
      "What do you call the fee a bank charges for lending money?",
      "What type of bank loan allows you to consolidate debt?"
    ],
    moneyChain: ["15,000","$6,000", "$3,000", "$1,500", "$800", "$400", "$200", "$100","$0"]
  },
  {
    questions: [
      "Round 2 - Credit and Debit Cards",
      "What is the key difference between a credit and a debit card?",
      "What is a credit score?",
      "Can you build a credit score on a debit card?",
      "Do credit cards offer any rewards?",
      "What is overdrafting a debit card?",
      "Is it safer to use a credit or debit card online?",
      "What happens if you don't pay off your credit card in full?"
    ],
    moneyChain: ["$30,000","$15,000", "$8,000", "$4,000", "$2,000", "$1,000", "$500", "$250","$0"]
  },
  {
    questions: [
      "Round 3 - Mortgages",
      "What is a mortgage?",
      "What does it mean to amortise a loan?",
      "What do you call the amount you pay upfront upon buying property?",
      "How many major types of mortgages are there?",
      "What are the six types of mortgages?",
      "When is a private mortgage insurance bought?",
      "Which type of mortgage is designed for low/moderate-income buyers?",
      "What would happen if you consistently miss mortgage payments?"
    ],
    moneyChain: ["$60,000","$30,000", "$15,000", "$8,000", "$4,000", "$2,000", "$1,000", "$500", "$0"]
  },
  {
    questions: [
      "Round 4 - Short Tern Loans",
      "What is a short term loan?",
      "What is an example of a short term loan?",
      "What is an overdraft?",
      "What are lines of credit?",
      "What is 'buy now pay later', and does it come with interests?",
      "What is a payday loan?",
      "What is an advantage of short term loans?",
      "What is a disadvantage of short term loans?",
      "What is a common reason someone may borrow a short term loan?"
    ],
    moneyChain: ["$120,000","$60,000", "$30,000", "$15,000", "$8,000", "$4,000", "$2,000", "$1,000","$0"]
  },{
    questions: [
      "Round 5 - Short Term Loans",
      "What is a car loan?",
      "What is a typical amount of time for a car loan will be paid off?",
      "What is the length of time allowed to pay back a car loan proportional to the amount of interest?",
      "Can anyone with a credit score get a car loan?",
      "Will a company finance expensive, luxury cars?",
      "What is the other type of car loan apart from secured car loan?",
      "What is the difference between secure and unsecure car loaners?",
      "Which has lower interest, secure or unsecure car loans?",
      "Who gives out car loans?"
    ],
    moneyChain: ["$250,000","$120,000", "$60,000", "$30,000", "$15,000", "$8,000", "$4,000", "$2,000","$0"]
  },{
    questions: [
      ""
    ],
    moneyChain: ["$250,000","$120,000", "$60,000", "$30,000", "$15,000", "$8,000", "$4,000", "$2,000","$0"]}
];

let currentRound = 0; // Start at the first round
let currentQuestionIndex = 0;
let moneyIndex = rounds[currentRound].moneyChain.length - 1; // Start from the end of the money chain
let bankedTotal = 0;
let roundEarnings = 0;
let x = 0; // Variable to track total earnings across rounds

const questionElement = document.getElementById('question');
const feedbackElement = document.getElementById('feedback');
const moneyListElement = document.getElementById('money-list');
const bankedAmountElement = document.getElementById('banked-amount');
const nextRoundBtn = document.getElementById('next-round-btn');
const liveWalletElement = document.getElementById('live-wallet'); // Display for x
const soundEffectC = document.getElementById("soundEffectC");
const soundEffectI = document.getElementById("soundEffectI");
// Display the first question of the current round
function showQuestion() {
  const round = rounds[currentRound];
  if (currentQuestionIndex < round.questions.length) {
    questionElement.innerText = round.questions[currentQuestionIndex];
  } else {
    nextRoundBtn.style.visibility = 'visible'; // Show Next Round button
  }
}

// Show feedback for correct/incorrect answers
function showFeedback(isCorrect) {
  feedbackElement.innerText = isCorrect ? 'Correct!' : 'Incorrect!';
  feedbackElement.style.color = isCorrect ? 'green' : 'red';
  if (isCorrect){
    soundEffectC.play()
  }
  else{
    soundEffectI.play()
  }
  feedbackElement.style.visibility = 'visible';
  setTimeout(() => {
    feedbackElement.style.visibility = 'hidden';
  }, 2000); // Hide feedback after 2 seconds
}

// Update the money chain display
function updateMoneyChain() {
  const round = rounds[currentRound];
  const moneyItems = moneyListElement.querySelectorAll('li');
  moneyItems.forEach((item, index) => {
    item.style.background = index === moneyIndex ? 'linear-gradient(to bottom, #e14f4f, #820c0c)' : 'linear-gradient(to bottom, #6f8baa, #2c4768)';
    item.innerText = round.moneyChain[index];
  });
}

// Reset the money chain for the current round
function resetMoneyChain() {
  moneyIndex = rounds[currentRound].moneyChain.length - 1;
  updateMoneyChain();
}

// Handle question answers
function answerQuestion(isCorrect) {
  showFeedback(isCorrect); // Show feedback first
  updateMoneyChain(); 

  setTimeout(() => {
    if (isCorrect && moneyIndex >= 0) {
      const moneyValue = parseInt(rounds[currentRound].moneyChain[moneyIndex].replace(/[$,]/g, ''));
      roundEarnings = moneyValue;

      // Move to the next question
      currentQuestionIndex++; 

      // Decrease money index and update the money chain only after answering
      moneyIndex--; 

      showQuestion();
    } else {
      roundEarnings = 0; // No earnings if incorrect
      resetMoneyChain(); // Reset chain on incorrect answer
      currentQuestionIndex++; // Move to the next question even if the answer is wrong
      showQuestion();
      skip();
    }
  }); // Delay the money chain movement until after the feedback is shown (2 seconds)
}

// Bank the money
function bankMoney() {
  if (roundEarnings > 0) {
    bankedTotal += roundEarnings;
    roundEarnings = 0;
    resetMoneyChain();
    bankedAmountElement.innerText = `Bank: $${bankedTotal.toLocaleString()}`;
  }
  skip();
}

// Handle next round functionality
function nextRound() {
  currentRound++;
  if (currentRound < rounds.length) {
    currentQuestionIndex = 0;

    resetMoneyChain();
    x += bankedTotal;
    liveWalletElement.innerText = `Total Earned: $${x.toLocaleString()}`; // Update live wallet display
    bankedTotal = 0;
    bankedAmountElement.innerText = `Bank: $${bankedTotal.toLocaleString()}`;
    showQuestion();
    nextRoundBtn.style.visibility = 'hidden';
  } else {
    resetGame(); // Reset or end the game after all rounds
  }
}

function skip() {
  const moneyValue = parseInt(rounds[currentRound].moneyChain[moneyIndex].replace(/[$,]/g, ''));
  roundEarnings = moneyValue;

  // Move to the next question
  currentQuestionIndex++;
  // Decrease money index and update the money chain only after answering
  moneyIndex--; 
  showQuestion()
}

// Initialize the quiz

showQuestion();
updateMoneyChain();

// Keyboard controls
document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'y') {
    answerQuestion(true);
  } else if (event.key.toLowerCase() === 'n') {
    answerQuestion(false);
  }
    else if (event.key.toLowerCase() === 's') {
      skip();
    }
    else if (event.key.toLowerCase() === 'b') {
      bankMoney();
  }
});

// Event listener for "Next Round" button
nextRoundBtn.addEventListener('click', nextRound);
