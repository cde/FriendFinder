// Helper methods
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const getRandomIndex = (max) =>{
    return Math.floor(Math.random() * Math.floor(max));
}


let friendsList = require("../data/friends");

function apiRoutes(app){
    app.get("/api/friends", function(req,res){
        res.json(friendsList);
    })

    // Calculate the best match
    app.post("/api/friends", function(req, res) {
        let userData = req.body;
        let userDataScores = userData.scores;

        let friendsDiff = friendsList.map(function(friend){
            // Compare the difference between current user's scores against those from other users, question by question
            let diffScores = []
            for(let i=0; i < friend["scores"].length; i++){
                diffScores.push(Math.abs(friend["scores"][i] - userDataScores[i]));
            }
            // console.log(`${friend["name"]} diff scores`, diffScores)

            // Get the total diff & store it with user's data
            let totalDiff = diffScores.reduce(reducer);
            return { name: friend["name"], photo: friend["photo"], diff: totalDiff }

        })

        // Find the closest match (Min diff) by:
        // 1) Sorting
        // friendsDiff.sort(function (a, b) {
        //     return a.diff - b.diff;
        // })
        // let diff = friendsDiff[0].diff

        // 2) or Find Min()
        let diff = Math.min(...friendsDiff.map(friend => { return friend["diff"] }));

        const bestMatches = friendsDiff.filter(friend => {
            return friend["diff"] === diff
        });
        // If we get more than one matches, return one randomly
        let bestMatch = {}
        if(bestMatches.length > 1) {
            let index = getRandomIndex(bestMatches.length)
            bestMatch = bestMatches[index]
            console.log(`${bestMatches[index]} diff scores`, index)
        }

        if(bestMatches.length == 1){
            bestMatch = bestMatches[0]
        }
        res.json(bestMatch);
    });
}

module.exports =  apiRoutes;