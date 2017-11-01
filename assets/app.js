// Initialize Firebase
var config = {
    apiKey: "AIzaSyCEfT_tVdunstfN_Ncet_zpq7iATk-PG6c",
    authDomain: "train-times-4e2a4.firebaseapp.com",
    databaseURL: "https://train-times-4e2a4.firebaseio.com",
    projectId: "train-times-4e2a4",
    storageBucket: "",
    messagingSenderId: "422239333823"
  };
  
  firebase.initializeApp(config);

var database = firebase.database();
var trains = "/Train-Times";

function saveTrain()
{

	$("#submit").on("click", function(e)
	{
		// stops the website from reloading and keeps forms active
		e.preventDefault();										
		var trainName = $("#trainNameId").val().trim();			
		var firstTrain = $("#firstTrainId").val().trim();
		var frequency = $("#frequencyId").val().trim();

		//pushing updated information to variables with key value pairs by reference
		database.ref(trains).push(						
		{
			trainName: trainName,
			destination: destination,
			firstTrain: firstTrain,
			frequency: frequency,
		});

		//clearing the field 
		$("#trainNameId").val("");							
		$("#destinationId").val("");									
		$("#firstTrainId").val("");							
		$("#frequencyId").val("");								 
	});

}



function loadTrain()
{
	database.ref(trains).on("child_added", function(snapshot)		 
	{							
		var tableRow = $("<tr>");

		var randomNumber = Math.floor(Math.random() * 255);

		tableRow.html(
			"<td>"+ snapshot.val().trainName +"</td>"+
			"<td>"+ snapshot.val().destination +"</td>"+
			"<td>"+ snapshot.val().firstTrain +"</td>"+
			"<td>"+ snapshot.val().frequency +"</td>"+
			"<td>"+ parseInt(snapshot.val().frequency) * randomNumber +"</td>");										 
		$("#tablebody").prepend(tableRow);									
	}, 
	function(err)
	{

		console.log("Error occured" + err);
	});
}

$(document).ready(function()
{
	$("#tablebody").empty();
	saveTrain();
	loadTrain();
	
});