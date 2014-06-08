/**
 * 
 */
/*
 * 参考サイト http://nackpan.net/blog/2013/09/02/createjs-drag-and-drop/
 */
(function(window) {

	var cj = createjs;
	var canvas, stage;

	window.addEventListener('load', function() {
		window.removeEventListener('load', arguments.callee);

		init();
	}, false);

	// /////
	function init() {
		canvas = document.getElementById("myCanvas");
		stage = new cj.Stage('myCanvas');
		var shape;

		stage.mouseMoveOutside = true;
		cj.Touch.enable(stage);

		var colors = [ "DarkBlue", "DarkOrange", "DarkRed", "DarkCyan",
				"DarkMagenta", "DarkGreen", "DarkSalmon", "DarkSeaGreen",
				"DarkKhaki", "DarkGray" ];

		// create shapes:
		for (var i = 0; i < 10; i++) {
			shape = new cj.Shape();
			switch (i % 3) {
			case 0:
				shape.graphics.beginFill(colors[i]).drawCircle(0, 0, 50);
				break;
			case 1:
				shape.graphics.beginFill(colors[i]).drawRect(0, 0, 80, 80);
				break;
			case 2:
				shape.graphics.beginFill(colors[i]).drawPolyStar(0, 0, 50, 5,
						0.3);
				break;
			default:
				break;
			}

			stage.addChild(shape);
			shape.x = canvas.width * Math.random() | 0;
			shape.y = canvas.height * Math.random() | 0;
			shape.scaleX = shape.scaleY = shape.scale = Math.random() * 0.4 + 0.6;
			shape.rotation = 360 * Math.random() | 0;
			shape.alpha = 0.9;
			shape.name = "shp_" + i;

			shape.addEventListener("mousedown", function(evt) {
				var offset = {
					x : evt.target.x - evt.stageX,
					y : evt.target.y - evt.stageY
				};

				evt.addEventListener("mousemove", function(ev) {
					ev.target.x = ev.stageX + offset.x;
					ev.target.y = ev.stageY + offset.y;

					stage.update();
				});
			});
		}

		stage.update();
	}

}(window));