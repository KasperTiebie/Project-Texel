const supplyCodes = {
	F39A: {
		code: "F39A",
		transmissions: [
			{
				videoTransmission: {
					origin: "Tactical Operations Center",
					topic: "Supply Drops",
					video: "SupplyDrops.mp4",
					attachment: "NA",
					hide: true,
					delay: 15*60
				},
				onAcceptTransmission: function(){
					addMarkerToMap([53.015226, 4.855309], greenIcon, "<b>Scout</b>");
					addMarkerToMap([53.114264, 4.744286], greenIcon, "<b>Scout</b>");
					addMarkerToMap([53.1788787406346, 4.930993167785756], greenIcon, "<b>Scout</b>");
				},
				onReload: function(){
					addMarkerToMap([53.015226, 4.855309], greenIcon, "<b>Scout</b>");
					addMarkerToMap([53.114264, 4.744286], greenIcon, "<b>Scout</b>");
					addMarkerToMap([53.1788787406346, 4.930993167785756], greenIcon, "<b>Scout</b>");
				}
			}
		]
	},
	T3ST: {
		code: "T3ST",
		transmissions: [
			{
				videoTransmission: {
					origin: "Tactical Operations Center",
					topic: "Ammunition Supply Drop",
					video: "AmmunitionSupplyDrop.mp4",
					attachment: "NA",
					hide: true,
					delay: 3*60
				},
				onAcceptTransmission: function(){
					addMarkerToMap([53.05245699100554, 4.797505457771741], blueIcon, "<b>Ammunition Supply Drop</b>");
				},
				onReload: function(){
					addMarkerToMap([53.05245699100554, 4.797505457771741], blueIcon, "<b>Ammunition Supply Drop</b>");
				}
			}
		]
	},
	B13R: {
		code: "B13R",
		transmissions: [
			{
				videoTransmission: {
					origin: "Tactical Operations Center",
					topic: "Unindentified Supply Drop",
					video: "ChurchSupplyDrop.mp4",
					attachment: "B13R",
					hide: true,
					delay: 30
				},
				onAcceptTransmission: function(){
					addCircleMarkerToMap([53.05476082256381, 4.797687276289789], "#003699", "#3d82ff", 50, "<b>Unindentified Supply Drop</b>");
					
					// Add waterttappunten
					addMarkerToMap([53.05245699100554, 4.797505457771741], violetIcon, "<b>Ammunition Supply</b>");
					addMarkerToMap([53.05627331250515, 4.795413664779803], violetIcon, "<b>Ammunition Supply</b>");
					addMarkerToMap([53.02571478278126, 4.75242266759393], violetIcon, "<b>Ammunition Supply</b>");
					addMarkerToMap([53.03932337382831, 4.847900501095836], violetIcon, "<b>Ammunition Supply</b>");
					addMarkerToMap([53.08337640424232, 4.873097938452518], violetIcon, "<b>Ammunition Supply</b>");
					addMarkerToMap([53.09720711318503, 4.763076325653161], violetIcon, "<b>Ammunition Supply</b>");
					addMarkerToMap([53.15493508885086, 4.8697287841022785], violetIcon, "<b>Ammunition Supply</b>");
					// Add toilets
					addMarkerToMap([53.15235503420102, 4.857947000591838], orangeIcon, "<b>Ammunition Disposal</b>"); // Restaurant de Krim
					addMarkerToMap([53.18214899025133, 4.8554132683386895], orangeIcon, "<b>Ammunition Disposal</b>"); // Vuurtoren
					addMarkerToMap([53.13105451959565, 4.817369108382502], orangeIcon, "<b>Ammunition Disposal</b>"); // De slufter
					addMarkerToMap([53.07804073592612, 4.745333880353264], orangeIcon, "<b>Ammunition Disposal</b>"); // Ecomare
					addMarkerToMap([53.098908351275114, 4.762245328403482], orangeIcon, "<b>Ammunition Disposal</b>"); // Bakker Timmer De Koog
					addMarkerToMap([53.09301814751957, 4.800194623020735], orangeIcon, "<b>Ammunition Disposal</b>"); // Natuurcentrum De Marel
					addMarkerToMap([53.07243156990766, 4.821472729620282], orangeIcon, "<b>Ammunition Disposal</b>"); // Museum Waelstee
					addMarkerToMap([53.062187182675366, 4.762340237092304], orangeIcon, "<b>Ammunition Disposal</b>"); // Paviljoen Dennenoord
					addMarkerToMap([53.05528956557736, 4.796606626580284], orangeIcon, "<b>Ammunition Disposal</b>"); // Bakker Timmer Den Burg
					addMarkerToMap([53.049618921888964, 4.794296443682745], orangeIcon, "<b>Ammunition Disposal</b>"); // VVV Den Burg
					addMarkerToMap([53.00409207838223, 4.77976645518029], orangeIcon, "<b>Ammunition Disposal</b>"); // Wachtruimte boot
					addMarkerToMap([53.02578434053111, 4.752701752013805], orangeIcon, "<b>Ammunition Disposal</b>"); // Spar 
					addMarkerToMap([53.02117760814275, 4.711012616130409], orangeIcon, "<b>Ammunition Disposal</b>"); // Paal 9
					addMarkerToMap([53.08345152118032, 4.874349501155055], orangeIcon, "<b>Ammunition Disposal</b>"); // Strends end
					addMarkerToMap([53.11491625651405, 4.897153669373646], orangeIcon, "<b>Ammunition Disposal</b>"); // Prins Hendrik Hotel
					addMarkerToMap([53.045027379764434, 4.8328957976897104], orangeIcon, "<b>Ammunition Disposal</b>"); // Zelfpluktuin
					addMarkerToMap([53.04047714886999, 4.850119920419602], orangeIcon, "<b>Ammunition Disposal</b>"); // Toilet Oudeschild
				},
				onReload: function(){
					addCircleMarkerToMap([53.05476082256381, 4.797687276289789], "#003699", "#3d82ff", 50, "<b>Unindentified Supply Drop</b>");
					
					// Add waterttappunten
					addMarkerToMap([53.05245699100554, 4.797505457771741], violetIcon, "<b>Ammunition Supply</b>");
					addMarkerToMap([53.05627331250515, 4.795413664779803], violetIcon, "<b>Ammunition Supply</b>");
					addMarkerToMap([53.02571478278126, 4.75242266759393], violetIcon, "<b>Ammunition Supply</b>");
					addMarkerToMap([53.03932337382831, 4.847900501095836], violetIcon, "<b>Ammunition Supply</b>");
					addMarkerToMap([53.08337640424232, 4.873097938452518], violetIcon, "<b>Ammunition Supply</b>");
					addMarkerToMap([53.09720711318503, 4.763076325653161], violetIcon, "<b>Ammunition Supply</b>");
					addMarkerToMap([53.15493508885086, 4.8697287841022785], violetIcon, "<b>Ammunition Supply</b>");
					// Add toilets
					addMarkerToMap([53.15235503420102, 4.857947000591838], orangeIcon, "<b>Ammunition Disposal</b>"); // Restaurant de Krim
					addMarkerToMap([53.18214899025133, 4.8554132683386895], orangeIcon, "<b>Ammunition Disposal</b>"); // Vuurtoren
					addMarkerToMap([53.13105451959565, 4.817369108382502], orangeIcon, "<b>Ammunition Disposal</b>"); // De slufter
					addMarkerToMap([53.07804073592612, 4.745333880353264], orangeIcon, "<b>Ammunition Disposal</b>"); // Ecomare
					addMarkerToMap([53.098908351275114, 4.762245328403482], orangeIcon, "<b>Ammunition Disposal</b>"); // Bakker Timmer De Koog
					addMarkerToMap([53.09301814751957, 4.800194623020735], orangeIcon, "<b>Ammunition Disposal</b>"); // Natuurcentrum De Marel
					addMarkerToMap([53.07243156990766, 4.821472729620282], orangeIcon, "<b>Ammunition Disposal</b>"); // Museum Waelstee
					addMarkerToMap([53.062187182675366, 4.762340237092304], orangeIcon, "<b>Ammunition Disposal</b>"); // Paviljoen Dennenoord
					addMarkerToMap([53.05528956557736, 4.796606626580284], orangeIcon, "<b>Ammunition Disposal</b>"); // Bakker Timmer Den Burg
					addMarkerToMap([53.049618921888964, 4.794296443682745], orangeIcon, "<b>Ammunition Disposal</b>"); // VVV Den Burg
					addMarkerToMap([53.00409207838223, 4.77976645518029], orangeIcon, "<b>Ammunition Disposal</b>"); // Wachtruimte boot
					addMarkerToMap([53.02578434053111, 4.752701752013805], orangeIcon, "<b>Ammunition Disposal</b>"); // Spar 
					addMarkerToMap([53.02117760814275, 4.711012616130409], orangeIcon, "<b>Ammunition Disposal</b>"); // Paal 9
					addMarkerToMap([53.08345152118032, 4.874349501155055], orangeIcon, "<b>Ammunition Disposal</b>"); // Strends end
					addMarkerToMap([53.11491625651405, 4.897153669373646], orangeIcon, "<b>Ammunition Disposal</b>"); // Prins Hendrik Hotel
					addMarkerToMap([53.045027379764434, 4.8328957976897104], orangeIcon, "<b>Ammunition Disposal</b>"); // Zelfpluktuin
					addMarkerToMap([53.04047714886999, 4.850119920419602], orangeIcon, "<b>Ammunition Disposal</b>"); // Toilet Oudeschild
				}
			}
		]
	},
	FL45: {
		code: "FL45",
		transmissions: [
			{
				videoTransmission: {
					origin: "Tactical Operations Center",
					topic: "Suburb Supply Drop",
					video: "CommunicationsSupplyDrop.mp4",
					attachment: "NA",
					hide: true,
					delay: 3*60
				},
				onAcceptTransmission: function(){
					//addMarkerToMap([53.05762150697172, 4.807130466986392], blueIcon, "<b>Suburb Supply Drop</b>");
				},
				onReload: function(){
					//addMarkerToMap([53.05762150697172, 4.807130466986392], blueIcon, "<b>Suburb Supply Drop</b>");
				}
			}
		]
	},
	P5TR: {
		code: "P5TR",
		transmissions: [
			{
				videoTransmission: {
					origin: "Tactical Operations Center",
					topic: "Extract",
					video: "OudeschildExtract.mp4",
					attachment: "NA",
					hide: true,
					delay: 30
				},
				onAcceptTransmission: function(){
					addMarkerToMap([53.04027149070527, 4.851168826499641], blueIcon, "<b>Extract Location</b>");
				},
				onReload: function(){
					addMarkerToMap([53.04027149070527, 4.851168826499641], blueIcon, "<b>Extract Location</b>");
				}
			},
			{
				videoTransmission: {
					origin: "Tactical Operations Center",
					topic: "Food Forest",
					video: "FoodForest.mp4",
					attachment: "NA",
					hide: true,
					delay: 20*60
				},
				onAcceptTransmission: function(){
					addMarkerToMap([53.04530950631288, 4.834459150417895], blueIcon, "<b>Food Forest</b>");
				},
				onReload: function(){
					addMarkerToMap([53.04530950631288, 4.834459150417895], blueIcon, "<b>Food Forest</b>");
				}
			}
		]
	},
	B5S3: {
		code: "B5S3",
		transmissions: [
			{
				videoTransmission: {
					origin: "Tactical Operations Center",
					topic: "Supply Drop",
					video: "SmitSupplyDrop.mp4",
					attachment: "B5S3",
					hide: true,
					delay: 5*60
				},
				onAcceptTransmission: function(){
					addCircleMarkerToMap([53.049454757824904, 4.847184054407211], "#003699", "#3d82ff", 100, "<b>Unindentified Supply Drop</b>");
				},
				onReload: function(){
					addCircleMarkerToMap([53.049454757824904, 4.847184054407211], "#003699", "#3d82ff", 100, "<b>Unindentified Supply Drop</b>");
				}
			}
		]
	},
	Y1R4: {
		code: "Y1R4",
		transmissions: [
			{
				videoTransmission: {
					origin: "Tactical Operations Center",
					topic: "Transport",
					video: "Transport.mp4",
					attachment: "NA",
					hide: true,
					delay: 1*60
				},
				onAcceptTransmission: function(){
					// None
				},
				onReload: function(){
					// None
				}
			}
		]
	},
	T43A: {
		code: "T43A",
		transmissions: [
			{
				videoTransmission: {
					origin: "Tactical Operations Center",
					topic: "Area Search",
					video: "AreaSearch.mp4",
					attachment: "NA",
					hide: true,
					delay: 5 * 60
				},
				onAcceptTransmission: function(){
					addCircleMarkerToMap([53.15139248016523, 4.863245709794486], "#003699", "#3d82ff", 200, "<b>Unindentified Supply Drop</b>");
				},
				onReload: function(){
					addCircleMarkerToMap([53.15139248016523, 4.863245709794486], "#003699", "#3d82ff", 200, "<b>Unindentified Supply Drop</b>");
				}
			}
		]
	},
	L9A3: {
		code: "L9A3",
		transmissions: [
			{
				videoTransmission: {
					origin: "Tactical Operations Center",
					topic: "Hostages",
					video: "Hostages.mp4",
					attachment: "NA",
					hide: true,
					delay: 1 * 60
				},
				onAcceptTransmission: function(){
					startTimer(3600);
					// None
				},
				onReload: function(){
					// None
				}
			}
		]
	}			
}