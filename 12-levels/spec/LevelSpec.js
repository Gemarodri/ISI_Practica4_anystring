/*

  Requisitos:

    El objetivo de este prototipo es a�adir niveles al juego. En cada
    nivel deber�n ir apareciendo bater�as de enemigos seg�n avanza el
    tiempo.

    Cada nivel termina cuando no quedan enemigos por crear en ninguno
    de sus niveles, y cuando todos los enemigos del nivel han
    desaparecido del tablero de juegos (eliminados por misiles/bolas
    de fuego o desaparecidos por la parte de abajo de la pantalla).

    Cuando terminan todos los niveles sin que la nave haya colisionado
    termina el juego, ganando el jugador.

    Cuando la nave del jugador colisiona con un enemigo debe terminar
    el juego, perdiendo el jugador.


  Especificaci�n:

    El constructor Level() recibir� como argumentos la definici�n del
    nivel y la funci�n callback a la que llamar cuando termine el
    nivel.

    La definici�n del nivel tiene este formato:
      [ 
        [ parametros de bateria de enemigos ] , 
        [ parametros de bateria de enemigos ] , 
        ... 
      ]


      Los par�metros de cada bater�a de enemigos son estos:
             Comienzo (ms),  Fin (ms),   Frecuencia (ms),  Tipo,    Override
   Ejemplo:
           [ 0,              4000,       500,              'step',  { x: 100 } ]


    Cada vez que se llame al m�todo step() del nivel �ste comprobar�:

      - si ha llegado ya el momento de a�adir nuevos sprites de alguna
        de las bater�as de enemigos.
    
      - si hay que eliminar alguna bater�a del nivel porque ya ha
        pasado la ventana de tiempo durante la que hay tiene que crear
        enemigos

      - si hay que terminar porque no quedan bater�as de enemigos en
        el nivel ni enemigos en el tablero de juegos.

*/

describe("Level", function(){

	
	var canvas, ctx;
	var oldGame, oldSpriteSheet;

    	beforeEach(function(){
			loadFixtures('index.html');
	
			canvas = $('#game')[0];
			expect(canvas).toExist();
	
			ctx = canvas.getContext('2d');
			expect(ctx).toBeDefined();
			oldGame = Game;
			oldSpriteSheet = SpriteSheet;
    	});
    	
    	afterEach(function(){
    		Game = oldGame;
    		SpriteSheet = oldSpriteSheet;
    	})


	describe("Pruebas unitarias. Prototipo 12.", function(){
	
		it("Level.step().", function(){
	
				SpriteSheet.map = {
			                                missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
			                                enemy_ship: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
			                                explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 }
			        };
		
				var enemies = {
		   			straight: { x: 0,   y: -50, sprite: 'enemy_ship', health: 10, 
					E: 100 }
				};
			
				var level1 = [
					[ 17800,    20000, 500,         'straight', { x: 50  } ]
				];
				var game = new GameBoard();
				var callback = function(){return false;};
	
				var nivel = new Level(level1,callback);
				nivel.levelData = level1;
				nivel.callback = callback;
				nivel.t = 0;
				nivel.board = game;
				nivel.step(18);
	
				expect(game.objects.length).toEqual(1);
		
		});
	
	});
	
	describe("Pruebas de Integracion.",function(){
		
		it("Level 1. La nave no colisiona y el nivel pasa.",function(){
			Game.initialize("game",sprites,startGame);
		});
		
		it("Level 1. La nave colisiona y el nivel no pasa.",function(){
			
		});
		
	});
});
