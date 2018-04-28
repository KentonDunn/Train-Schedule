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

      // Console.loging the last user's data
      console.log(sv.name);
      console.log(sv.destination);
      console.log(sv.train);
      console.log(sv.freq);

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
          "EMPTY" +
          "</td>" +
          "<td>" +
          "EMPTY" +
          "</td>" +
          "</tr>"
      );

      // Change the HTML to reflect
      $("#name-display").text(sv.name);
      $("#email-display").text(sv.email);
      $("#age-display").text(sv.age);
      $("#comment-display").text(sv.comment);

      // Handle the errors
    },
    function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    }
  );
