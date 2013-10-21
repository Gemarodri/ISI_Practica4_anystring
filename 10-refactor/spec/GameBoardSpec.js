/*


En el anterior prototipo, el objeto Game permite gestionar una pila de
tableros (boards). Los tres campos de estrellas, la pantalla de inicio
y el sprite de la nave del jugador se añaden como tableros
independientes para que Game pueda ejecutar sus métodos step() y
draw() periódicamente desde su método loop(). Sin embargo los tableros
no pueden interaccionar entre sí. Resulta difícil con esta
arquitectura pensar en cómo podría por ejemplo detectarse la colisión
de una nave enemiga con la nave del jugador, o cómo podría detectarse
si un disparo de colisiona con una nave.

Este es precisamente el requisito que se ha identificado para este
prototipo: gestionar la interacción entre los elementos del
juego. Piensa en esta clase como un tablero de juegos de mesa, sobre
el que se disponen los elementos del juego (fichas, cartas, etc.). En
este caso serán naves enemigas, nave del jugador y disparos los
elementos del juego. Para Game, GameBoard será un tablero más, por lo
que deberá ofrecer los métodos step() y draw(), y será responsable de
mostrar todos los objetos que contenga cuando Game llame a estos
métodos.



Especificación: GameBoard debe

- mantener una colección de objetos a la que se pueden añadir y de la
  que se pueden eliminar sprites

- interacción con Game: cuando reciba los métodos step() y draw() debe
  ocuparse de que se ejecuten estos métodos en todos los objetos que
  contenga.

- debe detectar la colisión entre objetos. Querremos que los disparos
  de la nave del jugador detecten cuándo colisionan con una nave
  enemiga, que una nave enemiga detecte si colisiona con la nave del
  jugador, que un disparo de la nave enemiga detecte si colisiona con
  la nave del jugador,... necesitamos saber de qué tipo es cada objeto.


*/
describe("GameBoard", function(){
	
	var canvas, ctx;

    beforeEach(function(){
	loadFixtures('index.html');

	canvas = $('#game')[0];
	expect(canvas).toExist();

	ctx = canvas.getContext('2d');
	expect(ctx).toBeDefined();

    });

	var game= new GameBoard();
	it("GameBoard add", function(){
		expect(game.add("5")).toEqual(game.objects[0]);
	});

	it("GameBoard removed", function(){
		game.resetRemoved();
		game.remove("5");
		expect("5").toEqual(game.removed[0]);
		game.finalizeRemoved("5");
		expect(game.objects).toEqual([]);
	});
	it("GameBoard overlap", function(){
		 var object= function (x, y, w, h){
			this.x=x;
			this.y=y;
			this.w=w;
			this.h=h;
		};
		var object1= new object(10,11,3,4);
		var object2= new object(10,10,3,4);
		var object3= new object (7,8,3,10);
		expect(game.overlap(object1,object2)).toBe(true);
		expect(game.overlap(object1,object3)).toBe(false);
	});	

	it("GameBoard step", function(){
		spyOn(game, "step");
		game.step("5");
			expect(game.step).toHaveBeenCalled();	
	});
	
	it("GameBoard draw", function(){
		spyOn(game, "draw");
		game.draw("ctx");
		expect(game.draw).toHaveBeenCalled();
	});
	it("GameBoard collide", function(){
		 var object= function ( x, y, w, h, type){
			this.type=type;
			this.x=x;
			this.y=y;
			this.w=w;
			this.h=h;
		};
		var object1= new object(10,11,3,4, "1");
		var object3= new object(10,10,3,4, "2");
		var object2= new object( 7, 8, 3, 10);
		
		spyOn(game, "collide");
		
		expect(game.collide(object2)).toBe(game.objects[2]);
		expect(game.collide(object2,"1")).toBeFalsy();
	});
	
	it("GameBoard underscore iterate", function(){
		var dummy1= {
			step: function(){},
		};
		var dummy2= {
			step: function(){},
		};
		
		game.add(dummy1);
		game.add(dummy2);
		
		spyOn(dummy1,"step");
		spyOn(dummy2,"step");
		
		game.iterate("step", 1.0);
		waits(100);
        runs(function(){
			expect(dummy1.step).toHaveBeenCalled();
			expect(dummy2.step).toHaveBeenCalled();
        });
	});
	it("GameBoard detect", function(){
		
		var dummy1= {
			call: function(){},
		};
		var dummy2= {
			call: function(){},
		};	
		game.add(dummy1);
		game.add(dummy2);
		spyOn(dummy1, "call"); 
		spyOn(dummy2, "call");
        game.detect(dummy1,dummy2);
        waits(100);
        runs(function(){
			expect(game.objects[0]).toBeTruthy();
			expect(game.objects[1]).toBeTruthy();
        });
		
	});
});
