var games = ["World of Warcraft", "League of Legends", "Maplestory", "Counterstrike GO", "Diablo 3", "Uncharted", "Fortnite"];

function gifButtons() {
    $("#gifButtonContain").empty();
    for (var i = 0; i < games.length; i++) {
        // create jQuery button object var button = $("<button>");
        // add data-game attribute
        // Add text to the button
        // append this button to #gifButtonContain
        var button = $("<button>");
        button.addClass("game");
        button.attr("data-game", games[i]);
        button.text(games[i]);
        $("#gifButtonContain").append(button);
    }
};

function newButton() {
    $("#addGame").on("click", function () {
        event.preventDefault();
        var game = $("#gameInput").val().trim();
        if (game == "") {
            return false;
        }
        games.push(game);

        gifButtons();
        return false;
    });
}

$(document).ready(function () {
    $(document).on("click", ".button", function () {
        console.log("hello");
        var games = $(this).attr("data-game");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + games + "&api_key=mLBbgDZopvSPGQ3u9oTGV2OAVaNDzi9X&limit=5";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                $("#gifImages").empty();
                var results = response.data;
                if (results == "") {
                    alert("There is no gif for this button!");
                }

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");
                    gifDiv.addClass("gifDiv");
                    var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    gifDiv.append(gifRating);
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height.url)
                    gifDiv.append(gifImage);
                    $("#gifImages").prepend(gifDiv);
                }
            });

    });
    newButton();
});