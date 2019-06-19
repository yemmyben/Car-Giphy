//alert('Hello World!!!');

// create a string of array
var carTypes = [
    'Ferrari',
    'Jaguar',
    'Porsche',
    'Lamborghini',
    'Mercedes Benz',
    'Audi',
    'BMW',
    'Ford',
    'Nissan',
    'Infinity',
    'Toyota',
    'VolksWagen',
    'Mazda',
    'Buick',
    'Kia',
    'Cadillac',
    'Subaru',
    'Lexus',
    'Jeep'
];
// displayMovieInfo function re-renders the HTML to display the appropriate content.
function displayCarInfo() {
    var carType = $(this).attr('data-name');
    var API = 'rlCRlxh1yGpVDQCt3VfIFB0xN5XhE4hZ&q';
    var limit = '10';
    var baseQueryURL = 'https://api.giphy.com/v1/gifs/search?';
    var queryURL = baseQueryURL + 'api_key=' + API + '&q=' + carType + '&limit=' + limit;
    
    // Creating an AJAX call for the specific car button being clicked
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        console.log(response);
        // Loop through the array of response data
        var array = response.data
        for (var i = 0; i < array.length; i++){
        // Creating a div to hold the car gif
        gifDiv = $('<div>');
        // Storing the result item's rating
        var rating = array[i].rating;
        // Creating a paragraph tag with the result item's rating
        var p = $('<p>').text('Rating: ' + rating);
        // Create an car image tag
        var carImage = $('<img>');
        // Give the car image tag an source attribute
        carImage.attr("src", array[i].images.fixed_height.url);
        carImage.attr("data-still", carImage[0].dataset.still);
        carImage.attr("data-animate", carImage[0].dataset.animate);
        carImage.attr("data-state", carImage[0].dataset.state);
        carImage.addClass("gif");
        // Appending the paragraph and carImage we created to the "gifDiv" div we created
        gifDiv.append(p);
        gifDiv.append(carImage);
        $('#cars-view').prepend(gifDiv);
        console.log(carImage);
        // var b = carImage[0].dataset.animate;
        // console.log(b);
        };
        
    });
};

// function for displaying movie button/data
function renderButtons() {

    // Clearing or Deleting the car-button before a new search.
    $('#buttons-View').empty();

    // Looping through the array of cars
    for (var i = 0; i < carTypes.length; i++) {

        // Dynamically generating buttons from the list of cars array.
        var buttons = $('<button>');

        // Add a class of car-btn to our button
        buttons.addClass('car-btn');

        // Add a data-attribute
        buttons.attr('data-name', carTypes[i]);

        // Provide the initial button text.
        buttons.text(carTypes[i]);

        // Add the button to the buttons-view div
        $('#buttons-view').append(buttons);
    }
}

// This function handles events where a movie button is clicked
$('#add-car').on('click', function(e) {
    e.preventDefault();

    // This line grabs the input from the textbox
    var carType = $('#car-input').val().trim();

    // Check to see if movie name is already in the array list of carTypes to avoid duplicate buttons, then push.
    if (!carTypes.includes(carType)){
        carTypes.push(carType);
    }
    $("#buttons-view").empty();
    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

    // Adding a click event listener to all elements with a class of "gif"
    $('.gif').on('click', function(){
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
    });

    // Adding a click event listener to all elements with a class of "movie-btn"
    $(document).on("click", '.car-btn', displayCarInfo);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();