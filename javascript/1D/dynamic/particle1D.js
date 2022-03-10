// function erf(x){
//   var retval = 0.0;
//   var neg = false;
//   if (x < 0){
//     neg = true;
//     x = (-1)*x;
//   } 
//   var dx = x/100000;
//   for(var i = 0; i < x; i = i + dx){
//     retval += dx * Math.exp(-1*(i**2));
//   }
//   retval = retval*2/Math.sqrt(Math.PI);
//   if (retval > 1){
//     retval = 1.0;
//   }
//   if (neg){
//     retval = (-1)*retval;
//   }
//   return retval;
// }

// function A (alpha, vw, x) {
//   return 1/(2*alpha*Math.sqrt(Math.PI))*(-Math.exp(-1*(alpha*(vw+x))**2))
// }
// function B (alpha, vw, x) {
//   return 1/2*(erf(alpha*(vw+x))-1)
// }
// function f(alpha, vw, x) {
//   // console.log("in f",x, A(alpha, vw, x), B(alpha, vw, x));
//   return A(alpha, vw, x) - vw * B(alpha, vw, x)
// }
// function F(alpha, vw, x) {
//   // console.log("in F", x, f(alpha,vw, x), f(alpha, vw, 0))
//   return 1-(f(alpha,vw,x)/f(alpha, vw, 0))
// }

// function Finv(F, alpha, vw, y){
//   x = 0
//   dx = 1
//   transition = [false, false]
//   error = y - F(alpha, vw, x)
//   // console.log("F(alpha, vw, x)", F(alpha, vw, x));
//   // console.log("error", error);
//   while (abs(error) > 0.0001) {
//     // console.log(x, "error", error);
//     if (error > 0) {
//       // print("error > 0");
//       transition[0] = true
//       x = x + dx;
//       // print("y", y,"x", x, "alpha", alpha);
//       // print("check", error, y - F(alpha, vw, x));
//       // print("check", y - F(alpha, vw, 0), y - F(alpha, vw, 1), y - F(alpha, vw, 2), y - F(alpha, vw, 300000));
//       // print(F(alpha, vw, 0), F(alpha, vw, 1), F(alpha, vw, 2), F(alpha, vw, 300000))
//     }
//     if (error < 0) {
//       // print("error < 0");
//       transition[1] = true
//       x = x - dx;
//       // print("x", x)
//       // print("check", error, y - F(alpha, vw, x));
//       // print("check", y - F(alpha, vw, 0), y - F(alpha, vw, 1), y - F(alpha, vw, 2), y - F(alpha, vw, 3));
//     }
//     if (transition[0] && transition[1]) {
//       dx = dx * 0.1;
//       transition = [false, false];
//     }
//     if (error == y - F(alpha, vw, x)) {
//       break;
//     }
//     error = y - F(alpha, vw, x);
//   }
//   return x
// }



class free_particle{
  constructor(width, dt, mass, T, k, position, vw){
    this.mass = mass;
    this.dt = dt;
    this.T = T;
    this.k = k;

    var rand_num = random(0, 1000)/1000;
    var alpha = Math.sqrt(this.mass/(2*this.k*this.T));
    // test
    var v = sqrt((-1)*(2*this.k*this.T/this.mass)*log(1-rand_num));

    switch (position) {
      case 'right':
        // this.vx = find_intersect(rand_num, (-1)*vw, this.T, this.k, this.mass)*-1;
        // this.vx = v*-1;
        this.vx = Finv(F, alpha, vw, rand_num)*(-1);
        // console.log("dif", this.vx-v*-1);
        // console.log(rand_num, this.vx);
        // this.vx = -1*Finv(F, alpha, (-1)*vw, rand_num);
        this.x = width/2; 
        break;
      case 'left':
        // this.vx = find_intersect(rand_num, vw, this.T, this.k, this.mass)*1;
        // this.vx = Finv(F, alpha, vw, rand_num);
        // this.vx = v*1;
        this.vx = Finv(F, alpha, (-1)*vw, rand_num);
        // console.log("dif", this.vx-v);
        // console.log(rand_num, this.vx);
        this.x = width*(-1)/2;
        break;
      
      default:
        this.vx = randomGaussian(0, sqrt(this.k*this.T/(this.mass)))*random([-1,1]);;
        this.x = random(width*(-1), width)/2;
    }
  }
  update(vm){
      this.x = this.x + (this.vx - vm) * this.dt;
  }
}