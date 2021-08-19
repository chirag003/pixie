function Circle(c, w, h, radius, speed, gravity, friction, colors) {
    this.init = () => {
      this.color = colors[parseInt(colors.length * Math.random())];
      this.radius = Math.random() * radius;
      this.currRadius = this.radius;
      this.maxRadius = radius * 2;
      
      this.gravity = gravity;
      this.friction =
        (friction * (1000 + radius - this.radius)) / (1000 + radius);
      this.x = Math.random() * (w - 2 * this.radius) + this.radius;
      this.y = Math.random() * (h - 2 * this.radius) + this.radius;
      this.dy = (Math.random() - 0.5) * speed;
      this.dx = (Math.random() - 0.5) * speed;
      this.dradius = Math.random() * speed;
      if (this.x < this.radius) {
        this.x = this.radius;
      }
      if (this.y < this.radius) {
        this.y = this.radius;
      }
      this.draw();
    };
    this.draw = curr => {
      c.beginPath();
      if (
        curr &&
        this.x - curr.x < this.maxRadius &&
        this.x - curr.x > -this.maxRadius &&
        this.y - curr.y < this.maxRadius &&
        this.y - curr.y > -this.maxRadius
      ) {
        c.arc(this.x, this.y, this.currRadius, 0, Math.PI * 2, false);
        if (this.maxRadius > this.currRadius && this.currRadius > 1) {
          this.currRadius += this.dradius;
        }
      } else {
        if (this.currRadius > this.radius) {
          this.currRadius -= 1;
        } else {
          this.currRadius = this.radius;
        }
        c.arc(this.x, this.y, this.currRadius, 0, Math.PI * 2, false);
      }
      c.fillStyle = "#" + this.color;
      c.fill();
    };
    this.animate = curr => {
      this.draw(curr);
      if (this.x + this.radius > w || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.radius > h || this.y - this.radius < 0) {
        this.dy = -this.dy;
      } else {
        this.dy += this.gravity;
      }
      if (this.friction != 1) {
        this.dy *= this.friction;
        this.dx *= this.friction;
      }
      this.x += this.dx;
      this.y += this.dy;
    };
  }
  function startScreensaver(
    amount,
    radius,
    speed,
    gravity,
    friction,
    colorString
  ) {
    document.querySelector("body").innerHTML += "<canvas></canvas>";
    document.querySelector("body").style.margin = "0";
    let canvas = document.querySelector("canvas");
    canvas.style.height = "100%";
    canvas.style.width = "100%";
    let c = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let mouse = {};
    let circleArray = [];
    let colors = colorString.split("-");
    for (let i = 0; i < amount; i++) {
      let circle = new Circle(
        c,
        canvas.width,
        canvas.height,
        radius,
        speed,
        gravity,
        friction,
        colors
      );
      circle.init();
      circleArray.push(circle);
    }
    function animate() {
      requestAnimationFrame(animate);
      c.clearRect(0, 0, canvas.width, canvas.height);
      for (let circle of circleArray) {
        circle.animate(mouse);
      }
    }
    animate();
    window.addEventListener("mousemove", event => {
      mouse.x = event.x;
      mouse.y = event.y;
    });
  }
  startScreensaver(600, 09, 11, 2, 0.788, "ffc0cb-f98b88-ffc0cb-ffcba4-ffcba4");
  // amount, radius, speed, gravity, friction, colorString;
  