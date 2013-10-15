// El objeto principal del juego será un singleton Game

// Requisitos: 
// 
// Inicializar el juego
// Ejecutar el bucle de animación
// Proporcionar un mecanismo para cambiar lo que se muestra en la pantalla.
// Gestionar la entrada para controlar la nave del jugador


describe("Game singleton", function(){

    var canvas, ctx;

    var sprites, startGame;

    beforeEach(function(){
	loadFixtures('index.html');
	
	sprites = {
	    ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 },
	};
	startGame = function() {
	    SpriteSheet.draw(Game.ctx,"ship",0,0);
	    SpriteSheet.draw(Game.ctx,"missile",150,50);
	    SpriteSheet.draw(Game.ctx,"missile",155,50);
	    SpriteSheet.draw(Game.ctx,"missile",160,50);
	    SpriteSheet.draw(Game.ctx,"enemy_purple",100,50);
	    SpriteSheet.draw(Game.ctx,"enemy_bee",150,100);
	    SpriteSheet.draw(Game.ctx,"enemy_ship",150,150);
	    SpriteSheet.draw(Game.ctx,"enemy_circle",150,200);
	}
    });



    it("Game.initialize()", function(){

	spyOn(Game, "setupInput");
	spyOn(Game, "loop");
	spyOn(SpriteSheet, "load");

	Game.initialize("game",sprites,startGame);

	waits(100);

	runs(function(){
	    expect(Game.setupInput).toHaveBeenCalled();
	    expect(Game.loop).toHaveBeenCalled();
	    expect(SpriteSheet.load).toHaveBeenCalled();
	});
    });


    it("Game.setupInput()", function(){

	Game.initialize("game",sprites,startGame);

	expect( $(window) ).toHandle('keydown');
	expect( $(window) ).toHandle('keyup');

	var e = jQuery.Event("keydown");
	e.which = 37; // left
	$(window).trigger(e);
	expect(Game.keys['left']).toBeTruthy();

 	e = jQuery.Event("keyup");
 	e.which = 37; // left
 	$(window).trigger(e);
 	expect(Game.keys['left']).toBeFalsy();

	e = jQuery.Event("keydown");
	e.which = 39; // right
	$(window).trigger(e);
	expect(Game.keys['right']).toBeTruthy();

 	e = jQuery.Event("keyup");
 	e.which = 39; // right 
 	$(window).trigger(e);
 	expect(Game.keys['right']).toBeFalsy();

	e = jQuery.Event("keydown");
	e.which = 32; // space (fire)
	$(window).trigger(e);
	expect(Game.keys['fire']).toBeTruthy();

 	e = jQuery.Event("keyup");
 	e.which = 32; // space (fire)
 	$(window).trigger(e);
 	expect(Game.keys['fire']).toBeFalsy();

    });


    it("Game.loop()", function(){
	// Queremos espiar loop, pero necesitamos que se ejecute loop,
        // pues necesitamos en este test que se produzcan sus
        // efectos. Por ello llamamos a .andCallThrough()
	spyOn(Game, "loop").andCallThrough();
	
	Game.initialize("game",sprites,startGame);	

	// Prueba a reducir el número de milisegundos de espera, hasta
	// que falle
	waits(300)

	runs(function(){
	    expect(Game.loop.calls.length).toBeGreaterThan(10);
	});
    });

    it("Game.setBoard", function(){
	// Piensa como probar setBoard

    });

});

