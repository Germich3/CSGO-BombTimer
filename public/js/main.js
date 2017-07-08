var io = io();
var json;

var tickinterval;

var bombtime = 0;

io.on("update", function(status) {
    json = JSON.parse(status);
    if (typeof json.extra == "undefined") return;

    $(".name").html('Waiting to put C4...');

    bombtime = json.extra.round.bomb.timestart;

    if(!tickinterval) {
        tickinterval = setInterval(tick, 300);
    }

});

var flashing = false;

function tick() {
    if (typeof json.extra == "undefined") return;

    var btime = json.extra.round.bomb.maxTime - parseInt(new Date().getTime() / 1000 - bombtime);

    if (json.extra.round.bomb.planted) {
        $(".time").html(btime);
        $(".time").css("font-size", "15em");
        $(".timelabel").html("Bomb Planted");
		$(".name").html('');
		
        if (btime < 0) {
            flashing = false;
        } else if (btime <= 5) {
            flash();
        } else if (btime <= 10) {
            $(".color").css('background-color', "red");
        } else {
            $(".color").css('background-color', 'orange');
        }
    } else {
		$(".timelabel").css("color", "black");
		$(".timelabel").css("font-size", "16pt");
		$(".timelabel").html("Bomb Time");
		$(".time").css("color", "black");
		$(".time").css("font-size", "7em");
		$(".time").html("40");
        $(".color").css('background-color', 'lightblue');
		$(".name").html('Waiting to put C4...');
		
		if (json.round.phase === 'over') {
			$(".timelabel").css("color", "white");
			$(".timelabel").css("font-size", "7em");
            $(".timelabel").html("Round");
			$(".time").css("color", "white");
			$(".time").css("font-size", "7em");
			$(".time").html("Over");
			$(".color").css('background-color', 'black');
        }
		
    }
}

function flash() {
    $(".color").css('background-color', function() {
        this.switch = !this.switch;
        return this.switch ? "red" : "orange";
    });
}
