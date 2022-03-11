class free_particle{
  constructor(width, height, g, dt, mass, r, T, k, position, vwx, vwy){
    this.r = r;
    this.width = width;
    this.height = height;
    this.mass = mass;
    this.g = g;
    this.dt = dt;
    this.T = T;
    this.k = k;

    var alpha = Math.sqrt(this.mass/(2*this.k*this.T));

    var radian;
    var rand_num1 = random(0, 1000)/1000;
    var rand_num2 = random(0, 1000)/1000;
    // var vx = Math.sqrt((-1)*(2*this.k*this.T/this.mass)*log(1-rand_num1));
    // var vy = Math.sqrt((-1)*(2*this.k*this.T/this.mass)*log(1-rand_num2));
    // var v = Math.sqrt(vx**2+vy**2);
    var vx1 = Finv(F, alpha, vwx, rand_num1)*(-1);
    var vx2 = Finv(F, alpha, vwx*(-1), rand_num1);
    var vy1 = Finv(F, alpha, vwy, rand_num2)*(-1);
    var vy2 = Finv(F, alpha, vwy*(-1), rand_num2);


    switch (position) {
      case 'right':
        //  right 
        this.y = random((-1)*this.height/2, this.height/2)+this.height/2;
        this.x = this.width/2+this.width/2;
        if (random([-1, 1]) == -1){
          this.vy = vy1;
        }else{
          this.vy = vy2;
        }
        this.vx = vx1;
        // radian=random(90,270)*(TWO_PI/360);
        radian=random(135,225)*(TWO_PI/360);
        // radian=180*(TWO_PI/360);
        break;
      case 'left':
        //  left
        this.y = random((-1)*this.height/2, this.height/2)+this.height/2;
        this.x = this.width/2-this.width/2;
        if (random([-1, 1]) == -1){
          this.vy = vy1;
        }else{
          this.vy = vy2;
        }
        this.vx = vx2;
        // radian=random(270,450)*(TWO_PI/360);
        radian=random(315,405)*(TWO_PI/360);
        // radian=360*(TWO_PI/360);
        break;
      case 'top' :
        //  top
        this.x = random((-1)*this.width/2, this.width/2)+this.width/2;
        this.y = this.height/2-this.height/2;

        if (random([-1, 1]) == -1){
          this.vx = vx1;
        }else{
          this.vx = vx2;
        }
        this.vy = vy2;
        // this.vx = vx*random([-1, 1]);
        // radian=random(0,180)*(TWO_PI/360);
        radian=random(45,135)*(TWO_PI/360);
        // radian=90*(TWO_PI/360);
        break;
      case 'bottom' :
        //  bottom
        this.x = random((-1)*this.width/2, this.width/2)+this.width/2;
        this.y = this.height/2+this.height/2;
        if (random([-1, 1]) == -1){
          this.vx = vx1;
        }else{
          this.vx = vx2;
        }
        this.vy = vy1;
        // this.vy = Finv(F, alpha, vwy, rand_num)*(-1);
        // this.vx = vx*random([-1, 1]);
        // radian=random(180,360)*(TWO_PI/360);
        radian=random(225,315)*(TWO_PI/360);
        // radian=270*(TWO_PI/360);
        break;
      default:
          this.x = random((-1)*this.width/2, this.width/2)+this.width/2;
          this.y = random((-1)*this.height/2, this.height/2)+this.height/2;
          this.vx = random([-1, 1]) * randomGaussian(0, Math.sqrt(this.k*this.T/(this.mass)))
          this.vy = random([-1, 1]) * randomGaussian(0, Math.sqrt(this.k*this.T/(this.mass)))
          radian = random(0,360)*(TWO_PI/360);
    }
    var v = Math.sqrt(this.vx**2+this.vy**2);
    this.vx = v*cos(radian);
    this.vy = v*sin(radian);
  }

  update(vwx, vwy){
      this.x = this.x + (this.vx-vwx) * this.dt;
      this.y = this.y + (this.vy-vwy) * this.dt;
  }
}