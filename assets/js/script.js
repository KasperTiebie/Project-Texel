// ---------------MAP---------------
var map = L.map('map', {
	minZoom: 11,
	maxZoom: 15
}).setView([51.505, -0.09], 11);
L.tileLayer('assets/atlas/{z}/{x}/{y}.png').addTo(map);

var southWestBounds = L.latLng(52.97883529714314, 4.7016928777880045);
var northEastBounds = L.latLng(53.19242662175752, 4.9220329874584445);
var bounds = L.latLngBounds(southWestBounds, northEastBounds);

map.setMaxBounds(bounds)

map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: false });
});

// ---------------VIDEO TRANSMISSION---------------
function addToVideoTransmissionTable(origin, topic, video, hide){
	/*
		origin: The value to appear in the Origin column of the table
		topic: The value to appear in the Topic column of the table
		video: The name of the mp4 file available in /content/videos/
		hide: Boolean value to hide or display the table row (currently does nothing)
	*/
	
	videoTransmissionCount = Number(localStorage.getItem("videoTransmissionCount"));
	if(!videoTransmissionCount){
		localStorage.setItem("videoTransmissionCount", 1);
		videoTransmissionCount = 1;
	}
	
	// Creates the entry
	var videoTransmissionTable = document.getElementById("videoTransmissionTable");
	var row = videoTransmissionTable.insertRow(0);
	var numberCell = row.insertCell(0);
	var dateCell = row.insertCell(1);
	var originCell = row.insertCell(2);
	var topicCell = row.insertCell(3);
	var videoCell = row.insertCell(4);
	
	// Sets the classes for all columns
	numberCell.classList.add("align-middle");
	dateCell.classList.add("align-middle");
	originCell.classList.add("align-middle");
	topicCell.classList.add("align-middle");
	videoCell.classList.add("align-middle");

	// Sets the contents of the entry
	numberCell.innerHTML = videoTransmissionCount;
	dateCell.innerHTML = new Date().toLocaleDateString() + " @ " + new Date().toLocaleTimeString();
	originCell.innerHTML = origin;
	topicCell.innerHTML = topic;
	videoCell.innerHTML = '<button type="button" class="btn btn-outline-theme" onclick="showVideoOverlay(\'' + video + '\', true, true)">Play</button>' // Add the play button
	
	// Hides the entry
	if(hide){
		row.style.display = "none";
	}
	
	// Update localStorage
	var videoTransmissionContent = document.getElementById("videoTransmissionTable").innerHTML;
	
	localStorage.setItem("videoTransmissionContent", videoTransmissionContent);
	localStorage.setItem("videoTransmissionCount", videoTransmissionCount+1); 
	
	return row; // Return the row html element
}

function showVideoTransmissionEntry(entry){
	/*
		entry: The row of the table to make visible
	*/
	entry.style.display = "table-row";
}

// ---------------TRANSMISSION OVERLAY---------------
function showTransmissionOverlay(){
	$("#transmissionOverlay").modal({backdrop: "static", keyboard: false});
	$("#transmissionOverlay").modal("show");
}

function hideTransmissionOverlay(){
	$("#transmissionOverlay").modal("hide");
}

// ---------------VIDEO OVERLAY---------------
var videoPlayer = videojs("videoPlayer", {
			preload: "auto"
		});

function showVideoOverlay(video, controls, autoplay){
	$("#videoOverlay").modal({backdrop: "static", keyboard: false});
	$("#videoOverlay").modal("show"); // Show modal
	$("#videoOverlay").on("shown.bs.modal", function(){ // Configure the video player
		videoPlayer.controls(controls);
		videoPlayer.autoplay(autoplay);
		videoPlayer.width($("#videoWrapper").width());
		videoPlayer.height(($("#videoWrapper").width()/16)*9);

		videoPlayer.src({ // Set the source to the correct video
			src: "content/videos/" + video,
			type: "video/mp4"
		});
	});
}

function hideVideoOverlay(){
	$("#videoOverlay").modal("hide"); // Hide the modal
	videoPlayer.pause();
	
	// Trigger Event so the supply code event can be dequeued
	var event = new CustomEvent("videoOverlayHidden");
	document.dispatchEvent(event);
}

// ---------------SUPPLY CODE---------------
function logSupplyCode(){
	var supplyCodeInput = $("#supplyCodeInput").val();
	
	// RESET code, resets the whole dashboard
	if(supplyCodeInput == "RESE"){
		resetDashboard();
		location.reload();
		return 0;
	}
	
	for(supplyCode in supplyCodes){
		supplyCodeObject = supplyCodes[supplyCode];
		if(supplyCodeObject.code == supplyCodeInput){
			if(localStorage.getItem(supplyCodeObject.code) == "FALSE" || localStorage.getItem(supplyCodeObject.code) == null){ // If it already triggered or it doesn't exist yet
				videoTransmissionLogEntry = addToVideoTransmissionTable(
					supplyCodeObject.videoTransmission.origin, // Origin
					supplyCodeObject.videoTransmission.topic, // Topic
					supplyCodeObject.videoTransmission.video, // Video
					true); // Hide
				$("#queue").queue(function(){
					// Timeout
					setTimeout(function(currentSupplyCodeObject, currentVideoTransmissionLogEntry){ // Pass the supplyCodeObject and the tableEntry at the time of calling this function (so if these update, the function will execute with the old values)
						document.getElementById("incomingTransmissionAudio").play(); // Play audio
						showTransmissionOverlay();
						addToActivityLogTable("Incoming Transmission", true);
						// onAcceptTransmission
						$("#acceptTransmission").click(function(event){ // When the transmission is accepted
							document.getElementById("incomingTransmissionAudio").pause(); // Stop playing audio
							hideTransmissionOverlay();
							currentSupplyCodeObject.onAcceptTransmission();
							showVideoOverlay(currentSupplyCodeObject.videoTransmission.video, false, true);
							showVideoTransmissionEntry(currentVideoTransmissionLogEntry);
							$(this).off(event); // Deletes the event 
						});
					}, supplyCodeObject.videoTransmission.delay, supplyCodeObject, videoTransmissionLogEntry);
					
					// Dequeue
					var queueEntry = this;
					$(document).on("videoOverlayHidden", function(){
						console.log("dequeue" + supplyCodeObject.code);
						$(queueEntry).dequeue();
					});
				});
			}
			localStorage.setItem(supplyCodeObject.code, "TRUE");
			break; // Break out of the for loop
		} 
	}

	// Clear Input
	document.getElementById("supplyCodeInput").value = null;
}

// ---------------ACTIVITY LOG---------------
function addToActivityLogTable(activity, hide){
	/*
		activity: The type of activity to appear in the log
	*/
	
	// Creates the entry
	var activityLogTable = document.getElementById("activityLogTable");
	var row = activityLogTable.insertRow(0);
	var leftCell = row.insertCell(0);
	var logCell = row.insertCell(1);
	
	// Sets the classes for all columns
	leftCell.classList.add("align-middle");
	logCell.classList.add("align-middle");
	// Sets the contents of the entry
	leftCell.innerHTML = ">";
	logCell.innerHTML = activity + " @ " + new Date().toLocaleTimeString();
	
	// Update localStorage
	var activityLogContent = document.getElementById("activityLogTable").innerHTML;
	localStorage.setItem("activityLogContent", activityLogContent);
	
	return row; // Return the row html element
}

// ---------------DASHBOARD---------------
function resetDashboard(){
	for(supplyCode in supplyCodes){
		localStorage.setItem(supplyCodes[supplyCode].code, "FALSE");
	}
	//localStorage.setItem("M3LY", "FALSE");
	//localStorage.setItem("K4SP", "FALSE");
	localStorage.setItem("videoTransmissionCount", 1);
	localStorage.removeItem("videoTransmissionContent");
	localStorage.removeItem("activityLogContent");
}

function updateDashboard(){
	// Execute all onReload functions for all unlocked supply codes
	for(supplyCode in supplyCodes){
		supplyCodeObject = supplyCodes[supplyCode];
		if(localStorage.getItem(supplyCodeObject.code) == "TRUE"){
			// Execute all functions from the unlocked supply codes
			supplyCodeObject.onReload();
		}
	}

	// Load video tranmission activity
	if(localStorage.getItem("videoTransmissionContent")){
		document.getElementById("videoTransmissionTable").innerHTML = localStorage.getItem("videoTransmissionContent");
	}
	
	if(localStorage.getItem("activityLogContent")){
		document.getElementById("activityLogTable").innerHTML = localStorage.getItem("activityLogContent");
	}
	
	// Makes all video transmissions visible (if the delay didn't finish before reload)
	$("#videoTransmissionTable").find("tr").css("display", "table-row");
}

updateDashboard();


