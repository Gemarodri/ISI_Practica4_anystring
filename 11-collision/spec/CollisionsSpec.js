/*

  Requisitos:

  El objetivo de este prototipo es que se detecten colisiones entre
  varios tipos de sprites:
  
  - Los misiles tienen ahora una nueva propiedad: el daño (damage) que
    producen cuando colisionan con una nave enemiga. Cuando un misil
    colisione con una nave enemiga le infligirá un daño de cierta
    cuantía a la nave enemiga con la que impacta, y desaparecerá.

  - Las naves enemigas tienen ahora una nueva propiedad: su salud
    (health).  El daño ocasionado a una nave enemiga por un misil hará
    que disminuya la salud de la nave enemiga, y cuando llegue a cero,
    la nave enemiga desaparecerá.

  - cuando una nave enemiga colisione con la nave del jugador, deberá
    desaparecer tanto la nave enemiga como la nave del jugador.



  Especificación:

  En el prototipo 07-gameboard se añadió el constructor GameBoard. El
  método overlap() de los objetos creados con GameBoard() ofrece
  funcionalidad para comprobar si los rectángulos que circunscriben a
  los sprites que se le pasan como parámetros tienen intersección no
  nula. El método collide() de GameBoard utiliza overlap() para
  detectar si el objeto que se le pasa como primer parámetro ha
  colisionado con algún objeto del tipo que se le pasa como segundo
  parámetro.

  En este prototipo se utilizará el método collide() para detectar los
  siguientes tipos de colisiones:

    a) detectar si un misil disparado por la nave del jugador
       colisiona con una nave enemiga

    b) detectar si una nave enemiga colisiona con la nave del jugador


  En el método step() de los objetos creados con PlayerMissile() y
  Enemy(), tras "moverse" a su nueva posición calculada, se comprobará
  si han colisionado con algún objeto del tipo correspondiente. 

  No interesa comprobar si se colisiona con cualquier otro objeto,
  sino sólo con los de ciertos tipos. El misil tiene que comprobar si
  colisiona con enemigos. El enemigo tiene que comprobar si colisiona
  con la nave del jugador. Para ello cada sprite tiene un tipo y
  cuando se comprueba si un sprite ha colisionado con otros, se pasa
  como segundo argumento a collide() el tipo de sprites con los que se
  quiere ver si ha colisionado el objeto que se pasa como primer
  argumento.

  Cuando un objeto detecta que ha colisionado con otro llama al método
  hit() del objeto con el que ha colisionado. El misil cuando llama a
  hit() de una nave enemiga pasa como parámetro el daño que provoca
  para que la nave enemiga pueda calcular la reducción de salud que
  conlleva la colisión.


  Efectos de las colisiones:

  Cuando una nave enemiga recibe la llamada .hit() realizada por un
  misil que ha detectado la colisión, recalcula su salud reduciéndola
  en tantas unidades como el daño del misil indique, y si su salud
  llega a 0 desaparece del tablero de juegos, produciéndose en su
  lugar la animación de una explosión.

  Cuando la nave del jugador recibe la llamada .hit() realizada por
  una nave enemiga que ha detectado la colisión, desaparece.

  El misil, tras informar llamando al métod hit() de la nave enemiga
  con la que ha detectado colisión, desaparece.

  La nave enemiga, tras informar llamando a hit() de la nave del
  jugador, desaparece.

*/
