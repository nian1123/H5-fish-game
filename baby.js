var babyObj = function()
{
	this.x;
	this.y;

	this.bTailTimer;
	this.bTailCount;
	this.babyTail = [];

	this.bEyeTimer;
	this.bEyeCount;
	this.bEyeInterval;
	this.babyEye = [];

	this.bBodyTimer;
	this.bBodyCount;
	this.babyBody = [];

}
 
babyObj.prototype.init = function()
{
	this.angle = 0;
	this.x = bgWidth *0.5 + 50;
	this.y = bgHeight *0.5 + 50;

	//尾巴摇动的计时器和计数器
	//获取尾巴图片资源
	this.bTailTimer = 0;
	this.bTailCount = 0;
	for (var i = 0; i < 8; i++) {
		this.babyTail[i] = new Image();
		this.babyTail[i].src =  './src/babyTail' + i + '.png';
	}

	//baby eye image src
	this.bEyeTimer = 0;
	this.bEyeCount = 0;
	this.bEyeInterval = 1000; //间隔时间
	for (var i = 0; i < 2; i++) {
		this.babyEye[i] = new Image();
		this.babyEye[i].src = './src/babyEye' + i + '.png';
	}

	//baby body
	this.bBodyTimer = 0;
	this.bBodyCount = 0;
	for (var i = 0; i < 20; i++) {
		this.babyBody[i] = new Image();
		this.babyBody[i].src = './src/babyFade' + i +'.png';
	}

}

babyObj.prototype.draw = function()
{
	//baby with mom, lerp angle lerpAngle（目标，当前，灵敏度）
	var delayX = this.x - mom.x;
	var delayY = this.y - mom.y;
	var beta = Math.atan2(delayY, delayX);
	this.angle = lerpAngle( beta, this.angle, 0.9 );

	//baby with momlerp x,y
	this.x = lerpDistance(mom.x, this.x, 0.98);
	this.y = lerpDistance(mom.y, this.y, 0.98);

	//babyTail timer
	this.bTailTimer += deltaTime;
	if (this.bTailTimer > 50) 
	{
		//计数器取模将值限制在[0,8)之间
		this.bTailCount = (this.bTailCount + 1)% 8;
		this.bTailTimer %= 50; //复原
	} 

	//baby eye timer
	this.bEyeTimer += deltaTime;
	if (this.bEyeTimer > this.bEyeInterval) 
	{
		this.bEyeCount = (this.bEyeCount + 1)% 2;
		this.bEyeTimer %= this.bEyeInterval;

		if (this.bEyeCount == 0) 
		{
			//眼睛睁开保持的时间随机
			this.bEyeInterval = Math.random() * 1500 + 2000; //[2000,3500)
		} else 
		{
			//眼睛闭上保持时间固定为100ms
			this.bEyeInterval = 100;
		}
	}

	//baby body become white
	this.bBodyTimer += deltaTime;
	if (this.bBodyTimer > 400) 
	{
		this.bBodyCount = this.bBodyCount + 1;
		this.bBodyTimer %= 300;

		if (this.bBodyCount >19)
		{
			this.bBodyCount = 19;
			//game over
			data.gameOver = true;
		}

	}

	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);

	var ta = this.bTailCount;
	ctx1.drawImage(this.babyTail[ta], -this.babyTail[ta].width * 0.5 + 24, -this.babyTail[ta].height * 0.5);
	var bo = this.bBodyCount;
	ctx1.drawImage(this.babyBody[bo], -this.babyBody[bo].width * 0.5, -this.babyBody[bo].height * 0.5);
	var ey = this.bEyeCount;
	ctx1.drawImage(this.babyEye[ey], -this.babyEye[ey].width * 0.5, -this.babyEye[ey].height * 0.5);

	ctx1.restore();
}
