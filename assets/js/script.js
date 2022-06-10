// ---------------TIME AND TIMER---------------
var lineChart;
$(document).ready(function(){
	var COLOR_THEME = getComputedStyle(document.body).getPropertyValue("--bs-theme");
	var COLOR_WHITE = getComputedStyle(document.body).getPropertyValue("--bs-white");

	setInterval(function(){
		$("#currentTime").html(new Date().toLocaleTimeString("nl-NL"));
		timerStart = localStorage.getItem("timerStart");
		if(timerStart == "TRUE"){
			currentTime = localStorage.getItem("currentTime");
			if(currentTime < 0){
				$("#timerText").css("color", "red");
				$("#timerText").html(new Date(Math.abs(currentTime) * 1000).toISOString().substr(11, 8));
			}else{
				$("#timerText").html(new Date(currentTime * 1000).toISOString().substr(11, 8));
			}
			localStorage.setItem("currentTime", currentTime - 1);
		}
	}, 1000);
	
	signalStrengthData = [12, 19, 11, 13, 9, 10, 15, 12, 15, 14, 19, 20, 12, 19, 11, 13, 9, 10, 15, 12, 15, 14, 19, 20];
	
	// Add signalStrengthChart
	var signalStrengthChart = document.getElementById('signalStrengthChart');
	signalStrengthChart = new Chart(signalStrengthChart, {
	type: 'line',
	data: {
	  labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
	  datasets: [{
		color: COLOR_THEME,
		backgroundColor: hexToRgba(COLOR_THEME, .2),
		borderColor: COLOR_THEME,
		borderWidth: 4,
		pointBackgroundColor: COLOR_WHITE,
		pointBorderWidth: 1.5,
		pointRadius: 4,
		data: signalStrengthData,
		fill: "origin"
	  }]
	},
	options: {
		plugins: {
			legend: {
				display: false
			},
			tooltips: {
				enabled: false
			},
			title: {
				display: true,
				text: "Signal Strength"
			}
        },
		scales: {
			x: {
				grid: {
					display: false
				},
				ticks: {
				  callback: () => ('') // Empty labels
				}
			},
			y: {
				min: 0,
				max: 21,
				grid: {
					display: false
				},
				ticks: {
				  callback: () => ('') // Empty labels
				}
			}
		}
	}
	});
	
	setInterval(function(){
		// Update lineChart data
		signalStrengthChart.data.datasets.forEach((dataset) => {
			dataset.data.shift();
			signalStrengthChart.update();
			dataset.data.push(Math.ceil(Math.random() * 10 + 10));
			signalStrengthChart.update("none");
		});
	}, 1000);
	
	// Add incomingDataChart
	
	incomingDataChartData = [12, 19, 11, 13, 9, 10, 15, 12, 15, 14, 19, 20, 12, 19, 11, 13, 9, 10, 15, 12, 15, 14, 19, 20];
	
	var incomingDataChart = document.getElementById('incomingDataChart');
	incomingDataChart = new Chart(incomingDataChart, {
	type: 'line',
	data: {
	  labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
	  datasets: [{
		color: COLOR_THEME,
		backgroundColor: hexToRgba(COLOR_THEME, .2),
		borderColor: COLOR_THEME,
		borderWidth: 4,
		pointBackgroundColor: COLOR_WHITE,
		pointBorderWidth: 1.5,
		pointRadius: 4,
		data: incomingDataChartData,
		fill: "origin"
	  }]
	},
	options: {
		plugins: {
			legend: {
				display: false
			},
			tooltips: {
				enabled: false
			},
			title: {
				display: true,
				text: "Incoming Data"
			}
        },
		scales: {
			x: {
				grid: {
					display: false
				},
				ticks: {
				  callback: () => ('') // Empty labels
				}
			},
			y: {
				min: 0,
				max: 21,
				grid: {
					display: false
				},
				ticks: {
				  callback: () => ('') // Empty labels
				}
			}
		}
	}
	});
	
	setInterval(function(){
		// Update lineChart data
		incomingDataChart.data.datasets.forEach((dataset) => {
			dataset.data.shift();
			incomingDataChart.update();
			dataset.data.push(Math.ceil(Math.random() * 10 + 10));
			incomingDataChart.update("none");
		});
	}, 1000);
});

function startTimer(seconds){
	timerStart = localStorage.getItem("timerStart");
	if(timerStart == "FALSE"){
		localStorage.setItem("currentTime", seconds);
		localStorage.setItem("timerStart", "TRUE");
	}
}

// ---------------MAP---------------
var map = L.map('map', {
	minZoom: 11,
	maxZoom: 16,
	attributionControl: false
}).setView([51.505, -0.09], 11);
L.tileLayer('assets/atlas/{z}/{x}/{y}.png').addTo(map);

var largeMap = L.map('largeMap', {
	minZoom: 11,
	maxZoom: 16,
	attributionControl: false
}).setView([51.505, -0.09], 11);
L.tileLayer('assets/atlas/{z}/{x}/{y}.png').addTo(largeMap);

var southWestBounds = L.latLng(52.97883529714314, 4.7016928777880045);
var northEastBounds = L.latLng(53.19242662175752, 4.9220329874584445);
var bounds = L.latLngBounds(southWestBounds, northEastBounds);

map.setMaxBounds(bounds)
largeMap.setMaxBounds(bounds);

map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: false });
});

largeMap.on('drag', function() {
    largeMap.panInsideBounds(bounds, { animate: false });
});

function showMapOverlay(){
	$("#mapOverlay").modal({backdrop: "static", keyboard: false});
	$("#mapOverlay").modal("show");
	setTimeout(function(){
		largeMap.invalidateSize();
	}, 300);
}

function hideMapOverlay(){
	$("#mapOverlay").modal("hide");
}

function addMarkerToMap(coordinates, icon, text){
	if(icon == null){
		icon = blueIcon;
	}
	
	L.marker(coordinates, {icon: icon}).addTo(map).bindPopup(text);
	L.marker(coordinates, {icon: icon}).addTo(largeMap).bindPopup(text);

	addToActivityLogTable("Marker Added", "#14fffb");
}

function addCircleMarkerToMap(coordinates, color, fillColor, radius, text){
	L.circle(coordinates, {color: color, fillColor: fillColor, fillOpacity: 0.5, radius: radius}).addTo(map).bindPopup(text);
	L.circle(coordinates, {color: color, fillColor: fillColor, fillOpacity: 0.5, radius: radius}).addTo(largeMap).bindPopup(text);
	
	addToActivityLogTable("Area Marked", "#fce94f");
}

// ---------------VIDEO TRANSMISSION---------------
function addToVideoTransmissionTable(origin, topic, video, attachment, hide){
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
	var attachmentCell = row.insertCell(5);
	
	// Sets the classes for all columns
	numberCell.classList.add("align-middle");
	dateCell.classList.add("align-middle");
	originCell.classList.add("align-middle");
	topicCell.classList.add("align-middle");
	videoCell.classList.add("align-middle");
	attachmentCell.classList.add("align-middle");

	// Sets the contents of the entry
	numberCell.innerHTML = videoTransmissionCount;
	dateCell.innerHTML = new Date().toLocaleDateString() + " @ " + new Date().toLocaleTimeString();
	originCell.innerHTML = origin;
	topicCell.innerHTML = topic;
	videoCell.innerHTML = '<button type="button" class="btn btn-outline-theme" onclick="showVideoOverlay(\'' + video + '\', true, true)">Play</button>'; // Add the play button
	//attachmentCell.innerHTML = '<button type="button", class"btn btn-outline-theme", onclick="showAttachmentOverlay()"><i class="fas fa-file-alt"></i></button>';
	if(attachment != "NA"){
		attachmentCell.innerHTML = '<a href="#", onclick="showAttachmentOverlay(\'' + attachment + '\')"><i class="fas fa-2x fa-file-alt"></i></a>';
	}
	
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
	$("#videoOverlay").on("shown.bs.modal", function(event){ // Configure the video player
		videoPlayer.controls(controls);
		videoPlayer.width($("#videoWrapper").width());
		videoPlayer.height(($("#videoWrapper").width()/16)*9);

		videoPlayer.src({ // Set the source to the correct video
			src: "content/videos/" + video,
			type: "video/mp4"
		});
		
		// Workaround for the autplay function of video.js as not all browsers support autoplay
		if(autoplay){
			// TODO: Delete the event after the call
			videoPlayer.one("loadeddata", function(event){
				$("#videoPlayer video").get(0).play();
			});
		}
		
		$(this).off(event); // Deletes the event 
	});
}

function hideVideoOverlay(){
	$("#videoPlayer video").get(0).pause();
	$("#videoOverlay").modal("hide"); // Hide the modal
	//videoPlayer.pause();
	
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
				supplyCodeObject.transmissions.forEach(function(transmission){
					videoTransmissionLogEntry = addToVideoTransmissionTable(
						transmission.videoTransmission.origin, // Origin
						transmission.videoTransmission.topic, // Topic
						transmission.videoTransmission.video, // Video
						transmission.videoTransmission.attachment, // Attachment
						true); // Hide
	
					$("#queue").queue(function(){
						// Timeout
						setTimeout(function(currentTransmission, currentVideoTransmissionLogEntry){ // Pass the supplyCodeObject and the tableEntry at the time of calling this function (so if these update, the function will execute with the old values)
							$("#incomingTransmissionAudio")[0].play(); // Play audio
							showTransmissionOverlay();
							addToActivityLogTable("Incoming Transmission", "#39ff14");
							// onAcceptTransmission
							$("#acceptTransmission").click(function(event){ // When the transmission is accepted
								document.getElementById("incomingTransmissionAudio").pause(); // Stop playing audio
								hideTransmissionOverlay();
								currentTransmission.onAcceptTransmission();
								showVideoOverlay(currentTransmission.videoTransmission.video, false, true);
								showVideoTransmissionEntry(currentVideoTransmissionLogEntry);
								$(this).off(event); // Deletes the event 
							});
						}, transmission.videoTransmission.delay*1000, transmission, videoTransmissionLogEntry);
						
						// Dequeue
						var queueEntry = this;
						$(document).on("videoOverlayHidden", function(){
							$(queueEntry).dequeue();
						});
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
function addToActivityLogTable(activity, color){
	/*
		activity: The type of activity to appear in the log
		color: The text color (green: #39ff14, blue: #14fffb)
	*/
	
	// Creates the entry
	var activityLogTable = document.getElementById("activityLogTable");
	var row = activityLogTable.insertRow(0);
	var leftCell = row.insertCell(0);
	var logCell = row.insertCell(1);
	
	// Sets the classes and colors for all columns
	leftCell.classList.add("align-middle");
	leftCell.style.color = color;
	logCell.classList.add("align-middle");
	logCell.style.color = color;
	// Sets the contents of the entry
	leftCell.innerHTML = ">";
	logCell.innerHTML = activity + " @ " + new Date().toLocaleTimeString();
	
	// Update localStorage
	var activityLogContent = document.getElementById("activityLogTable").innerHTML;
	localStorage.setItem("activityLogContent", activityLogContent);
	
	return row; // Return the row html element
}

// ---------------ATTACHMENT OVERLAY---------------
function showAttachmentOverlay(attachment){
	switch(attachment){
		case "B13R": $("#B13ROverlay").modal("show"); break;
		case "B5S3": $("#B5S3Overlay").modal("show"); break;
	}
};

// ---------------DASHBOARD---------------
function resetDashboard(){
	for(supplyCode in supplyCodes){
		localStorage.setItem(supplyCodes[supplyCode].code, "FALSE");
	}
	
	localStorage.setItem("videoTransmissionCount", 1);
	localStorage.setItem("timerStart", "FALSE");
	localStorage.removeItem("currentTime", 0);
	localStorage.removeItem("videoTransmissionContent");
	localStorage.removeItem("activityLogContent");
}

function updateDashboard(){
	// Execute all onReload functions for all unlocked supply codes
	for(supplyCode in supplyCodes){
		supplyCodeObject = supplyCodes[supplyCode];
		if(localStorage.getItem(supplyCodeObject.code) == "TRUE"){
			// Execute all functions from the unlocked supply codes
			supplyCodeObject.transmissions.forEach(function(transmission){
				transmission.onReload();
			});
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


