supplyCodes = {
	K4SP: {
		code: "M4LY",
		videoTransmission: {
			origin: "Crossroads",
			topic: "Supply Drops",
			video: "M4LY.mp4",
			hide: true,
			delay: 2000
		},
		onAcceptTransmission: function(){
			L.marker([53.14405640137026, 4.866172630500216]).addTo(map); 
		},
		onReload: function(){
			L.marker([53.14405640137026, 4.866172630500216]).addTo(map); 
		}
	},
	M4LY: {
		code: "K4SP",
		videoTransmission: {
			origin: "Crossroads",
			topic: "Drop-off",
			video: "K4SP.mp4",
			hide: true,
			delay: 3000
		},
		onAcceptTransmission: function(){
			L.marker([53.04075401349149, 4.848431553836208]).addTo(map);
		},
		onReload: function(){
			L.marker([53.04075401349149, 4.848431553836208]).addTo(map);
		}
	}
}