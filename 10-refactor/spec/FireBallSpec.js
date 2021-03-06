describe("FireBall", function(){
	
	var canvas, ctx;

    beforeEach(function(){
		loadFixtures('index.html');

		canvas = $('#game')[0];
		expect(canvas).toExist();

		ctx = canvas.getContext('2d');
		expect(ctx).toBeDefined();
		
		SpriteSheet = {
			map: { 
				fireball_1: { sx: 0, sy: 64, w: 64, h: 64, frames: 1 } 
			     },
			draw : function () {}
		};

		
    });
	
	it("FireBalls draw", function(){
		 
		Game = {width: 320, height: 480};
		var theFireBall = new FireBall(20, 30, 0, true);
		
		spyOn(SpriteSheet, "draw"); 
		theFireBall.draw(ctx)
			 
		expect(SpriteSheet.draw).toHaveBeenCalled();
		expect(SpriteSheet.draw.calls[0].args[0]).toEqual(ctx);
		expect(SpriteSheet.draw.calls[0].args[1]).toEqual('fireball_1');
		expect(SpriteSheet.draw.calls[0].args[2]).toEqual(theFireBall.x);
		expect(SpriteSheet.draw.calls[0].args[3]).toEqual(theFireBall.y);
		//expect(SpriteSheet.draw.calls[0].args[4]).toEqual(1);
	});
	
	it("FireBalls step", function(){
		 
		Game = {width: 320, height: 480};
		var fireball_l = new FireBall(20, 30, 0, true);
		
		var dummyfireball=function(){
			this.remove = function () {}
			//this.collide= function() {}
		};
		
		fireball_l.board= new dummyfireball();
		var old_x= fireball_l.x;
		var old_y= fireball_l.y;
		spyOn(fireball_l.board, "remove")
		fireball_l.step(1);
		
		expect(fireball_l.board.remove).toHaveBeenCalled();
		expect(fireball_l.y).toBe(old_y+ fireball_l.vy*1);
		expect(fireball_l.x).toBe(old_x+ fireball_l.vx*1);
		expect(fireball_l.vy).toBe(-630);
		
	});
	
});
