var ctx = document.getElementById('game').getContext('2d');

setInterval(function () {
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;	
}, 50);
