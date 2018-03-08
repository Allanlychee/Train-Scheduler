// Initialize Firebase
var config = {
    apiKey: "AIzaSyCJ-ReRnQoo-srdudik-rfey-HSrqLXK3U",
    authDomain: "whatever-first.firebaseapp.com",
    databaseURL: "https://whatever-first.firebaseio.com",
    projectId: "whatever-first",
    storageBucket: "whatever-first.appspot.com",
    messagingSenderId: "110419074122"
}

firebase.initializeApp(config)

var database = firebase.database()
var users = database.ref('/users')

$('#submitBTN').on('click', function () {
    event.preventDefault()
    var trainname = $('#name').val().trim()
    var destination = $('#location').val().trim()
    var firsttraintime = moment($("#time").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $('#frequencymin').val().trim()

    users.push({
        Name: trainname,
        Destination: destination,
        First_Train: firsttraintime,
        Frequency: frequency
    })

    $("#name").val("");
    $("#location").val("");
    $("#time").val("");
    $("#frequencymin").val("");

    return false;
})

users.on('child_added', function (snap) {
    var train2 = snap.val().Name
    var destination2 = snap.val().Destination
    var frequency2 = snap.val().Frequency
    var firsttraintime2 = snap.val().First_Train
    console.log(snap.val())

    //Variables calculating time using moment
    var timedifference = moment().diff(moment.unix(firsttraintime2), "minutes")
    var timeremaining = moment().diff(moment.unix(firsttraintime2), "minutes") % frequency2
    var minutes = frequency2 - timeremaining
    var timearrival = moment().add(minutes, "m").format("hh:mm A")
    // Appends the train data to the tbody
    $("tbody").append("<tr><td>" + train2 + "</td><td>" + destination2 + "</td><td>" + frequency2 + "</td><td>" + timearrival + "</td><td>" + minutes + "</td></tr>")
})


