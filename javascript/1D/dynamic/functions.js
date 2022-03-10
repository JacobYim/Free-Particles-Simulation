function erf(x){
    var retval = 0.0;
    var neg = false;
    if (x < 0){
      neg = true;
      x = (-1)*x;
    } 
    var dx = x/1000;
    for(var i = 0; i < x; i = i + dx){
      retval += dx * Math.exp(-1*(i**2));
    }
    retval = retval*2/Math.sqrt(Math.PI);
    if (retval > 1){
      retval = 1.0;
    }
    if (neg){
      retval = (-1)*retval;
    }
    return retval;
}

function A (alpha, vw, x) {
    return 1/(2*alpha*Math.sqrt(Math.PI))*(-Math.exp(-1*(alpha*(vw+x))**2))
}
function B (alpha, vw, x) {
    return 1/2*(erf(alpha*(vw+x))-1)
}
function f(alpha, vw, x) {
// console.log("in f",x, A(alpha, vw, x), B(alpha, vw, x));
    return A(alpha, vw, x) - vw * B(alpha, vw, x)
}
function F(alpha, vw, x) {
// console.log("in F", x, f(alpha,vw, x), f(alpha, vw, 0))
    return 1-(f(alpha,vw,x)/f(alpha, vw, 0));
}

function Finv(F, alpha, vw, y){
    x = 0
    dx = 1
    transition = [false, false]
    error = y - F(alpha, vw, x)
    // console.log("F(alpha, vw, x)", F(alpha, vw, x));
    // console.log("error", error);
    while (abs(error) > 1e-9) {
        // console.log(x, "error", error);
        if (error > 0) {
            // print("error > 0");
            transition[0] = true
            x = x + dx;
            // print("y", y,"x", x, "alpha", alpha);
            // print("check", error, y - F(alpha, vw, x));
            // print("check", y - F(alpha, vw, 0), y - F(alpha, vw, 1), y - F(alpha, vw, 2), y - F(alpha, vw, 300000));
            // print(F(alpha, vw, 0), F(alpha, vw, 1), F(alpha, vw, 2), F(alpha, vw, 300000))
        }
        if (error < 0) {
            // print("error < 0");
            transition[1] = true
            x = x - dx;
            // print("x", x)
            // print("check", error, y - F(alpha, vw, x));
            // print("check", y - F(alpha, vw, 0), y - F(alpha, vw, 1), y - F(alpha, vw, 2), y - F(alpha, vw, 3));
        }
        if (transition[0] && transition[1]) {
            dx = dx * 0.1;
            transition = [false, false];
        }
        if (error == y - F(alpha, vw, x)) {
            break;
        }
        error = y - F(alpha, vw, x);
    }
    return x
}

function erfc(x) {
    return 1-erf(x);
  }