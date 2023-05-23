const bubbles = function (s) {
    const nav = document.getElementById("nav");
    let navWidth = nav.offsetWidth, 
        navHeight = nav.offsetHeight;

    const bubbles = [];
    let timer = 0, timerTarget = 0;

    s.setup = function() {
        let canvas = s.createCanvas(navWidth,navHeight);
        canvas.parent("nav");
    }

    s.draw = function() {
        s.clear();
        s.background(0, 0);
        if (timer == timerTarget) {
            timerTarget = s.floor(s.random(8, 20));
            timer = 0;
            let bubble = new Bubble();
            bubbles.push(bubble);
        }
        bubbles.forEach(b => {
            b.draw();
            if (b.delete()) {
                bubbles.splice(1, bubbles.indexOf(b));
            }
        });
        timer++;
    }

    class Bubble {
        constructor() {
            this.x = s.random(0,navWidth);
            this.y = navHeight;
            this.r = s.random(40,100);
            this.vx = s.random(1,-1);
            this.vy = 3;
        }
        draw() {
            s.noStroke();
            s.fill(255, 100);
            s.ellipse(this.x, this.y, this.r);
            this.x += this.vx;
            this.y -= this.vy;
        }
        delete() {
            if (this.y < - (this.r+20)) return true;
            else return false;
        }
    }

    window.onresize = function() {
        navWidth = nav.offsetWidth, 
        navHeight = nav.offsetHeight;
        s.resizeCanvas(navWidth,navHeight);
    }
}

new p5(bubbles);