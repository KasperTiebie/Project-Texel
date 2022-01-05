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
function addToVideoTransmissionTable(origin, topic, video){
	videoTransmissionCount = Number(localStorage.getItem("videoTransmissionCount"));
	if(!videoTransmissionCount){
		localStorage.setItem("videoTransmissionCount", 1);
		videoTransmissionCount = 1;
	}
	var videoTransmissionTable = document.getElementById("videoTransmissionTable");
	var row = videoTransmissionTable.insertRow(0);
	var numberCell = row.insertCell(0);
	var dateCell = row.insertCell(1);
	var originCell = row.insertCell(2);
	var topicCell = row.insertCell(3);
	var videoCell = row.insertCell(4);
	
	numberCell.classList.add("align-middle");
	dateCell.classList.add("align-middle");
	originCell.classList.add("align-middle");
	topicCell.classList.add("align-middle");
	videoCell.classList.add("align-middle");

	numberCell.innerHTML = videoTransmissionCount;
	dateCell.innerHTML = new Date().toLocaleDateString() + " @ " + new Date().toLocaleTimeString();
	originCell.innerHTML = origin;
	topicCell.innerHTML = topic;
	videoCell.innerHTML = '<button type="button" class="btn btn-outline-theme" onclick="showVideoOverlay(\'' + video + '\', true, true)">Play</button>' // Add the play button

	var videoTransmissionContent = document.getElementById("videoTransmissionTable").innerHTML;
	
	// Update localStorage
	localStorage.setItem("videoTransmissionContent", videoTransmissionContent);
	localStorage.setItem("videoTransmissionCount", videoTransmissionCount+1); 
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
}

// ---------------SUPPLY CODE---------------
function logSupplyCode(){
	var supplyCode = document.getElementById("supplyCodeInput").value;
	
	// Do Stuff
	switch(supplyCode){
		case "RESE": // Resets the whole dashboard
			resetDashboard();
			location.reload();
			break;
		case "M3LY": 
			if(localStorage.getItem("M3LY") == "FALSE"){
				showTransmissionOverlay();
				$("#acceptTransmission").click(function(event){
					hideTransmissionOverlay();
					L.marker([53.14405640137026, 4.866172630500216]).addTo(map); 
					showVideoOverlay("M3LY.mp4", false, true);
					addToVideoTransmissionTable("Crossroads", "Supply Drops", "M3LY.mp4");
					$(this).off(event);
				});
			}
			localStorage.setItem("M3LY", "TRUE");
			break;
		case "K4SP":
			if(localStorage.getItem("K4SP") == "FALSE"){
				showTransmissionOverlay();
				$("#acceptTransmission").click(function(event){	
					hideTransmissionOverlay();
					L.marker([53.04075401349149, 4.848431553836208]).addTo(map);
					showVideoOverlay("K4SP.mp4", false, true);
					addToVideoTransmissionTable("Crossroads", "Drop-off", "K4SP.mp4");
					$(this).off(event);
				});
			}
			localStorage.setItem("K4SP", "TRUE");
			break;
	}

	// Clear Input
	document.getElementById("supplyCodeInput").value = null;
}

// ---------------DASHBOARD---------------
function resetDashboard(){
	localStorage.setItem("M3LY", "FALSE");
	localStorage.setItem("K4SP", "FALSE");
	localStorage.setItem("videoTransmissionCount", 1);
	localStorage.removeItem("videoTransmissionContent");
}

function updateDashboard(){
	// M3LY
	if(localStorage.getItem("M3LY") == "TRUE"){
		// Show Marker
		L.marker([53.14405640137026, 4.866172630500216]).addTo(map); 
	}
	if(localStorage.getItem("K4SP") == "TRUE"){
		L.marker([53.04075401349149, 4.848431553836208]).addTo(map);
	}

	// Load videot tranmission activity
	if(localStorage.getItem("videoTransmissionContent")){
		document.getElementById("videoTransmissionTable").innerHTML = localStorage.getItem("videoTransmissionContent");
	}
}

updateDashboard();


