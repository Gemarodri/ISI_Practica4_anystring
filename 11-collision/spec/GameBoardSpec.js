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
