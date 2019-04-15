// ==============================================================================
// DEPENDENCIES AND DATA
// ==============================================================================

var friendsArray = require("../data/friends")
var path = require("path");


// ==============================================================================
// FUNCTIONS
// ==============================================================================

module.exports = function (app) {

    // returns raw json of friendsArray
    app.get("/api/friends", function (req, res) {
        res.json(friendsArray);
    });


    // determined a best match and returns it, then pushes the new friend object to the array.
    app.post("/api/friends",  function (req, res) {
        // find the best friend match
        var newFriend = req.body;
        // pass off to findFriend function, returns best friend object
        var bestFriend = findFriend(newFriend);
        // add the new friend to the array
        friendsArray.push(newFriend);
        // return the best friend match
        return res.json(bestFriend)
    });

}

function findFriend(newFriend) {
    // create empty array for friend score differences
    var friendsDifferences = [];
    for (var i = 0; i < friendsArray.length; i++) {
        var newScores = newFriend.scores;
        var friendScores = friendsArray[i].scores;
        var totalDifference = 0;

        // sum the difference between the corresponding scores for each value in the arrays
        for (var j = 0; j < newScores.length; j++) {
            totalDifference += Math.abs(newScores[j] - friendScores[j]);
        }

        // push that difference to friendsDifferences array
        friendsDifferences.push(totalDifference);
    }

    // now find the index of the smallest value in the array ... this the index of the "bestFriend"    
    var smallestDiff = Math.min(...friendsDifferences);
    var bestIndex = friendsDifferences.indexOf(smallestDiff)
    return friendsArray[bestIndex];
}