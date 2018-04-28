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
    howoften: frequency
  };

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.train);
  console.log(newTrain.howoften);
});
