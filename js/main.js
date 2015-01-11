var ctx = document.getElementById('game').getContext('2d');

// Key state
var left = false,
	right = false;

$('body').keydown(function (e) {
	if (e.which == 37) {
		left = true;
	} else if (e.which == 39) {
		right = true;
	}
}).keyup(function (e) {
	if (e.which == 37) {
		left = false;
	} else if (e.which == 39) {
		right = false;
	}
});

// Game state
var boxes = [],
	stackHeight = 0,
	stacked = [],
	w = 800,
	h = 600,
	playerX = 0,
	slide = 0.3,
	gravity = 3;

function Box() {
	this.x = 0;
	this.y = 100;
	this.width = 50;
	this.height = 25;
	this.color = 'gray';
}

setInterval(function () {
	var b = new Box();
	b.x = Math.random() * 300 - 150;
	b.y = h + b.height;
	b.color = 'gray';
	boxes.push(b);
}, 2000);

function tick() {
	var oldPlayerX = playerX;
	if (left) {
		playerX -= 5;
	}
	if (right) {
		playerX += 5;
	}

	for (var i = 0; i < boxes.length; i++) {
		var box = boxes[i];

		box.y -= gravity;

		if (Math.abs(box.y - stackHeight) < 5) {
			if ((stacked.length > 0 && Math.abs(box.x - stacked[stacked.length - 1].x) < box.width) || (stacked.length == 0 && Math.abs(box.x - playerX) < box.width)) {
				if (stacked.length > 0)
					box.y = stacked[stacked.length - 1].y + box.height;

				// move from boxes to stacked
				stacked.push(boxes.splice(i, 1)[0]);
				stackHeight += box.height;
				i--;
			}
		}

		if (box.y < -100) {
			boxes.splice(i, 1);
			i--;
		}
	}

	for (var i = 0; i < stacked.length; i++) {
		var box = stacked[i];
		var base = i === 0 ? playerX : stacked[i - 1].x;
		box.x += (base - box.x) * slide;
		grounded = true;
	}
}

setInterval(function () {
	tick();

	// rendering
	w = ctx.canvas.width  = window.innerWidth;
	h = ctx.canvas.height = window.innerHeight;
	ctx.clearRect(0, 0, w, h);

	// draw player
	ctx.fillStyle = 'red';
	ctx.fillRect(w/2 + playerX - 25, h - 120, 50, 100);

	// draw boxes
	for (var i = 0; i < boxes.length; i++) {
		var box = boxes[i];
		ctx.fillStyle = box.color;

		ctx.fillRect(w/2 + box.x - box.width/2, h - box.y - box.height - 120, box.width, box.height - 1);
	}

	// draw stacked
	for (var i = 0; i < stacked.length; i++) {
		var box = stacked[i];
		ctx.fillStyle = box.color;
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'red';
		ctx.bor
		ctx.fillRect(w/2 + box.x - box.width/2, h - box.y - box.height - 120, box.width, box.height - 1);
	}
}, 20);
