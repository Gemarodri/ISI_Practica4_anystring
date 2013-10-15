describe ("Fichero index.html para el juego", function(){
    beforeEach(function(){
	loadFixtures('index.html');
    });

    it("incluye jQuery", function(){
	expect($).toBeDefined();
    });

    it("contiene div", function(){
	expect( $("div#container") ).toExist();
    });

    it("contiene canvas de tamano 320x480", function(){
	expect( $("#container") ).toContain("canvas#game");
	expect( $("canvas#game") ).toHaveAttr('width', '320');
	expect( $("canvas#game") ).toHaveAttr('height', '480');
    });

});


describe("Codigo que manipula el canvas en game.js", function(){

    var canvas, ctx;

    beforeEach(function(){
	loadFixtures('index.html');

	canvas = $('#game')[0];
	expect(canvas).toExist();

	ctx = canvas.getContext('2d');
	expect(ctx).toBeDefined();
    });

});

describe("Objeto singleton SpriteSheet", function(){
    //
    // El objeto singleton SpriteSheet de engine.js gestionara la hoja
    // de sprites (spritesheet).
    // 
    // 1. Pondrá en un objeto usado como un map/hash las
    // localizaciones en la hoja de cada sprite para que sea mas facil
    // mostrarlos en la pantalla 
    //
    // 2. Oculta/encapsula la gestión de la llamada a la callback
    // onload para que sea más fácil gestionar la carga de la hoja de
    // sprites desde los clientes de SpriteSheet

    // Para testar, añadimos en src/ enlace a engine.js Añadimos a
    // SpecRunner.html referencia a este fichero engine.js, y
    // eliminamos referencia a game.js, pues en este prototipo sólo
    // queremos testar le nuevo singleton

    var canvas, ctx;

    beforeEach(function(){
	loadFixtures('index.html');

	canvas = $('#game')[0];
	expect(canvas).toExist();

	ctx = canvas.getContext('2d');
	expect(ctx).toBeDefined();
    });


    it("SpriteSheet.load()", function(){

	spyOn(SpriteSheet, "load");

	expect(SpriteSheet).toBeDefined();

	SpriteSheet.load({
		ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 }
	}, function() {
	    // sólo queremos probar si carga, ponemos callback vacía
	});
	
	waits(100);

	runs(function(){
	    expect(SpriteSheet.load).toHaveBeenCalled();
	});
    });

    it("SpriteSheet.draw()", function(){
	spyOn(ctx, "drawImage");

	SpriteSheet.load({
	    ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 }
	}, function() {
	    SpriteSheet.draw(ctx,"ship",0,0);
	    SpriteSheet.draw(ctx,"ship",100,50);
	    SpriteSheet.draw(ctx,"ship",150,100);
	});
	
	waits(100);

	runs(function(){
	    expect(ctx.drawImage.calls.length).toEqual(3);
 	    expect(ctx.drawImage.calls[0].args[1]).toBe(0);
 	    expect(ctx.drawImage.calls[0].args[2]).toBe(0);
 	    expect(ctx.drawImage.calls[0].args[3]).toBe(37);
 	    expect(ctx.drawImage.calls[0].args[4]).toBe(42);
 	    expect(ctx.drawImage.calls[0].args[5]).toBe(0);
 	    expect(ctx.drawImage.calls[0].args[6]).toBe(0);
 	    expect(ctx.drawImage.calls[0].args[7]).toBe(37);
 	    expect(ctx.drawImage.calls[0].args[8]).toBe(42);

 	    expect(ctx.drawImage.calls[1].args[1]).toBe(0);
 	    expect(ctx.drawImage.calls[1].args[2]).toBe(0);
 	    expect(ctx.drawImage.calls[1].args[3]).toBe(37);
 	    expect(ctx.drawImage.calls[1].args[4]).toBe(42);
 	    expect(ctx.drawImage.calls[1].args[5]).toBe(100);
 	    expect(ctx.drawImage.calls[1].args[6]).toBe(50);
 	    expect(ctx.drawImage.calls[1].args[7]).toBe(37);
 	    expect(ctx.drawImage.calls[1].args[8]).toBe(42);

 	    expect(ctx.drawImage.calls[2].args[1]).toBe(0);
 	    expect(ctx.drawImage.calls[2].args[2]).toBe(0);
 	    expect(ctx.drawImage.calls[2].args[3]).toBe(37);
 	    expect(ctx.drawImage.calls[2].args[4]).toBe(42);
 	    expect(ctx.drawImage.calls[2].args[5]).toBe(150);
 	    expect(ctx.drawImage.calls[2].args[6]).toBe(100);
 	    expect(ctx.drawImage.calls[2].args[7]).toBe(37);
 	    expect(ctx.drawImage.calls[2].args[8]).toBe(42);
	});
    });
});

