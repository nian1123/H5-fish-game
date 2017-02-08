document.body.onload = game;

var can1,
	ctx1,
	can2,
	ctx2,
	bgWidth,
	bgHeight,
	ane,
	fruit,
	mom,
	mx,
	my,
	baby,
	lastTime = Date.now(),
	deltaTime = 0,
	bgpic = new Image(),
    data,
    wave;



function game() 
{
    init();
    gameloop();
}

function init() 
{ //初始化
    can1 = document.getElementById("canvas1"); //fonr--fishes, UI, circles, dust
    ctx1 = can1.getContext("2d"); //获取画布内容
    can2 = document.getElementById("canvas2");//back-- background, ane,fruits 
    ctx2 = can2.getContext("2d");

    ctx1.font = "20px Verdana";
    ctx1.textAlign = "center";

    //检测鼠标移动事件
    can1.addEventListener('mousemove', onMousemove, false);

    bgWidth = can1.width;
    bgHeight = can1.height;
    bgpic.src="./src/background.jpg";
    //海葵
    ane = new aneObj();
    ane.init();

    fruit = new fruitObj();
    fruit.init();

    mom = new momObj();
    mom.init();
    //初始化鼠标的坐标
    mx = bgWidth * 0.5;
    my = bgHeight * 0.5;

    baby = new babyObj();
    baby.init();

    data = new dataObj();

    wave = new waveObj();
    wave.init();

}

function gameloop() 
{
    requestAnimFrame(gameloop);
    var now = Date.now();
    deltaTime = now - lastTime; 
    lastTime = now;
    //时间帧间隔

    drawBackground();
    ane.draw();
    
    fruitMonitor();
    fruit.draw();

    //本身画布是透明的，每一帧都做画，图像会覆盖重叠，因此作画之前要清除画布

    momFruitCollision();
    momBabyCollision();
    
    ctx1.clearRect(0, 0, bgWidth, bgHeight); 
    mom.draw();
    baby.draw();


    wave.draw();

    data.draw();


}

//获取鼠标坐标
function onMousemove(e)
{
    if (!data.gameOver) 
    {
        //浏览器兼容
        if(e.offSetX || e.layerX)
        {
            //if(e.offSetX == undefined){mx=e.layerX} else {mx=e.offSetX}
            //offSetX IE特有
            mx = e.offSetX == undefined ? e.layerX : e.offSetX;
            my = e.offSetY == undefined ? e.layerY : e.offSetY;
        }
    }
	
}

