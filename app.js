var body = []; //[{0,0}, {0,1}, {1,2}]
var state = 0;// 0- right 1-down 2-left 3-up

const canvas = document.getElementById('myCanvas');
const ctx= canvas.getContext('2d');
ctx.fillStyle = '#A7D948';
ctx.fillRect(0,0,520,520);


function handleKey(e){
    // As soon as we click any key it will call handleKey function
    e= e|| window.event;
    var play= false;
    if(e.keyCode == '38' && state!=1 && state!=3){
        // UP arrow key
        state=3;
        play= true;
    }else if(e.keyCode == '40' && state!=1 && state!=3){
        // DOWN arrow key
        state=1;
        play= true;
    }else if(e.keyCode == '37' && state!=0 && state!=2){
        // LEFT arrow key
        state=2;
        play= true;
    }else if(e.keyCode == '39' && state!=0 && state!=2){
        // RIGHT arrow key
        state=0;
        play= true;
    }
    if(play){
        playAudio();
    }
    // console.log(e.keyCode);
}
document.onkeydown = handleKey;

function playAudio(){
    var audio = new Audio('https://www.soundjay.com/switch/switch-1.wav');
    audio.play();
}
function playConsume(){
    var audio = new Audio('https://www.soundjay.com/button/button-3.wav');
    audio.play();
}

const n=20;
const size = 520;
const cellSize = size/n;

// 2D-Array
var matrix= new Array(n);
for(var i=0; i<matrix.length; i++){
    matrix[i]=new Array(n);
}
function drawCell(i,j){
    if((i+j)%2==0){
        ctx.fillStyle = '#8ECC39';
    }
    else{
        ctx.fillStyle = '#A7D948';
    }
    ctx.fillRect(i*cellSize,j*cellSize,cellSize,cellSize);
}

for(var i=0; i<matrix.length; i++){
    for(var j=0; j<matrix[i].length; j++){
        matrix[i][j]=0;
        drawCell(i,j);
    }
}

body.push([1+n/2,n/2]);
console.log(`${body[0][0]} , ${body[0][1]} `)
body.push([n/2,n/2]);
body.push([-1+n/2,n/2]);

var eyeImage = new Image();
eyeImage.src = 'https://i.imgur.com/6jLbz7l.png';

var foodImage = new Image();
foodImage.src = 'https://i.imgur.com/88saChB.png';

var counter=0;
var foodX = 0; 
var foodY = 0;

function generateFood(){
    var success=false;
    while(!success){
        foodX = parseInt(Math.random()*n);
        // foodX = 13
        console.log(foodX);
        foodY = parseInt(Math.random()*n);
        // foodY = 7
        console.log(foodY);
        success=true;
        // It should never collid with the body of the snake
        for(var i=0; i<body.length;i++){
            if(body[i][0]==foodX && body[i][1]==foodY ){
                success= false;
            }
        }
    }
}
generateFood();

function update(){
    counter++;
    var increase= false;
    // console.log(body[0][0]);
    // console.log(body[0][1]);
    if(body[0][0]==foodX && body[0][1]==foodY){
        // console.log(body[0][0]);
        // console.log(body[0][1]);
        generateFood();
        playConsume();
        increase= true;
    }
    for(var i=0; i<matrix.length; i++){
        for(var j=0; j<matrix[i].length; j++){
            drawCell(i,j);
        }
    }
    ctx.drawImage(foodImage, foodX*cellSize,foodY*cellSize,cellSize,cellSize );

    for(var i=0; i<body.length; i++){
        ctx.fillStyle = '#527DF9';
        ctx.fillRect(cellSize*body[i][0],cellSize*body[i][1], cellSize, cellSize);
        if(i==0){
            var marginX = cellSize/3;
            var marginY = cellSize/3;
            if(state==0||state==2){
                marginX=0;
            }else if(state==1||state==3){
                marginY=0;
            }
            ctx.drawImage(eyeImage,
            0,28*(counter%9),
            cellSize,cellSize, 
            body[i][0]*cellSize+marginX,
            body[i][1]*cellSize+marginY,
            cellSize,cellSize );
            ctx.drawImage(eyeImage,
            0,28*(counter%9),
            cellSize,cellSize, 
            body[i][0]*cellSize-marginX,
            body[i][1]*cellSize-marginY,
            cellSize,cellSize );
        }        
    }
    var x=0;
    var y=0;
    if(state==0)
        x++;
    else if(state==1)
        y++;
    else if(state==2)
        x--;
    else if(state==3)
        y--;

    var first= body[0];
    var arr=[body[0][0]+x, body[0][1]+y];
    body.splice(0,0,arr);
    if(!increase){
        body.pop();
    }
}
window.onload;
setInterval(update, 300);