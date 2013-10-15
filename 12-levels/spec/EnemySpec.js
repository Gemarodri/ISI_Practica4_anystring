/*

El objetivo de este prototipo es añadir al juego naves enemigas.


Especificación: 

1. El patrón de movimiento lo dictan las ecuaciones que se utilizarán
para calcular las componentes vx e vy de su velocidad.  Los parámetros
de las ecuaciones que definen vx e vy determinan el patrón de
comportamiento: 

  vx = A + B * sin (C * t + D) 
  vy = E + F * sin (G * t + H)

  siendo t la edad de un enemigo, calculada como el tiempo que ha
  pasado desde que se creó.

  A: componente constante de la velocidad horizontal
  B: fuerza de la velocidad horizontal sinusoidal
  C: periodo de la velocidad horizontal sinusoidal
  D: desplazamiento en el tiempo de la velocidad horizontal sinusoidal

  E: componente constante de la velocidad vertical
  F: fuerza de la velocidad vertical sinusoidal
  G: periodo de la velocidad vertical sinusoidal
  H: desplazamiento en el tiempo de la velocidad vertical sinusoidal

  Todos estos parámetros tendrán un valor por defecto de 0 (definido
  en la variable baseParameters en el constructor)


2. Se creará una nueva clase Enemy. Los enemigos se diferenciarán sólo
en su posición inicial, en el sprite que utilizan y en el patrón de
movimiento (A..H), pero todos serán de la misma clase.

Para definir diferentes tipos de enemigos se pasará al constructor una
plantilla con valores para las propiedades (x, y, sprite, A..H).

Para poder definir enemigos parecidos creados a partir de una misma
plantilla, se pasará un segundo argumento al constructor con valores
alternativos para algunas de las propiedades de la plantilla.


*/

