var io = io();
var json;
var tickinterval;
var bombtime = 0;
var flashing = false;
var audio = new Audio();
var isPlaying = false;

io.on("update", function(status) {
    json = JSON.parse(status);
    if (typeof json.extra == "undefined") return;

    $(".name").html('Waiting to put C4...');

    bombtime = json.extra.round.bomb.timestart;
	
    if(!tickinterval) {
        tickinterval = setInterval(tick, 300);
    }

});

function tick() {
    if (typeof json.extra == "undefined") return;

    var btime = json.extra.round.bomb.maxTime - parseInt(new Date().getTime() / 1000 - bombtime);
	
	if (btime == 35 && isPlaying == false) {
		isPlaying = true;
		audio.src = '35.mp3';
		audio.play();
	}
	else if (btime == 30 && isPlaying == false) {
		isPlaying = true;
		audio.src = '30.mp3';
		audio.play();
	}
	else if (btime == 25 && isPlaying == false) {
		isPlaying = true;
		audio.src = '25.mp3';
		audio.play();
	}
	else if (btime == 20 && isPlaying == false) {
		isPlaying = true;
		audio.src = '20.mp3';
		audio.play();
	}
	else if (btime == 15 && isPlaying == false) {
		isPlaying = true;
		audio.src = '15.mp3';
		audio.play();
	}
	else if (btime == 10 && isPlaying == false) {
		isPlaying = true;
		audio.src = '10.mp3';
		audio.play();
	}
	else if (btime == 5 && isPlaying == false) {
		isPlaying = true;
		audio.src = '5.mp3';
		audio.play();
	}
	else {
		switch(btime) {
			case 35:
			case 30:
			case 25:
			case 20:
			case 15:
			case 10:
			case 5:
				break;
			default:
				isPlaying = false;
		}
	}

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
