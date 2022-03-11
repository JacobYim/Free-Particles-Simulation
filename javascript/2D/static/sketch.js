var particle_number = 250;
var window_width = 500;
var window_height = 500;
var g = 0;
var num_col = 0;
var T = 100;
var dt = 0.001;
var t = 0.0;
var m = 1;
var k = 1;
var r = 50;
var m_fp = m/100;

var num_top = 0;
var num_bottom = 0;
var num_right = 0;
var num_left = 0;
var last_top = 0;
var last_bottom = 0;
var density = particle_number/(window_width*window_height);

function setup() {
  createCanvas(window_width, window_height);
  fps = []
  for(var i = 0; i < particle_number; i++){
    fps[i] = new free_particle(window_width, window_height, g, dt, m_fp, r/10, T, k, null);
  }
}

function draw() {
    background(220);
    for (i = 0 ; i < fps.length ; i++){
        fps[i].update();
        var fp_coord_x = fps[i].x
        var fp_coord_y = fps[i].y
        
        // remove the out of window
        if (fp_coord_x < 0|| fp_coord_x > window_width) {
            fps.splice(i, 1);
        }
        else if ( fp_coord_y > window_height || fp_coord_y < 0 ){
            fps.splice(i, 1);
        }else{
            // console.log(fps[i].x, fps[i].y);
            ellipse(fp_coord_x, fp_coord_y, fps[i].r/2, fps[i].r/2);
        }
    }

    num_right   += density * dt / 2 * sqrt((2*k*T)/(m_fp*PI)) * window_height;
    num_left    += density * dt / 2 * sqrt((2*k*T)/(m_fp*PI)) * window_height;
    num_top     += density * dt / 2 * sqrt((2*k*T)/(m_fp*PI)) * window_width;
    num_bottom  += density * dt / 2 * sqrt((2*k*T)/(m_fp*PI)) * window_width;

    console.log(num_right);
    if (num_bottom > 0 ){
        for(var i = 0; i < int(num_bottom); i++){
            fps.push(new free_particle(window_width, window_height, g, dt, m_fp, r/10, T, k, "bottom"));
            num_bottom = num_bottom - 1;
        }
    }
    if (num_top > 0 ){
        for(var i = 0; i < int(num_top); i++){
            fps.push(new free_particle(window_width, window_height, g, dt, m_fp, r/10, T, k, "top"));
            num_top = num_top - 1;
        }
    }
    if (num_right > 0 ){
        for(var i = 0; i < int(num_right); i++){
            fps.push(new free_particle(window_width, window_height, g, dt, m_fp, r/10, T, k, "right"));
            num_right = num_right - 1;
        }
    }
    if (num_left > 0 ){
        for(var i = 0; i < int(num_left); i++){
            fps.push(new free_particle(window_width, window_height, g, dt, m_fp, r/10, T, k, "left"));
            num_left = num_left - 1;
        }
    }
  console.log(t, density, fps.length/(window_width*window_height));  
  t = round(t + dt, 5);
}