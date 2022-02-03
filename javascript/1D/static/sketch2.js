let window_width = 250;
let window_height = 250;
let dt = 0.01;
let t = 0;
let mass = 1;
let particle_number = 250;
let T = 1000;
let k = 1;
let density = particle_number/window_width;

var num_right = 0.0;    // parameter for count of particle to add from right direction
var num_left = 0.0;     // parameter for count of particle to add from left direction

let result_list = ['Time;density_set;density_sim'];
  
function mousePressed() {
    if (mouseX > 0 && mouseX < window_width && mouseY > 0 && mouseY < window_height) {
        saveStrings(result_list, 'infinity_silindar.txt');
    }
}

function setup() {
    createCanvas(window_width, window_height);  
    fps = []
    for(var i = 0; i < particle_number; i++){
        fps[i] = new free_particle(window_width, g, dt, mass, T, k, null);
    }
}

function draw() {
    background(220);

    // draw the particles
    for (i = 0 ; i < fps.length ; i++){
        fps[i].update();
        if (fps[i].x < -1*window_width/2 || fps[i].x > window_width/2){
            fps.splice(i, 1);
        }else{
            ellipse(fps[i].x+window_width/2, window_height/2, 1, 1);
        }
    }

    // calculate the free paticle to add in right and left
    num_right += density * dt / 2 * sqrt((2*k*T)/(mass*PI));
    num_left  += density * dt / 2 * sqrt((2*k*T)/(mass*PI));

    // put particle to right
    if (num_right > 0 ){
        for(var i = 0; i < int(num_right); i++){
          fps.push(new free_particle(window_width, g, dt, mass, T, k, "right"));
          num_right = num_right - 1;
        }
    }

    // put particle to left
    if (num_left > 0 ){
        for(var i = 0; i < int(num_left); i++){
            fps.push(new free_particle(window_width, g, dt, mass, T, k, "left"));
            num_left = num_left - 1;
        }
    }

    
    console.log(t, "density", density, fps.length/window_width);
    result_list.push(String(t)+';'+String(density)+';'+String(fps.length/window_width));
    t = round(t+dt,3);
}
