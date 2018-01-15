var config = {
    apiKey: "AIzaSyAz82qRbDYIyY_npwarNZ7XplrkmhzO3GQ",
    authDomain: "train-schedule-78e65.firebaseapp.com",
    databaseURL: "https://train-schedule-78e65.firebaseio.com",
    projectId: "train-schedule-78e65",
    storageBucket: "train-schedule-78e65.appspot.com",
    messagingSenderId: "706014035994"
};
firebase.initializeApp(config);

var database = firebase.database();

function emptyForm() {
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
};

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrainTime = $("#first-train-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        first: firstTrainTime,
        frequency: trainFrequency
    };

    console.log(newTrain);
    database.ref().push(newTrain);
    emptyForm();
});

database.ref().on("child_added", function(childSnapshot, prevChildKey){

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().first;
    var trainFrequency = childSnapshot.val().frequency;

    var adjustFirst = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    console.log(adjustFirst);
    var timeDifference = moment().diff(moment(adjustFirst), "minutes");
    var timeRemaining = timeDifference % trainFrequency;
    var minutesAway = trainFrequency - timeRemaining;
    var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm");

    $("#train-table > tbody").append("<tr class='hover'><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td>" //<td>" + "<button class='danger hidden-xs'>Edit</button><button class='danger hidden-xs'>Delete</button>" 
    + "</tr>");

});

// $(document).ready(function () {
//     $(document).on('mouseenter', '.hover', function () {
//         $(this).find(":button").show();
//     }).on('mouseleave', '.hover', function () {
//         $(this).find(":button").hide();
//     });
// });