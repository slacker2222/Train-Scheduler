$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBnctMOHsHYcK4HHQfGHtjJhyJWZO4njgM",
        authDomain: "train-scheduler-f.firebaseapp.com",
        databaseURL: "https://train-scheduler-f.firebaseio.com",
        projectId: "train-scheduler-f",
        storageBucket: "train-scheduler-f.appspot.com",
        messagingSenderId: 260438088518
    };
    firebase.initializeApp(config);

    // create a variable to reference the database
    var database = firebase.database();




    // callback to keep values updated when data changes ; update page in real time??????
    database.ref().on("value", function(snapshot) {

    // Would I need this?????
    console.log(snapshot.val());
    
    });
    // Capture button Click
    $("#addTrain").on("click", function (event) {
        event.preventDefault();


        // get values from Text
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#firstTrain").val().trim();
        var freq = $("#interval").val().trim();

        // code for the Push
        // database.ref().set({
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: freq
        // })
      });

   
    });


    // similar to on value: 
    database.ref().on("child_added", function (childsnapshot) {
        var newTrain = childSnapshot.val().trainName;
        var newLocation = childSnapshot.val(), destination;
        var newFirstTrain = childSnapshot.val().firstTrain;
        var newFreq = childSnapshot.val().frequency;

        // first yr is pushed back 1 year to be sure ti comes back to current time
        var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");

        // current time
        var currentTime = moment();

        // time difference
        var diffTime = moment().diff(moment(startTimeConverted, "minutes"));

        // Time apart (remainder)
        var tRemainder = diffTime % newFreq;

        // Minutes Until Next Train:
        var tMinutesTillTrain = newFreq - tRemainder;

        // Next Train:
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var catchTrain = moment(nextTrain).format("HH.mm");

        // Display on the page
        $("#all-display").append(
            '<tr><td>' + newTrain +
            '<td><td>' + newLocation +
            '<td><td>' + newFreq +
            '<td><td>' + catchTrain +
            '<td><td>' + tMinutesTillTrain + ' </td></tr>');
    
           // Clear input fields
    $("#trainName, #destination, #firstTrain, #interval").val("");
            return false;

    

        // log any errors to console log

    
    },  function (errorObject) {
            console.log("The read failed: " + errorObject.code);

        });
   
   
   
    });
;