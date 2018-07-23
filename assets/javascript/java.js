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

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        dest: trainDest,
        first: trainFirst,
        freq: trainFreq
    };

    // Uploads train data to the database
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

// Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainFirst = childSnapshot.val().first;
    var trainFreq = childSnapshot.val().freq;
  
    // Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainFirst);
    console.log(trainFreq);

    // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainFirst),
    $("<td>").text(trainFreq),
  );

  // Append the new row to the table
  $(".schedTable > tbody").append(newRow);
});