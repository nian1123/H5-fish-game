//大鱼吃果实 计算大鱼与果实的距离是否小于某一值，若是则果实消失
var momFruitCollision = function()
{
	if (!data.gameOver) 
	{
		for (var i = 0; i < fruit.num; i++) {
			if(fruit.alive[i])
			{
				//计算距离
				//x^2 + y^2 = l^2
				var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
				if (l < 800)
				{
					//果实消失
					fruit.alive[i] = false;
					data.fruitNum ++;
					mom.momBodyCount ++;
					if (mom.momBodyCount > 7) mom.momBodyCount = 7;
					
					//分值计算
					if (fruit.fruitType[i] == "blue") 
					{
						data.double = 2;
					}
					wave.born(fruit.x[i], fruit.y[i], 1);
				}
			}
		}
	}
	
}

//mom baby collision

var momBabyCollision = function()
{
	if (data.fruitNum >0 && !data.gameOver) 
	{
		var len = calLength2(mom.x, mom.y, baby.x, baby.y);
		if (len < 900) 
		{
			baby.bBodyCount = 0;
			mom.momBodyCount = 0;

			data.scoreNum();
			wave.born(mom.x, mom.y,0);

		}
	}

}