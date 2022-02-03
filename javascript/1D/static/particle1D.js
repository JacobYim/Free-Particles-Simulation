class free_particle{
  constructor(width, g, dt, mass, T, k, position){
    this.mass = mass;
    this.dt = dt;
    this.T = T;
    this.k = k;

    var rand_num = random(0, 1000)/1000;
    var v = sqrt((-1)*(2*this.k*this.T/this.mass)*log(1-rand_num));

    switch (position) {
      case 'right':
        this.vx = v*-1;
        this.x = width/2; 
        break;
      case 'left':
        this.vx = v*1;
        this.x = width*(-1)/2;
        break;
      default:
        this.vx = randomGaussian(0, sqrt(this.k*this.T/(this.mass)))*random([-1,1]);;
        this.x = random(width*(-1), width)/2;
    }
  }
  update(){
      this.x = this.x + this.vx * this.dt;
  }
}