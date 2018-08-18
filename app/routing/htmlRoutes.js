module.exports = function(app){
    // displays the home page.
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "home.html"));
    });

    // display the survey page
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "survey.html"));
    });
}

