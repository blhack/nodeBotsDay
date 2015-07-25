var five = require("johnny-five");
var board = new five.Board();

var motors;

board.on("ready", function() {
  // Johnny-Five provides pre-packages shield configurations!
  // http://johnny-five.io/api/motor/#pre-packaged-shield-configs
  motors = new five.Motors([
    five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M1,
    five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M2,
  ]);

  this.repl.inject({
    motors: motors,
		forward: forward,
		backward: backward,
		left: left,
		right: right,
		stop: stop
  });

  motors.speed(255);
	motors.stop();
});

function forward() {
	motors.fwd();
}

function backward() {
	motors.rev();
}

function left() {
	motors[0].fwd();
	motors[1].rev();
}

function right() {
	motors[0].rev();
	motors[1].fwd();
}

function stop() {
	motors.stop();
}
