console.log("linked");

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBFszqqUfF92rL5b33O7ly-aCW4V-SctNM",
  authDomain: "week-7-9ee67.firebaseapp.com",
  databaseURL: "https://week-7-9ee67.firebaseio.com",
  projectId: "week-7-9ee67",
  storageBucket: "week-7-9ee67.appspot.com",
  messagingSenderId: "748801859402"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#addTrain").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#trainName")
    .val()
    .trim();
  var dest = $("#destination")
    .val()
    .trim();
  var firstTrain = $("#firstTrain")
    .val()
    .trim();
  var frequency = $("#frequency")
    .val()
    .trim();

  var newTrain = {
    name: trainName,
    destination: dest,
    train: firstTrain,
    freq: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  };

  //information being pushed to firebase.  Naming convention feels sloppy.
  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.train);
  console.log(newTrain.freq);
  console.log(newTrain.dateAdded);
});

//Activity 18-Push and Activity 20- Moment JS
/* I'll need these to finish the coding */

// Firebase watcher + initial loader + order/limit HINT: .on("child_added"
database
  .ref()
  .orderByChild("dateAdded")
  .limitToLast(1)
  .on(
    "child_added",
    function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();

      // Console.logging the last train entered
      console.log("Train Name: " + sv.name);
      console.log("Destination:" + sv.destination);
      console.log("First Train:" + sv.train);
      console.log("Frequency:" + sv.freq + " minutes");

      //going back 1 year to make sure the first train has arrived prior
      //to the current time

      var yearAgoTrain = moment(sv.train, "HH:mm").subtract(1, "years");
      console.log(yearAgoTrain);

      //setting up the current time for future calculation
      var currentTime = moment();
      console.log("Current time: " + moment(currentTime).format("HH:mm"));

      //time difference between first train running and current time in minutes
      //this will be a very large number, but the computer can calculate quickly

      var timeDifference = moment().diff(moment(yearAgoTrain), "minutes");
      console.log("Difference in Time Since First Train: " + timeDifference);

      //calculate the remainder modulo to calculate when the next train will arrive
      var timeRemainder = timeDifference % sv.freq;
      console.log("HEY" + timeRemainder);

      //calculate minutes until the next train
      var minutesTillNextTrain = sv.freq - timeRemainder;
      console.log(
        "Minutes Until Next Train: " + minutesTillNextTrain + "minutes"
      );

      //update the arrival time

      var arrivalTime = moment().add(minutesTillNextTrain, "minutes");
      console.log("Arrival time: " + moment(arrivalTime).format("HH:mm"));

      var arrival = moment(arrivalTime).format("HH:mm");

      $("#newSchedule").append(
        "<tr>" +
          "<td>" +
          sv.name +
          "</td>" +
          "<td>" +
          sv.destination +
          "</td>" +
          "<td>" +
          sv.freq +
          "</td>" +
          "<td>" +
          arrival +
          "</td>" +
          "<td>" +
          minutesTillNextTrain +
          "</td>" +
          "</tr>"
      );

      // Handle the errors
    },
    function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    }
  );
