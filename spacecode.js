var ship = new triangle(canvasElem.width/2, canvasElem.height/2, 60, 30, 'gray');
ship.deltaX = 4;
ship.deltaY = 4;
ship.deltaAngle = 5;
   
var background = new rectangle(canvasElem.width/2, canvasElem.height/2, canvasElem.width, canvasElem.height, 'black');
var stars = {};
var starLength = randomInt(100, 500);
for (var i = 0; i < starLength; i++) {
  var x = randomInt(0, canvasElem.width);
  var y = randomInt(0, canvasElem.height);
  stars[i] = new circle(x, y, 2, 'white');
}
    
var aliens = {};
var alienLength = randomInt(3, 10);
for (var i = 0; i < alienLength; i++) {
  var x = randomInt(0, canvasElem.width);
  var y = randomInt(0, canvasElem.height);
      
  aliens[i] = new rectangle(x, y, 25, 50, 'green');
  aliens[i].dead = false;
}
    
var bullet = new rectangle(0, 0, 5, 25, 'blue');
bullet.deltaX = 16;
bullet.deltaY = 16;
bullet.letsDraw = false;
    
    
var grd=canvas.createLinearGradient(canvasElem.width,canvasElem.height,0,0);
grd.addColorStop(0,"yellow");
grd.addColorStop(1,"red");
var winner = new circle(canvasElem.width, canvasElem.height, 0, grd);
winner.deltaRadius = 1;

function loop() {
  clearCanvas();
                
  if (keyboard['left']) {
    ship.angle -= ship.deltaAngle;
    if (ship.angle < 0) ship.angle += 360;
  }
      
  if (keyboard['right']) {
    ship.angle += ship.deltaAngle;
    if (ship.angle > 360) ship.angle -= 360;  
  }
  
  if (keyboard['up']) {
    ship.x += Math.sin(ship.radAngle())*ship.deltaX;
    ship.y -= Math.cos(ship.radAngle())*ship.deltaY;
  }
      
  if (keyboard['down']) {
    ship.x -= Math.sin(ship.radAngle())*ship.deltaX;
    ship.y += Math.cos(ship.radAngle())*ship.deltaY;
  }
      
  if (keyboard[' ']) {
    if (bullet.letsDraw === false) {
      bullet.letsDraw = true;
      bullet.x = ship.getCenterX() + Math.sin(ship.radAngle())*(ship.height/2);
      bullet.y = ship.getCenterY() - Math.cos(ship.radAngle())*(ship.height/2);
      bullet.angle = ship.angle;
    }
  }

  background.draw();
      
  for (var i = 0; i < starLength; i++) {
    stars[i].draw();
  }
      
  if (bullet.letsDraw === true) {
    bullet.x += Math.sin(bullet.radAngle())*bullet.deltaX;
    bullet.y -= Math.cos(bullet.radAngle())*bullet.deltaY;
    if (bullet.y > canvasElem.height || bullet.y < 0 || bullet.x > canvasElem.width || bullet.x < 0) {
      bullet.letsDraw = false;
    }
    bullet.draw();
  }
      
  var count = 0;
  for (i = 0; i < alienLength; i++) {
    if (aliens[i].dead === false) {
      count++;
      if (bullet.letsDraw === true) {
        if (bullet.x < aliens[i].x + aliens[i].width/2  && bullet.x > aliens[i].x - aliens[i].width/2 &&
          bullet.y < aliens[i].y + aliens[i].height/2 && bullet.y > aliens[i].y - aliens[i].height/2) {
          bullet.letsDraw = false;
          aliens[i].dead = true;
          count--;
        } else {
          aliens[i].draw();
        }
      } else {
        aliens[i].draw();                                                                                                                                                                                                        
      }
    }
          
  }
            
  if (count === 0) {
    winner.radius += winner.deltaRadius;
    winner.deltaRadius *= 1.05;
    winner.draw();
    if (winner.radius > canvasElem.width*2) {
      winner.radius = canvasElem.width*2;
      canvas.font = '48px sans-serif';
      canvas.fillStyle = 'black';
      canvas.fillText('You win!', 40, canvasElem.height/2);
    }
  }
      
  ship.draw();
      
}

setInterval(loop, 15);  
