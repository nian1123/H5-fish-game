var fruitObj = function()
{
		this.alive = []; //bool
		this.yellow = new Image();
		this.blue = new Image();
		this.x = [];
		this.y = [];
		this.l = [];
		this.spa = [];
		this.fruitType = [];
		this.aneNu = [];
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function()
{
	for ( var i = 0; i < this.num; i++)
	{
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.l[i] = 0; //果实大小
		this.spa[i] = Math.random() * 0.017 + 0.003; //[0.003, 0.02)
		this.fruitType[i] = "";
		this.aneNu[i] = 0;

	}
	this.yellow.src = "./src/fruit.png";
	this.blue.src = "./src/blue.png";

}

fruitObj.prototype.draw = function()
{
	for ( var i = 0; i < this.num; i++)
	{
		//激活后绘制
		if (this.alive[i] == true)
		{
			if (this.fruitType[i] == "blue") 
			{
				var pic = this.blue;
			}
			else
			{
				var pic = this.yellow;
			}
			if (this.l[i] < 14) 
			{
				//在大小小于14的情况下继续长大
				this.x[i] = ane.headX[this.aneNu[i]];
				this.y[i] = ane.headY[this.aneNu[i]];
				this.l[i] += deltaTime * this.spa[i] * 0.5; //0.01
			}
			else 
			{
				//在大小大于14的情况下上浮
				this.y[i] -=  deltaTime * this.spa[i] * 5;  //0.05
			}

			
			ctx2.drawImage(pic, this.x[i] - this.l[i] *0.5, this.y[i] - this.l[i] *0.5, this.l[i], this.l[i] );

			if (this.y[i] < 0) 
			{
				this.alive[i] = false;
				this.l[i] = 0;
			}
		}
		//果实飘出屏幕后将果实锁定
		
	}
}

fruitObj.prototype.born = function(i)
{
	//随机选择目标海葵
	//Math.floor()取整
	this.aneNu[i] = Math.floor(Math.random() * ane.num);
	this.l[i] = 0; 
	var rand = Math.random();

	//定位果实
	if(rand < 0.1) 
	{
		this.fruitType[i] = "blue";
	}
	else
	{
		this.fruitType[i] = "yellow"; 
	}
	this.alive[i] = true;
}

function fruitMonitor()
{
	//限制屏幕中果实的数量
	var num = 0;
	for (var i = 0; i < fruit.num; i++) 
	{
		if (fruit.alive[i]) num++;
	}

	if (num < 15) 
	{
		senFruit();
		return;

	}

}

function senFruit()
{
	for (var i = 0; i < fruit.num; i++) {
		if (!fruit.alive[i]) 
		{
			fruit.born(i);
			return;
		}
	}
}
