const canvas = document.getElementById("canvas-1");
const ctx = canvas.getContext("2d");

let particles = [];
let initial_count = 50;
let min_speed = 1, max_speed = 10;
let min_size = 5, max_size = 50;

let animationRequest = null;

function random(min, max) {
	return Math.floor(Math.random() * (max - min) + 1) + min;
}

class Particle {
	constructor(x, y, velX, velY, size, color) {
		this.x = x;
		this.y = y;
		this.velX = velX;
		this.velY = velY;
		this.size = size;
		this.color = color;
	}

	draw() {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}

	move() {
		let dx = this.velX + this.x;
		let dy = this.velY + this.y;
		if ((dx - this.size) <= 0 || (dx + this.size) >= canvas.width) {
			this.velX = -this.velX;
		}
		if ((dy - this.size) <= 0 || (dy + this.size) >= canvas.height) {
			this.velY = -this.velY;
		}
		this.x += this.velX;
		this.y += this.velY;
	}
}

function init() {
	if (animationRequest) {
		cancelAnimationFrame(animationRequest);
	}

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	particles = [];

	for (let i = 0; i < initial_count; i++) {
		particles.push(new Particle(
			random(max_size, canvas.width - max_size),
			random(max_size, canvas.height - max_size),
			random(min_speed, max_speed),
			random(min_speed, max_speed),
			random(min_size, max_size),
			'white'
		));
		particles[i].draw();
	}

	animate();
}

function animate() {
	ctx.fillStyle = `rgb(0 0 0 / 40%)`;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < particles.length; i++) {
		particles[i].move();
		particles[i].draw();
	}
	animationRequest = requestAnimationFrame(animate);
}

window.addEventListener("resize", init);

init();
