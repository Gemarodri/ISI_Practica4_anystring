describe("Sprite Specs",function(){
    beforeEach(function(){
	    	loadFixtures('index.html');	
	    	canvas = $('#game')[0];
	    	expect(canvas).toExist();	
	    	ctx = canvas.getContext('2d');
	    	expect(ctx).toBeDefined();
        });
    SpriteSheet={
    		map:{
    		    ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 },
    		    missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
    		    fireball_1: { sx: 0, sy: 64, w: 64, h: 64, frames: 1 },
    		    enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 }
    		}
    };
    
    it("PlayerShip",function(){
    	var aShip = new PlayerShip(100,100);
    	expect(aShip.draw).toBeDefined();
    	expect(aShip.reload).toBe(0.25);
    	expect(aShip.reload2).toBe(1);
    	expect(aShip.reloadTime).toBe(0.25);
    	expect(aShip.reloadTime2).toBe(1);
    	expect(aShip.x).toBe(141.5);
    	expect(aShip.y).toBe(428);
    	expect(aShip.w).toBe(37);
    	expect(aShip.h).toBe(42);
    	expect(aShip.x).toBe(141.5);
    	expect(aShip.y).toBe(428);
    	expect(aShip.vx).toBe(0);
    	expect(aShip.maxVel).toBe(200);
    });
    
    it("PlayerMissile",function(){
    	var aMissile = new PlayerMissile(100,100);
    	expect(aMissile.draw).toBeDefined();
    	expect(aMissile.x).toBe(101);
    	expect(aMissile.y).toBe(110);
    	expect(aMissile.w).toBe(2);
    	expect(aMissile.h).toBe(10);
    	expect(aMissile.vy).toBe(-700);    	
    });
    
    it("FireBall",function(){
    	var aFireBall = new FireBall(100,100,0,true);
    	expect(aFireBall.draw).toBeDefined();
    	expect(aFireBall.x).toBe(68);
    	expect(aFireBall.y).toBe(36);
    	expect(aFireBall.w).toBe(64);
    	expect(aFireBall.h).toBe(64);
    	expect(aFireBall.vx).toBe(-30);
    	expect(aFireBall.vx).toBe(-30);
    	expect(aFireBall.frame).toBe(2);
    	expect(aFireBall.dir_l).toBe(true);
    	
    });
    it("Enemy",function(){
    	var aEnemy = new Enemy({x: 100, y: -50, sprite: 'enemy_purple', B: 100, C: 4, E: 100});
    	expect(aEnemy.draw).toBeDefined();
    	expect(aEnemy.x).toBe(100);
    	expect(aEnemy.y).toBe(-50);
    	expect(aEnemy.w).toBe(42);
    	expect(aEnemy.h).toBe(43);
    	expect(aEnemy.B).toBe(100);
    	expect(aEnemy.C).toBe(4);
    	expect(aEnemy.E).toBe(100);
    	
    	
    });
});
