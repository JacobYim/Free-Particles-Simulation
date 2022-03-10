let window_width = 250;
let window_height = 250;
let dt = 0.01;
let t = 0;
let mass = 1;
let particle_number = 250;
let T = 1000;
let k = 1;
let density = particle_number/window_width;

let a = Math.sqrt(2*k*T/mass);
var vw = 10.0; // + : right

var num_right = 0.0;    // parameter for count of particle to add from right direction
var num_left = 0.0;     // parameter for count of particle to add from left direction

let result_list = ['Time;density_set;density_sim'];
  
function mousePressed() {
    if (mouseX > 0 && mouseX < window_width && mouseY > 0 && mouseY < window_height) {
        saveStrings(result_list, 'infinity_silindar.txt');
    }
}

// function erfc(x) {
//   var retval = 0.0;
//   var dx = 0.01;
//   for(var i = 0; i < 1000; i = i + dx){
//     retval += Math.exp(-1*(x + i)**2)*(dx);
//   }
//   return retval*2/sqrt(Math.PI);
// }

function setup() {
    createCanvas(window_width, window_height);  
    fps = []
    for(var i = 0; i < particle_number; i++){
        fps[i] = new free_particle(window_width, dt, mass, T, k, null, vw);
    }
}

function draw() {
    background(220);

    // draw the particles
    for (i = 0 ; i < fps.length ; i++){
        fps[i].update(vw);
        if (fps[i].x < -1*window_width/2 || fps[i].x > window_width/2){
            fps.splice(i, 1);
        }else{
            ellipse(fps[i].x+window_width/2, window_height/2, 1, 1);
        }
    }

    // calculate the free paticle to add in right and left
    num_left  += density * sqrt((2*k*T)/(mass)) * dt / 2 * (Math.exp(-1*(vw/a)**2)/sqrt(Math.PI) -(vw/a)*erfc(vw/a));
    num_right += density * sqrt((2*k*T)/(mass)) * dt / 2 * (Math.exp(-1*(vw/a)**2)/sqrt(Math.PI) +(vw/a)*erfc((-1)*vw/a));

    // num_right += density * a * dt / 2 * (Math.exp(-1*(vw/a)**2)/sqrt(Math.PI) -(vw/a)*erfc(vw/a));
    // num_left += density * a * dt / 2 * (Math.exp(-1*(vw/a)**2)/sqrt(Math.PI) +(vw/a)*erfc((-1)*vw/a));

    // put particle to right
    if (num_right > 0 ){
        for(var i = 0; i < int(num_right); i++){
          fps.push(new free_particle(window_width, dt, mass, T, k, "right", vw));
          num_right = num_right - 1;
        }
    }

    // put particle to left
    if (num_left > 0 ){
        for(var i = 0; i < int(num_left); i++){
            fps.push(new free_particle(window_width, dt, mass, T, k, "left", vw));
            num_left = num_left - 1;
        }
    }

    console.log(t, "density", density, fps.length/window_width);
    result_list.push(String(t)+';'+String(density)+';'+String(fps.length/window_width));
    t = round(t+dt,3);
}
