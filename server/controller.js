const db = [];


let goalId = 1
module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        const fortunes = ["A golden egg of opportunity falls into your lap this month.", "A hunch is creativity trying to tell you something.", "A new outlook brightens your image and brings new friends.", "A smile is your personal welcome mat.", "A short pencil is usually better than a long memory any day.", "Adventure can be real happiness."]
        //getting random index of the length of the fortunes array then setting the random fortune equal to a variable
        let randomIdx = Math.floor(Math.random() * fortunes.length)
        let randomFortune = fortunes[randomIdx]
        //sending random fortune to front end
        res.status(200).send(randomFortune)
    },
    getGoals: (req, res) => {
        res.status(200).send(db)
    },

    addGoal: (req, res) => {
        const {goal} = req.body;
        const newObj = {
            goalId,
            goal
        };
        db.push(newObj);
        res.status(200).send(db);
        goalId++;
    },

    editGoal: (req, res) => {
        const {id} = req.params;
        const {newGoal} = req.query
        const goalIndex = db.findIndex((goal) => goal.goalId === +id)
        if (goalIndex === -1){
            res.status(400).send("can't find goal with that id")
            return
        }
        db[goalIndex].goal = newGoal
        res.status(200).send(db)
    },

    deleteGoal: (req, res) => {
        const {id} = req.params;
        const goalIndex = db.findIndex((goal) => goal.goalId === +id);
        db.splice(goalIndex, 1)
        res.status(200).send(db)
    }
}