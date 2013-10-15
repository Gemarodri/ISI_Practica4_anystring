describe("Clase TitleScreen", function(){
    // Se deberá mostrar una pantalla de inicio o title screen que muestre
    // el nombre del juego e indicaciones para como comenzar a jugar

    // Estando en la pantalla de inicio, cuando se pulse la tecla
    // espacio comenzara el juego. No comenzara si la tecla espacio
    // estaba pulsada. En ese caso, hay que soltarla y pulsar de
    // nuevo.


    var canvas, ctx;

    beforeEach(function(){
	loadFixtures('index.html');

	canvas = $('#game')[0];
	expect(canvas).toExist();

	ctx = canvas.getContext('2d');
	expect(ctx).toBeDefined();

    });


    it("draw", function(){
	spyOn(ctx, "fillText");

	var titulo = "titulo";
	var subtitulo = "subtitulo";
	var ts1 = new TitleScreen(titulo, subtitulo);
	
	ts1.draw(ctx);
	
 	expect(ctx.fillText.calls[0].args[0]).toEqual(titulo);
  	expect(ctx.fillText.calls[1].args[0]).toEqual(subtitulo);

    });


    it("step", function(){
	spyOn(ctx, "fillText");

	foo = {
	    callback: function() {
	    }
	};
	spyOn(foo, "callback");

	var titulo = "titulo";
	var subtitulo = "subtitulo";
	var ts1 = new TitleScreen(titulo, subtitulo, foo.callback);

	// mock para Game: se asegura de que pulsamos y no estaba pulsada...
	Game = {keys: {'fire': false}};
 	ts1.step(); 
	Game = {keys: {'fire': true}};
 	ts1.step(); 
	
	expect(foo.callback).toHaveBeenCalled();

    });

});

