const supplyCodes = {
	M3LY: {
		code: "M3LY",
		videoTransmission: {
			origin: "Crossroads",
			topic: "Supply Drops",
			video: "M3LY.mp4",
			hide: true,
			delay: 0
		},
		onAcceptTransmission: function(){
			L.marker([53.14405640137026, 4.866172630500216]).addTo(map);
			addToActivityLogTable("Marker Added", "#14fffb");
			startTimer(5);
		},
		onReload: function(){
			L.marker([53.14405640137026, 4.866172630500216]).addTo(map); 
		}
	},
	K4SP: {
		code: "K4SP",
		videoTransmission: {
			origin: "Crossroads",
			topic: "Drop-off",
			video: "K4SP.mp4",
			hide: true,
			delay: 5000
		},
		onAcceptTransmission: function(){
			L.marker([53.04075401349149, 4.848431553836208]).addTo(map);
			addToActivityLogTable("Marker Added", "#14fffb");
		},
		onReload: function(){
			L.marker([53.04075401349149, 4.848431553836208]).addTo(map);
		}
	}
}