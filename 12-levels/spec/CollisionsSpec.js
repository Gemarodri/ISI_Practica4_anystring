/*

  Requisitos:

  El objetivo de este prototipo es que se detecten colisiones entre
  varios tipos de sprites:
  
  - Los misiles tienen ahora una nueva propiedad: el da�o (damage) que
    producen cuando colisionan con una nave enemiga. Cuando un misil
    colisione con una nave enemiga le infligir� un da�o de cierta
    cuant�a a la nave enemiga con la que impacta, y desaparecer�.

  - Las naves enemigas tienen ahora una nueva propiedad: su salud
    (health).  El da�o ocasionado a una nave enemiga por un misil har�
    que disminuya la salud de la nave enemiga, y cuando llegue a cero,
    la nave enemiga desaparecer�.

  - cuando una nave enemiga colisione con la nave del jugador, deber�
    desaparecer tanto la nave enemiga como la nave del jugador.



  Especificaci�n:

  En el prototipo 07-gameboard se a�adi� el constructor GameBoard. El
  m�todo overlap() de los objetos creados con GameBoard() ofrece
  funcionalidad para comprobar si los rect�ngulos que circunscriben a
  los sprites que se le pasan como par�metros tienen intersecci�n no
  nula. El m�todo collide() de GameBoard utiliza overlap() para
  detectar si el objeto que se le pasa como primer par�metro ha
  colisionado con alg�n objeto del tipo que se le pasa como segundo
  par�metro.

  En este prototipo se utilizar� el m�todo collide() para detectar los
  siguientes tipos de colisiones:

    a) detectar si un misil disparado por la nave del jugador
       colisiona con una nave enemiga

    b) detectar si una nave enemiga colisiona con la nave del jugador


  En el m�todo step() de los objetos creados con PlayerMissile() y
  Enemy(), tras "moverse" a su nueva posici�n calculada, se comprobar�
  si han colisionado con alg�n objeto del tipo correspondiente. 

  No interesa comprobar si se colisiona con cualquier otro objeto,
  sino s�lo con los de ciertos tipos. El misil tiene que comprobar si
  colisiona con enemigos. El enemigo tiene que comprobar si colisiona
  con la nave del jugador. Para ello cada sprite tiene un tipo y
  cuando se comprueba si un sprite ha colisionado con otros, se pasa
  como segundo argumento a collide() el tipo de sprites con los que se
  quiere ver si ha colisionado el objeto que se pasa como primer
  argumento.

  Cuando un objeto detecta que ha colisionado con otro llama al m�todo
  hit() del objeto con el que ha colisionado. El misil cuando llama a
  hit() de una nave enemiga pasa como par�metro el da�o que provoca
  para que la nave enemiga pueda calcular la reducci�n de salud que
  conlleva la colisi�n.


  Efectos de las colisiones:

  Cuando una nave enemiga recibe la llamada .hit() realizada por un
  misil que ha detectado la colisi�n, recalcula su salud reduci�ndola
  en tantas unidades como el da�o del misil indique, y si su salud
  llega a 0 desaparece del tablero de juegos, produci�ndose en su
  lugar la animaci�n de una explosi�n.

  Cuando la nave del jugador recibe la llamada .hit() realizada por
  una nave enemiga que ha detectado la colisi�n, desaparece.

  El misil, tras informar llamando al m�tod hit() de la nave enemiga
  con la que ha detectado colisi�n, desaparece.

  La nave enemiga, tras informar llamando a hit() de la nave del
  jugador, desaparece.

*/
  

describe("Pruebas de integraci�n. Prototipo 11.", function(){
	
  var OBJECT_PLAYER        =  1,
	OBJECT_PLAYER_PROJECTILE =  2,
	OBJECT_ENEMY             =  4,
	OBJECT_ENEMY_PROJECTILE  =  8,
	OBJECT_POWERUP           = 16;
	
	var canvas, ctx;

	var oldGame=Game;


    	beforeEach(function(){
		loadFixtures('index.html');

		canvas = $('#game')[0];
		expect(canvas).toExist();

		ctx = canvas.getContext('2d');
		expect(ctx).toBeDefined();

		oldGame=Game;
		
    	});

	afterEach(function(){
		Game=oldGame;	
	});


    	


	it("Misil colisionando con nave enemiga", function(){

		SpriteSheet.map = {
                                        missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
                                        enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
                                        explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 },
                };

		var game = new GameBoard();
		var enemigo = new Enemy(enemies.basic);
		var misil = new PlayerMissile(100,0);
		
		misil.x = 10;
		misil.y = 10;
		enemigo.x = 10;
		enemigo.y = 10;

		enemigo.damage = 10;
		enemigo.health = 5;


		game.add(misil);
		game.add(enemigo);
		
		expect(game.objects.length).toEqual(2);
		game.step(0.0000001);
		

		expect(game.objects[0].sprite).toEqual("explosion");
		expect(game.objects[1]).toEqual(undefined);
	});

	it("Misil colisionando con nave enemiga con da�o insuficiente.", function(){

		SpriteSheet.map = {
                                        missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
                                        enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
                                        explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 },
                };

		var game = new GameBoard();
		var enemigo = new Enemy(enemies.basic);
		var misil = new PlayerMissile(100,0);
		
		misil.x = 10;
		misil.y = 10;
		enemigo.x = 10;
		enemigo.y = 10;

		enemigo.damage = misil.damage;
		enemigo.health = 15;


		game.add(misil);
		game.add(enemigo);
		
		expect(game.objects.length).toEqual(2);
		game.step(0.0000001);
		

		expect(game.objects[0].sprite).toEqual("enemy_purple");
		expect(game.objects[1]).toEqual(undefined);
	});


  it ("Bola de fuego colisionando con nave enemiga",function(){


    SpriteSheet.map = {
                                        enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
                                        explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 },
                                        fireball_1: { sx: 0, sy: 64, w: 64, h: 64, frames: 1 },
                };

		var game = new GameBoard();
		var enemigo = new Enemy(enemies.basic);
    var bola = new FireBall(95,-50,0,true);
    bola.x = 10;
    bola.y = 10;
    enemigo.x = 10;
    enemigo.y = 10;
    enemigo.damage = bola.damage;
		enemigo.health = 15;
		game.add(bola);
		game.add(enemigo);
    game.step(0.0000001);

    expect(game.objects[0].sprite).toEqual("fireball_1");
    expect(game.objects[1].sprite).toEqual("explosion");
    expect(game.objects[2]).toEqual(undefined);
    });

  it ("Nave colisionando con nave enemiga",function(){


    SpriteSheet.map = {
                                        enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
                                        explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 },
                                        ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 }                                      
                };

		var game = new GameBoard();
		var enemigo = new Enemy(enemies.basic);
    var nave = new PlayerShip();
    enemigo.x = 10;
    enemigo.y = 10;
    nave.x = 10;
    nave.y = 10;
		game.add(nave);
		game.add(enemigo);

    game.step(0.0000001);

    expect(game.objects[0].sprite).toEqual('explosion');

    });

});
