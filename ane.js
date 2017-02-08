var aneObj = function() 
{
	//start point , control point, head point
	this.rootX = [];
	this.headX = [];
	this.headY = [];
	this.amp = [];
	this.alph = 0;
}
aneObj.prototype.num = 50; //js prototype 实现继承
aneObj.prototype.init = function() 
{
	for(var i = 0; i < this.num; i++ ) 
	{
		this.rootX[i] = i * 16 + Math.random() * 20; // Math.random() 随机函数 [0,1)
		this.headX[i] = this.rootX[i];
		this.headY[i] = bgHeight - 200 - Math.random() * 50;
		this.amp[i] = Math.random() * 50 + 30; //
	}
	
}
aneObj.prototype.draw = function() 
{
	ctx2.save();
	//beginPath, moveTo, lineTo,strokeStyle ,lineCap,stroke,lineWidth,globalAlpha,//（透明度）
	ctx2.strokeStyle = "#3b1541";
	ctx2.lineWidth = 20;
	ctx2.lineCap = "round";
	//透明度
	ctx2.globalAlpha = 0.6;

	this.alph += deltaTime * 0.0009;
	var sinx = Math.sin(this.alph); //[-1,1]

	for(var i = 0; i < this.num; i++ ) 
	{
		ctx2.beginPath();
		ctx2.moveTo(this.rootX[i], bgHeight);
		this.headX[i] = this.rootX[i] + sinx * this.amp[i];
		ctx2.quadraticCurveTo(this.rootX[i], bgHeight - 100, this.headX[i] , this.headY[i]);
		ctx2.stroke();
	}
	ctx2.restore(); //重置
}