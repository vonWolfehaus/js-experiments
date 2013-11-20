(function() {
var Circle = function(settings) {
	this.radius = settings.radius;
	this.x = 0;
	this.y = 0;
	var arcLength = settings.arcDeg * 0.0174532925,
		thickness = settings.thickness || 5,
		speed = settings.speed * 0.01,
		rotation = 0,
		arcOffset = settings.offsetArcDeg * 0.0174532925,
		direction = settings.direction === 'left' ? -1 : 1,
		color = settings.color,
		tau = Math.PI * 2;
	
	this.draw = function(ctx) {
		rotation += speed * direction;
		if (rotation > tau) rotation -= tau;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, rotation+arcOffset, rotation+arcLength+arcOffset, false);
		ctx.lineWidth = thickness;
		ctx.strokeStyle = color;
		ctx.stroke();
	};
};
var Spinarang = function(x, y, circleSettings, parentElement) {
	var size = 0;
	var circles = [];
	var ctx, can = document.createElement('canvas');
	function update() {
		var i, c;
		ctx.clearRect(0, 0, size, size);
		for (i = 0; i < circles.length; i++) {
			c = circles[i];
			c.draw(ctx);
		}
		
		window.webkitRequestAnimationFrame(update);
	}
	function init() {
		var i, c, top = 'top', left = 'left',
			biggest = 0;
		
		for (i = 0; i < circleSettings.length; i++) {
			c = new Circle(circleSettings[i]);
			if (c.radius > biggest) biggest = c.radius;
			circles.push(c);
		}
		size = biggest * 3;
		can.width = size;
		can.height = size;
		ctx = can.getContext('2d');
		
		if (x < 0) {
			x = Math.abs(x);
			left = 'right';
		}
		if (y < 0) {
			y = Math.abs(y);
			top = 'bottom';
		}
		can.style.cssText = 'position:absolute; '+top+':'+y+'px; '+left+':'+x+'px';
		if (!!parentElement) parentElement.appendChild(can);
		else document.body.appendChild(can);
		for (i = 0; i < circles.length; i++) {
			c = circles[i];
			c.x = size / 2;
			c.y = size / 2;
		}
		update();
	}
	init();
};
window.Spinarang = Spinarang;
}());