/*

El objetivo de este prototipo es a�adir al juego naves enemigas.


Especificaci�n: 

1. El patr�n de movimiento lo dictan las ecuaciones que se utilizar�n
para calcular las componentes vx e vy de su velocidad.  Los par�metros
de las ecuaciones que definen vx e vy determinan el patr�n de
comportamiento: 

  vx = A + B * sin (C * t + D) 
  vy = E + F * sin (G * t + H)

  siendo t la edad de un enemigo, calculada como el tiempo que ha
  pasado desde que se cre�.

  A: componente constante de la velocidad horizontal
  B: fuerza de la velocidad horizontal sinusoidal
  C: periodo de la velocidad horizontal sinusoidal
  D: desplazamiento en el tiempo de la velocidad horizontal sinusoidal

  E: componente constante de la velocidad vertical
  F: fuerza de la velocidad vertical sinusoidal
  G: periodo de la velocidad vertical sinusoidal
  H: desplazamiento en el tiempo de la velocidad vertical sinusoidal

  Todos estos par�metros tendr�n un valor por defecto de 0 (definido
  en la variable baseParameters en el constructor)


2. Se crear� una nueva clase Enemy. Los enemigos se diferenciar�n s�lo
en su posici�n inicial, en el sprite que utilizan y en el patr�n de
movimiento (A..H), pero todos ser�n de la misma clase.

Para definir diferentes tipos de enemigos se pasar� al constructor una
plantilla con valores para las propiedades (x, y, sprite, A..H).

Para poder definir enemigos parecidos creados a partir de una misma
plantilla, se pasar� un segundo argumento al constructor con valores
alternativos para algunas de las propiedades de la plantilla.


*/

