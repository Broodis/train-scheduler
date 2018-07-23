var config = {
    apiKey: "AIzaSyBpHyFRP0DIB88xt5DsM8vkDBtRboxnMho",
    authDomain: "train-scheduler-71295.firebaseapp.com",
    databaseURL: "https://train-scheduler-71295.firebaseio.com",
    projectId: "train-scheduler-71295",
    storageBucket: "",
    messagingSenderId: "741669256476"
  };

firebase.initializeApp(config);

var database = firebase.database();

$("#addTrainButton").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#tName").val().trim();
    var trainDest = $("#tDest").val().trim();
    var trainFirst = moment($("#tFirst").val().trim(), "HH:mm:ss").format("HH:mm:ss");
    var trainFreq = $("#tFreq").val().trim();

    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        dest: trainDest,
        first: trainFirst,
        freq: trainFreq
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.first);
    console.log(newTrain.freq);

    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#tName").val("");
    $("#tDest").val("");
    $("#tFirst").val("");
    $("#tFreq").val("");
});