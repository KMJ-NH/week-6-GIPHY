//Here is an array of topics to be used for the initial buttons that will be displayed.
      var topics = ["Barbie", "Elmo", "Spinning Top"];

      var newButtons = function () {

        //This clears out the <div> which will contain the buttons for the toys.
        $("#toyButtons").empty();

        //This loop creates a new button for each string in the topics array.
        for (i = 0; i < topics.length; i++) {
          var newBtn = $("<button>");
          newBtn.addClass("newToy");
          newBtn.attr("data-toy", topics[i]);
          newBtn.text(topics[i]);
          $("#toyButtons").append(newBtn);
        }
      };

      //This calls the newButtons function.
      newButtons();

      $("#addToy").on("click", function (event) {

        event.preventDefault();
        //This line grabs the input from the user.
        var userSelection = $("#toy-input").val().trim();
        //Then a toy from the input is added to the array.
        topics.push(userSelection);

        //This calls the newButtons function.
        newButtons();
      });

      $(document).on("click", ".newToy", function () {

        //This empties the <div> with the toys id.
        $("#toys").empty();

        //var searchToy;
        var searchToy = $(this).attr("data-toy");

        // This creates a queryURL that includes the toy name in the API call.
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          searchToy + "&api_key=dc6zaTOxFJmzC&limit=10";

        // This is the AJAX request using the queryURL.
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          // Here is the 'promise' of the requested response.
          .done(function (response) {

            console.log(queryURL);


            // The results variable stores the response data.
            var results = response.data;
            console.log(results);

            // This loops through the data in the results array.
            for (var i = 0; i < results.length; i++) {

              // This dynamically creates a div container where data is stored.
              var toysDiv = $("<div>");

              // This selects a specific property (from the results data) for the image, and assigns attributes.
              var toyImage = $("<img>");
              toyImage.addClass("toyPic");
              toyImage.attr("src", results[i].images.fixed_height_still.url);
              toyImage.attr("data-still", results[i].images.fixed_height_still.url);
              toyImage.attr("data-animate", results[i].images.fixed_height.url);

              // The rating from the results is stored in this paragraph tag.
              var p = $("<p>").text("Rating: " + results[i].rating);

              // The paragraph and images tags are appended to the toysDiv here.
              toysDiv.append(p);
              toysDiv.append(toyImage);

              // This "prepends" the toysDiv to the HTML page in the "#toys" div.
              $("#toys").prepend(toysDiv);

            }
          });

        //This is supposed to switch the displayed gif images from still to animate, or animate to still, with every click on the image.  
        $(document.body).on('click', ".toyPic", function () {
          var state = $(this).attr("data-state");
          if (state == "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          }
          else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });

      });
