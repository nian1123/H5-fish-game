//data
var dataObj = function()
{
	this.fruitNum = 0;
	this.double = 1;
	this.score = 0;
	this.gameOver = false;
	this.alpha = 0;
}


dataObj.prototype.draw = function()
{
	ctx1.fillStyle = "#ffffff";

	ctx1.fillText("score " + this.score , bgWidth*0.5, bgHeight*0.9);

	if (this.gameOver) 
	{
		ctx1.save();
		this.alpha += deltaTime * 0.0007;
		if (this.alpha > 1) this.alpha = 1;
		ctx1.fillStyle = "rgba(255,255,255,"+ this.alpha +")";
		ctx1.shadowBlur = 20;
		ctx1.shadowColor = "#eeeeee";
    	ctx1.font = "40px Verdana";
		ctx1.fillText("GAMEOVER " , bgWidth*0.5, bgHeight*0.5);
		ctx1.restore();

	}
}

dataObj.prototype.scoreNum = function()
{
	this.score += this.fruitNum * this.double * 10;
	this.fruitNum = 0;
	this.double = 1;
	
}