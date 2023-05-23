const rain = function(s) {
    const contact = document.getElementById("contact");
    let contactWidth = contact.offsetWidth, 
        contactHeight = contact.offsetHeight;

    rains = [];

    s.setup = function() {
        let canvas = s.createCanvas(contactWidth,contactHeight);
        canvas.parent("contact");
    }

    s.draw = function() {
        s.clear();
        s.background(0,0);
        let rain = new Rain();
        rains.push(rain);
        rains.forEach(r => {
            r.draw();
            if (r.delete()) {
                rains.splice(1, rains.indexOf(r));
            }
        });
    }

    class Rain {
        constructor() {
            this.x = s.random(0,contactWidth);
            this.y = 0;
            this.y2 = s.random(10,20);
            this.vy = -14;
            this.cR = s.random(100,255);
            this.cG = s.random(100,255);
            this.cB = s.random(100,255);
            this.vx = s.random(2, 3);
        }
        draw() {
            s.stroke(this.cR, this.cG, this.cB);
            s.line(this.x, this.y, this.x+this.vx, this.y2);
            this.y -= this.vy;
            this.y2 -= this.vy;
            this.x += this.vx
        }
        delete() {
            if (this.y > contactHeight + 10 ) return true;
            else return false;
        }
    }

    window.onresize = function() {
        contactWidth = contact.offsetWidth, 
        contactHeight = contact.offsetHeight;
        s.resizeCanvas(contactWidth,contactHeight);
    }
}

new p5(rain);