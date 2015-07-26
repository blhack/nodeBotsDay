var five = require("johnny-five");
var board = new five.Board();
var motors;
var ws;
var f;
var r;

var WebSocketServer = require('ws').Server, wss = new WebSocketServer({port: 6969});

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
		stop: stop,
		spin: spin,
		stopSpin: stopSpin
  });

  motors.speed(255);
	motors.stop();

	f = five.Pin(2);
	r = five.Pin(3);
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

function spin() {
	f.high();
}

function stopSpin() {
	f.low();
	r.low();
}

function reverseSpin() {
	r.high();
}


wss.on('connection', function(ws) {
   ws.on('message', function(message) {
	 	if (message == "forward") {
			forward();
		}
		if (message == "backward") {
			backward();
		}
		if (message == "left") {
			left();
		}
		if (message == "right") {
			right();
		}
		if (message == "stop") {
			stop();
		}
		if (message == "spin") {
			spin();
		}
		if (message == "stopSpin") {
			stopSpin();
		}
		if (message == "reverseSpin") {
			reverseSpin();
		}


	 console.log(message);
   }); 
});
