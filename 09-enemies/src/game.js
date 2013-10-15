var sprites = {
    ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 },
    missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
    enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
    enemy_bee: { sx: 79, sy: 0, w: 37, h: 43, frames: 1 },
    enemy_ship: { sx: 116, sy: 0, w: 42, h: 43, frames: 1 },
    enemy_circle: { sx: 158, sy: 0, w: 32, h: 33, frames: 1 }
};


var enemies = {
    // B, C y E substituirán a los valores por defecto definidos en la
    // variable baseParameters del constructor Enemy(). Ver
    // comentarios en el código del constructor al final del fichero.
    basic: { x: 100, y: -50, sprite: 'enemy_purple', B: 100, C: 2 , E: 100 }

};


var startGame = function() {
    Game.setBoard(0,new Starfield(20,0.4,100,true))
    Game.setBoard(1,new Starfield(50,0.6,100))
    Game.setBoard(2,new Starfield(100,1.0,50));
    Game.setBoard(3,new TitleScreen("Alien Invasion", 
                                    "Press fire to start playing",
                                    playGame));
}


var playGame = function() {
    var board = new GameBoard();

    // Se añade un enemigo con las propiedades definidas en enemies.basic
    board.add(new Enemy(enemies.basic));
    // Se añade un enemigo con las propiedades definidas en
    // enemies.basic, pero con la propiedad x = 200 definida en el
    // segundo argumento de la llamada al constructor. Ver comentarios en el
    // constructor Enemy al final de este fichero.
    board.add(new Enemy(enemies.basic, { x: 200 }));

    board.add(new PlayerShip());
    Game.setBoard(3,board);
}



// Si se construye con clear==true no se pintan estrellas con fondo
// transparente, sino fondo en negro
var Starfield = function(speed,opacity,numStars,clear) {

    // Creamos un objeto canvas, no visible en la página Web
    var stars = $('<canvas/>')
	.attr('width', Game.width)
	.attr('height', Game.height)[0];
    // Sin jQuery lo hacemos asi:
    //    var stars = document.createElement("canvas");
    //    stars.width = Game.width; 
    //    stars.height = Game.height;


    var starCtx = stars.getContext("2d");

    var offset = 0;

    // Si la opción clear está activada, el fondo del canvas se pinta
    // de negro. Utilizado en el nivel mas profundo de estrellas
    if(clear) {
	starCtx.fillStyle = "#000";
	starCtx.fillRect(0,0,stars.width,stars.height);
    }

    // Dibujamos las estrellas blancas sobre el canvas no visible,
    // como rectángulos de 2 pixeles en posiciones aleatorias
    starCtx.fillStyle = "#FFF";
    starCtx.globalAlpha = opacity; // nivel de transparencia de las estrellas
    for(var i=0;i<numStars;i++) {
	starCtx.fillRect(Math.floor(Math.random()*stars.width),
			 Math.floor(Math.random()*stars.height),
			 2,
			 2);
    }

    // Se llama a este método en cada frame de la animación para dibujar
    // el campo de estrellas en la pantalla
    this.draw = function(ctx) {
	var intOffset = Math.floor(offset);
	var remaining = stars.height - intOffset;

	// Dibujar sobre el contexto ctx la parte de arriba del canvas con
	// las estrellas
	if(intOffset > 0) {
	    ctx.drawImage(stars,
			  0, remaining,
			  stars.width, intOffset,
			  0, 0,
			  stars.width, intOffset);
	}

	// Dibujar sobre el contexto ctx la parte inferior del canvas con
	// las estrellas
	if(remaining > 0) {
	    ctx.drawImage(stars,
			  0, 0,
			  stars.width, remaining,
			  0, intOffset,
			  stars.width, remaining);
	}
    }

    // En cada paso de la animación, movemos el campo de estrellas
    // modificando el offset según la cantidad de tiempo transcurrida
    this.step = function(dt) {
	offset += dt * speed; // velocidad = espacio / tiempo
	offset = offset % stars.height;
    }
}


// La clase PlayerShip tambien ofrece la interfaz step(), draw() para
// poder ser dibujada desde el bucle principal del juego
var PlayerShip = function() { 
    this.w =  SpriteSheet.map['ship'].w;
    this.h =  SpriteSheet.map['ship'].h;
    this.x = Game.width/2 - this.w / 2;
    this.y = Game.height - 10 - this.h;
    this.vx = 0;

    this.reloadTime = 0.25;  // Un cuarto de segundo para poder volver a disparar
    this.reload = this.reloadTime;

    this.maxVel = 200;

    this.step = function(dt) {
	if(Game.keys['left']) { this.vx = -this.maxVel; }
	else if(Game.keys['right']) { this.vx = this.maxVel; }
	else { this.vx = 0; }

	this.x += this.vx * dt;

	if(this.x < 0) { this.x = 0; }
	else if(this.x > Game.width - this.w) { 
	    this.x = Game.width - this.w 
	}

	this.reload-=dt;
	if(Game.keys['fire'] && this.reload < 0) {
	    // Esta pulsada la tecla de disparo y ya ha pasado el tiempo reload
	    Game.keys['fire'] = false;
	    this.reload = this.reloadTime;

	    // Se añaden al gameboard 2 misiles 
	    this.board.add(new PlayerMissile(this.x,this.y+this.h/2));
	    this.board.add(new PlayerMissile(this.x+this.w,this.y+this.h/2));
	}
    }

    this.draw = function(ctx) {
	SpriteSheet.draw(ctx,'ship',this.x,this.y,0);
    }
}

// Constructor los misiles.
// Los metodos de esta clase los añadimos a su prototipo. De esta
// forma solo existe una copia de cada uno para todos los misiles, y
// no una copia para cada objeto misil
var PlayerMissile = function(x,y) {
    this.w = SpriteSheet.map['missile'].w;
    this.h = SpriteSheet.map['missile'].h;
    this.x = x - this.w/2; 

    this.y = y - this.h; 
    this.vy = -700;
};

PlayerMissile.prototype.step = function(dt)  {
    this.y += this.vy * dt;
    if(this.y < -this.h) { this.board.remove(this); }
};

PlayerMissile.prototype.draw = function(ctx)  {
    SpriteSheet.draw(ctx,'missile',this.x,this.y);
};



// Constructor para las naves enemigas. Un enemigo se define mediante
// un conjunto de propiedades provenientes de 3 sitios distintos, que
// se aplican  este orden:
// 1. baseParameters: variable del constructor con los valores por
//    omisión para las constantes A..H de las velocidades vx y vy
// 2. parámetros definidos en la plantilla blueprint que se pasa como
//    parámetro al crear el enemigo. Pueden modificar las propiedades
//    definidas en 1.
// 3. parámetros definidos en el parámetro override. Pueden modificar
// las propiedades definidas en 1 y 2.

// El código del constructor añade las propiedades en este orden al
// objeto que crea.

// Para definir un nuevo tipo de enemigo: se elige una plantilla
// existente o se crea una nueva, y se pasan opcionalmente en override
// valores alternativos para los parámetros de la plantilla o de
// baseParameters. Ver cómo se añaden 2 enemigos en la función
// playGame() de este fichero.

var Enemy = function(blueprint,override) {

    var baseParameters =  { A: 0, B: 0, C: 0, D: 0, 
                            E: 0, F: 0, G: 0, H: 0 }

    // Cada instancia tendrá las propiedades definidas en baseParameters
    for (var prop in baseParameters) {
	this[prop] = baseParameters[prop];
    }

    // Se copian los atributos definidos en el parámetro blueprint,
    // pudiendo modificar los definidos en baseParameters
    for (prop in blueprint) {
	this[prop] = blueprint[prop];
    }

    // Se copian los atributos definidos en el parámetro override,
    // pudiendo modificar los definidos en baseParameters y en
    // blueprint
    if(override) {
	for (prop in override) {
	    this[prop] = override[prop];
	}
    }

    // En el parámetro blueprint viene la propiedad sprite, que se ha
    // añadido más arriba a este objeto. A partir de this.sprite se
    // localizan en SpriteSheet.map las dimensiones:
    this.w = SpriteSheet.map[this.sprite].w;
    this.h = SpriteSheet.map[this.sprite].h;

    // Inicializa t, que es la edad de este enemigo
    this.t = 0;
}

Enemy.prototype.step = function(dt) {
    // Actualizamos la edad
    this.t += dt;

    // El patrón de movimiento lo dictan las ecuaciones que se utilizarán
    // para calcular las componentes x e y de su velocidad: vx e vy:
    
    // vx tiene una componente constante A, y otra que va variando
    // cíclicamente en función de la edad del enemigo (t), según la
    // sinuisoide definida por las constantes B, C y D.
    // A: componente constante de la velocidad horizontal
    // B: fuerza de la velocidad horizontal sinusoidal
    // C: periodo de la velocidad horizontal sinusoidal
    // D: desplazamiento en el tiempo de la velocidad horizontal sinusoidal
    this.vx = this.A + this.B * Math.sin(this.C * this.t + this.D);
    
    // vy tiene una componente constante E, y otra que va variando
    // cíclicamente en función de la edad del enemigo (t), según la
    // sinuisoide definida por las constantes F, G y H.
    // E: componente constante de la velocidad vertical
    // F: fuerza de la velocidad vertical sinusoidal
    // G: periodo de la velocidad vertical sinusoidal
    // H: desplazamiento en el tiempo de la velocidad vertical sinusoidal
    this.vy = this.E + this.F * Math.sin(this.G * this.t + this.H);

    this.x += this.vx * dt;
    this.y += this.vy * dt;

    if(this.y > Game.height ||
       this.x < -this.w||
       this.x > Game.width) {
	this.board.remove(this);
    }
}

// Metodo draw, que anadimos al prototipo para que cada instancia de
// Enemy no tenga una copia de el
Enemy.prototype.draw = function(ctx) {
    SpriteSheet.draw(ctx,this.sprite,this.x,this.y);
}



$(function() {
    Game.initialize("game",sprites,startGame);
});

