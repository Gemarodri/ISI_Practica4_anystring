/*

  Requisitos: 

  La nave del usuario disparará 2 misiles si está pulsada la tecla de
  espacio y ha pasado el tiempo de recarga del arma.

  El arma tendrá un tiempo de recarga de 0,25s, no pudiéndose enviar
  dos nuevos misiles antes de que pasen 0,25s desde que se enviaron
  los anteriores



  Especificación:

  - Hay que añadir a la variable sprites la especificación del sprite
    missile

  - Cada vez que el usuario presione la tecla de espacio se añadirán
    misiles al tablero de juego en la posición en la que esté la nave
    del usuario. En el código de la clase PlayerSip es donde tienen
    que añadirse los misiles

  - La clase PlayerMissile es la que implementa los misiles. Es
    importante que la creación de los misiles sea poco costosa pues va
    a haber muchos disparos, para lo cual se declararán los métodos de
    la clase en el prototipo

*/
describe("PlayerMissile", function(){
	
	var canvas, ctx;

    beforeEach(function(){
		loadFixtures('index.html');

		canvas = $('#game')[0];
		expect(canvas).toExist();

		ctx = canvas.getContext('2d');
		expect(ctx).toBeDefined();
    });
	
	it(" Playermyissile draw", function(){
	
		SpriteSheet = {
			map : {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 }},
			draw : function () {}
		}
		 
		Game = {width: 320, height: 480};
 
		Mymissile = new PlayerMissile(20,30);
		
		spyOn(SpriteSheet, "draw"); 
		
		Mymissile.draw(ctx)
			 
		expect(SpriteSheet.draw).toHaveBeenCalled();
		expect(SpriteSheet.draw.calls[0].args[0]).toEqual(ctx);
		expect(SpriteSheet.draw.calls[0].args[1]).toEqual("missile");
		expect(SpriteSheet.draw.calls[0].args[2]).toEqual(Mymissile.x);
		expect(SpriteSheet.draw.calls[0].args[3]).toEqual(Mymissile.y);

	});
	it(" Playermyissile step", function(){
	
		//func = {
		//	remove : function () {}
		//}
		var dummyEnemy= function(){
			this.remove = function () {}
			this.collide= function () {}		
		}
 
		Mymissile = new PlayerMissile(20,30);
		Mymissile.board= new dummyEnemy();
		
		spyOn(Mymissile.board,"remove");
		//Mymissile.board=func;
		
		Mymissile.step(10) 
		expect(Mymissile.board.remove).toHaveBeenCalled();
	});
	
	
});
