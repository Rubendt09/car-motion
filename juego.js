var fondo;
var carro;
var cursores;
var enemigos;
var timer;

var gasolinas;
var timerGasolina;

var puntaje = 0;
var vidas = 3;
var textoPuntaje;
var textoVidas;

var Juego = {
  preload: function(){
    juego.load.image('bg', 'img/bg.png');
    juego.load.image('carro', 'img/carro.png');
    juego.load.image('carroMalo', 'img/carroMalo.png');
    juego.load.image('gasolina', 'img/gas.png');
    juego.forceSingleUpdate = true;
  },

  create: function(){
    fondo = juego.add.tileSprite(0, 0, 290, 540, 'bg');

    carro = juego.add.sprite(juego.width / 2, 496, 'carro');
    carro.anchor.setTo(0.5);

    enemigos = juego.add.group();
    juego.physics.enable(enemigos, Phaser.Physics.ARCADE);
    enemigos.enableBody = true;
    enemigos.createMultiple(20, 'carroMalo');
    enemigos.setAll('anchor.x', 0.5);
    enemigos.setAll('anchor.y', 0.5);
    enemigos.setAll('outOfBoundsKill', true);
    enemigos.setAll('checkWorldBounds', true);

    gasolinas = juego.add.group();
    juego.physics.enable(gasolinas, Phaser.Physics.ARCADE);
    gasolinas.enableBody = true;
    gasolinas.createMultiple(20, 'gasolina');
    gasolinas.setAll('anchor.x', 0.5);
    gasolinas.setAll('anchor.y', 0.5);
    gasolinas.setAll('outOfBoundsKill', true);
    gasolinas.setAll('checkWorldBounds', true);

    timer = juego.time.events.loop(1500, this.crearCarroMalo, this);
    timerGasolina = juego.time.events.loop(2000, this.crearGasolina, this);

    cursores = juego.input.keyboard.createCursorKeys();

    textoPuntaje = juego.add.text(20, 20, 'Puntaje: 0', { fill: '#ffffff' });
    textoVidas = juego.add.text(juego.width - 120, 20, 'Vidas: 3', { fill: '#ffffff' });
  },

  update: function(){
    fondo.tilePosition.y += 3;

    juego.physics.arcade.collide(carro, enemigos, this.chocarEnemigo, null, this);
    juego.physics.arcade.collide(carro, gasolinas, this.cogerGasolina, null, this);

    if (cursores.right.isDown && carro.position.x < 245) {
      carro.position.x += 5;
    } else if (cursores.left.isDown && carro.position.x > 45) {
      carro.position.x -= 5;
    }
  },

  crearCarroMalo: function(){
    var posicion = Math.floor(Math.random() * 3) + 1;
    var enemigo = enemigos.getFirstDead();
    enemigo.physicsBodyType = Phaser.Physics.ARCADE;
    enemigo.reset(posicion * 73, 0);
    enemigo.body.velocity.y = 200;
    enemigo.anchor.setTo(0.5);
  },

  crearGasolina: function(){
    var posicion = Math.floor(Math.random() * 3) + 1;
    var gasolina = gasolinas.getFirstDead();
    gasolina.physicsBodyType = Phaser.Physics.ARCADE;
    gasolina.reset(posicion * 73, 0);
    gasolina.body.velocity.y = 200;
    gasolina.anchor.setTo(0.5);
  },

  cogerGasolina: function(carro, gasolina){
    gasolina.kill();
    puntaje += 10;
    textoPuntaje.text = 'Puntaje: ' + puntaje;
  },

  chocarEnemigo: function(carro, enemigo){
    enemigo.kill();
    vidas -= 1;
    textoVidas.text = 'Vidas: ' + vidas;
    if (vidas <= 0) {
        juego.paused = true;
        alert('¡Juego terminado!');
    }
  }
};
