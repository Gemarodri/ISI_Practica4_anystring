describe("Clase PlayerShip", function(){
    // Una vez comenzado el juego deberá aparecer la nave del jugador en
    // la parte inferior

    // La nave debera moverse a izquierda y derecha con las teclas de las
    // flechas izda y dcha

    var canvas, ctx;

    beforeEach(function(){
	loadFixtures('index.html');

	canvas = $('#game')[0];
	expect(canvas).toExist();

	ctx = canvas.getContext('2d');
	expect(ctx).toBeDefined();

    });



    it("draw", function(){
	// Comprobamos que draw llama a SpriteSheet.draw con los
	// parametros adecuados
	spyOn(SpriteSheet, "draw");

	// Necesitamos tener Game.width y Game.height para que el
	// constructor de PlayerShip pueda inicializar x e y
	Game = {width: 320, height: 480};

	var miNave = new PlayerShip();

	miNave.draw();

	expect(SpriteSheet.draw).toHaveBeenCalled();
 	expect(SpriteSheet.draw.calls[0].args[1]).toEqual("ship");
 	expect(SpriteSheet.draw.calls[0].args[2]).toEqual(miNave.x);
 	expect(SpriteSheet.draw.calls[0].args[3]).toEqual(miNave.y);
 	expect(SpriteSheet.draw.calls[0].args[4]).toEqual(0);
	
    });


    it("step sin teclas pulsadas", function(){
	// Escribe tests para la clase PlayerShip
	// Deberian comprobar que:

	// 2. Tras llamar a step sin haber pulsado teclas la nave se
	// muestra en el mismo lugar

	// 3. Tras llamar a step con una flecha pulsada, se actualiza
	// la posicion de la nave


	// Necesitamos tener Game.width y Game.height para que el
	// constructor de PlayerShip pueda inicializar x e y.  Y
	// necesitamos Geame.keys para saber si se ha pulsado una
	// tecla
	Game = {width: 320, height: 480, keys: {'left': false}};
	
	// Creamos un PlayerShip para testar
	var miNave = new PlayerShip();	

 	miNave.step(1); // Hacemos como que ha pasado 1 segundo
	// Tras step, con Game.keys['left'] == false, no debe haberse movido,
        // por lo que lo comparamos con la posición x inicial de PlayerShip
	expect(miNave.x).toEqual(Game.width/2 - miNave.w / 2);


    });


    it("step con tecla left pulsada", function(){
	// 3. Tras llamar a step con una flecha pulsada, se actualiza
	// la posicion de la nave


	// Hacemos que se pulse la tecla left:
	Game = {width: 320, height: 480, keys: {'left': true}};

	// Creamos un PlayerShip para testar
	var miNave = new PlayerShip();

	// Tras el siguiente step debería moverse a la izquierda a
	// esta posición:
	function xNueva(dt) {
	    var vxNueva = -miNave.maxVel;
	    var xNueva =  miNave.x + vxNueva * dt;
	    if (xNueva < 0) xNueva = 0;
	    return xNueva;
	}

	var dt = 1;
 	miNave.step(dt); // Hacemos como que ha pasado 1 segundo
	// Tras step, con Game.keys['left'] == true, debe haberse
	// movido a la izquierda. Con dt==1s la nueva x es < 0 => se
	// queda en 0
	expect(xNueva(dt)).toEqual(0);
	expect(miNave.x).toEqual(xNueva(dt));

	var dt = 0.1;
 	miNave.step(dt); // Hacemos como que ha pasado 1 segundo
	// Tras step, con Game.keys['left'] == true, debe haberse
	// movido a la izquierda
	expect(miNave.x).toEqual(xNueva(dt));


    });



});

