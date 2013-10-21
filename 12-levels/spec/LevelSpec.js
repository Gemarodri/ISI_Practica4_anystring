/*

  Requisitos:

    El objetivo de este prototipo es añadir niveles al juego. En cada
    nivel deberán ir apareciendo baterías de enemigos según avanza el
    tiempo.

    Cada nivel termina cuando no quedan enemigos por crear en ninguno
    de sus niveles, y cuando todos los enemigos del nivel han
    desaparecido del tablero de juegos (eliminados por misiles/bolas
    de fuego o desaparecidos por la parte de abajo de la pantalla).

    Cuando terminan todos los niveles sin que la nave haya colisionado
    termina el juego, ganando el jugador.

    Cuando la nave del jugador colisiona con un enemigo debe terminar
    el juego, perdiendo el jugador.


  Especificación:

    El constructor Level() recibirá como argumentos la definición del
    nivel y la función callback a la que llamar cuando termine el
    nivel.

    La definición del nivel tiene este formato:
      [ 
        [ parametros de bateria de enemigos ] , 
        [ parametros de bateria de enemigos ] , 
        ... 
      ]


      Los parámetros de cada batería de enemigos son estos:
             Comienzo (ms),  Fin (ms),   Frecuencia (ms),  Tipo,    Override
   Ejemplo:
           [ 0,              4000,       500,              'step',  { x: 100 } ]


    Cada vez que se llame al método step() del nivel éste comprobará:

      - si ha llegado ya el momento de añadir nuevos sprites de alguna
        de las baterías de enemigos.
    
      - si hay que eliminar alguna batería del nivel porque ya ha
        pasado la ventana de tiempo durante la que hay tiene que crear
        enemigos

      - si hay que terminar porque no quedan baterías de enemigos en
        el nivel ni enemigos en el tablero de juegos.

*/

describe("Pruebas unitarias de Level", function(){

  var OBJECT_PLAYER        =  1,
	OBJECT_PLAYER_PROJECTILE =  2,
	OBJECT_ENEMY             =  4,
	OBJECT_ENEMY_PROJECTILE  =  8,
	OBJECT_POWERUP           = 16;
	
	var canvas, ctx;

    	beforeEach(function(){
		loadFixtures('index.html');

		canvas = $('#game')[0];
		expect(canvas).toExist();

		ctx = canvas.getContext('2d');
		expect(ctx).toBeDefined();
    	});

  it("Prueba del primer metodo de Level", function(){
    
    var sprites = {
    enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
    };

    var enemies = {
    ltr:      { x: 0,   y: -100, sprite: 'enemy_purple', health: 10, 
		B: 75, C: 1, E: 100  },
    };

    var level1 = [
  //  Comienzo, Fin,   Frecuencia,  Tipo,       Override
    [ 0,        4000,  500,         'ltr'                 ],
    ];

    var remove = [];
    var callback = function(){};
    var nivel = new Level(level1,callback);
    spyOn (nivel, "callback");

    expect(nivel.callback).toHaveBeenCalled();
  });

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
