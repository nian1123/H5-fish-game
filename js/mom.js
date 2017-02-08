var momObj = function() 
{
	this.x;
	this.y;
	this.angle;

	this.momTail = [];
	this.momTailTimer;
	this.momTailCount;

	this.momEye = [];
	this.momEyeTimer;
	this.momEyeCount;
	this.momEyeInterval;

	this.momBodyO = [];
	this.momBodyB = [];
	this.momBodyCount;
}

momObj.prototype.init = function()
{
	this.angle = 0;
	this.x = bgWidth *0.5;
	this.y = bgHeight *0.5;

	//mom tail 
	this.momTailTimer = 0;
	this.momTailCount = 0;
	for (var i = 0; i < 8; i++) {
		this.momTail[i] = new Image();
		this.momTail[i].src = './src/bigTail' + i +'.png';		
	}

	//mom eye
	this.momEyeTimer = 0;
	this.momEyeCount = 0;
	this.momEyeInterval = 1000;
	for (var i = 0; i < 2; i++) {
		this.momEye[i] = new Image();
		this.momEye[i].src = './src/bigEye' + i + '.png';
	}

	//mom body
	this.momBodyCount = 0;
	for (var i = 0; i < 8; i++) {
		this.momBodyO[i] = new Image();
		this.momBodyB[i] = new Image();
		this.momBodyO[i].src = './src/bigSwim' + i + '.png';
		this.momBodyB[i].src = './src/bigSwimBlue' + i + '.png';
	}
}

momObj.prototype.draw = function()
{
	//鱼的角度跟随指向鼠标坐标
	//lerp angle lerpAngle（目标，当前，灵敏度）
	var delayX = this.x - mx;
	var delayY = this.y - my;
	var beta = Math.atan2(delayY, delayX);
	this.angle = lerpAngle( beta, this.angle, 0.9 );

	//鱼的坐标位置跟随鼠标坐标
	//lerp x,y
	this.x = lerpDistance(mx, this.x, 0.98);
	this.y = lerpDistance(my, this.y, 0.98);

	//tail change
	this.momTailTimer += deltaTime;
	if (this.momTailTimer > 50) 
	{
		this.momTailCount = (this.momTailCount + 1) % 8;
		this.momTailTimer %= 50;
	}

	//eye chang
	this.momEyeTimer += deltaTime;
	if (this.momEyeTimer > this.momEyeInterval) 
	{
		this.momEyeCount = (this.momEyeCount + 1) % 2;
		this.momEyeTimer %= this.momEyeInterval;
		if (this.momEyeCount == 0) 
		{
			this.momEyeInterval = Math.random() * 1500 + 2000; //[2000, 3500)
		} else{
			this.momEyeInterval = 100;
		}
	}

	ctx1.save();
	//相当于将原点移动到this.x, this.y的位置
	ctx1.translate(this.x, this.y); 
	ctx1.rotate(this.angle);
	var momT = this.momTailCount;
	ctx1.drawImage(this.momTail[momT], -this.momTail[momT].width * 0.5 + 30, -this.momTail[momT].height * 0.5);
	var momB = this.momBodyCount;
	if (data.double == 1) 
	{
		ctx1.drawImage(this.momBodyO[momB], -this.momBodyO[momB].width * 0.5, -this.momBodyO[momB].height * 0.5);
	} 
	if (data.double == 2) 
	{
		ctx1.drawImage(this.momBodyB[momB], -this.momBodyB[momB].width * 0.5, -this.momBodyB[momB].height * 0.5);
	} 
	var momE = this.momEyeCount;
	ctx1.drawImage(this.momEye[momE], -this.momEye[momE].width * 0.5, -this.momEye[momE].height * 0.5);
	ctx1.restore(); // 限定里面的变换仅仅作用于大鱼
}
