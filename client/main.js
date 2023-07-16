const baseURL = "http://localhost:4000"

const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.querySelector("#fortuneButton")
const displayFortune = document.querySelector("#fortuneDisplay")


const goalForm = document.querySelector(".addGoal")
const goalInput = document.querySelector("#inputGoals")
const goalBtn = document.querySelector("#Submit")
const displaySection = document.querySelector("#displaySection")

const newGoal = document.querySelector("#new-goal")
const goalId = document.querySelector("#goalNum")
const newGoalForm = document.querySelector(".editGoal")



const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
        });
};

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortunes/")
        .then(res => {
            const fortune = res.data;
            displayFortune.innerHTML = `
            <p>${res.data}</p> 
            `
        })
        .catch(err => console.log(err))
}
const getGoals = () => {
    axios.get(`${baseURL}/api/goals`)
    .then(res =>{
        console.log(res.data)
    })
}
const addGoalHandler = (evt) => {
    evt.preventDefault()
    const body = {
        goal: goalInput.value
    }
    axios.post(`${baseURL}/api/goals`, body)
    .then(res => displayGoals(res.data))
    .catch(err => console.log(err))
    goalInput.value = '' 
}

const displayGoals = (goals) => {
    displaySection.innerHTML = ``
    goals.map((goal) => {
        const displayDiv = document.createElement("div")
        displayDiv.innerHTML = `
        <ul>
            <li style="display:inline">${goal.goalId}. ${goal.goal}</li>
            <button onclick="deleteGoal(${goal.goalId})" style="display:inline">Delete Goal</button>
        </ul>
        `
        displaySection.appendChild(displayDiv)
    })
}

const editGoal = (e) => {
    e.preventDefault();
  axios
    .put(
      `${baseURL}/api/goals/${goalId.value}?newGoal=${newGoal.value}`
    )
    .then((res) => displayGoals(res.data))
    .catch((err) => console.error(err));
    newGoal.value = ''
    goalId.value = ''
}
const deleteGoal = (id) => {
    axios
      .delete(`${baseURL}/api/goals/${id}`)
      .then((res) => displayGoals(res.data))
      .catch((err) => console.error(err));
  };

fortuneBtn.addEventListener('click', getFortune)
complimentBtn.addEventListener('click', getCompliment)
document.addEventListener("DOMContentLoaded", getGoals);
goalForm.addEventListener('submit', addGoalHandler)
newGoalForm.addEventListener('submit', editGoal)