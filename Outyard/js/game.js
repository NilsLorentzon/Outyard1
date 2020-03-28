//  debugger;

let windowWidth = 150;
let windowHeight = 200;
let win = window.open('about:blank', '_new', 'width='+windowWidth+',height='+windowHeight+"top=0,left=0");

win.document.body.style.margin = '0';
win.document.body.style.padding = '0';
winwidth = screen.width;
winheight = screen.height;
//let canvas = document.querySelector('#canvas');
let canvas = document.createElement('canvas');
canvas.style.width = '100%';
win.document.body.appendChild(canvas);
let ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

win.addEventListener('resize', function() {
  canvas.width = win.innerWidth;
  canvas.height = win.innerHeight;

  win.resizeTo(windowWidth, windowHeight);
});

//win.addEventListener("click", function(event) {
  // this.console.log(win.screenX,win.screenY);
//  this.console.log("gewl",event.PageY)
  // 1151 16
  // if ( win.screenX > )
//})

function uuid() {
	/*jshint bitwise:false */
	var i, random;
	var uuid = '';

	for (i = 0; i < 32; i++) {
		random = Math.random() * 16 | 0;
		if (i === 8 || i === 12 || i === 16 || i === 20) {
			uuid += '-';
		}
		uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
	}

	return uuid;
};

// event handler function
function handler(e) {
    e = e || window.event;

    var pageX = e.pageX;
    var pageY = e.pageY;

    // IE 8
    if (pageX === undefined) {
        pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    //clickX = pageX + win.screenX;
    //clickY = pageY + win.screenY;
    clickX = 85 + win.screenX;
    clickY = 70 + win.screenY;

    //console.log(pageX + win.screenX, pageY + win.screenY);
    console.log(pageX,pageY)
    virus.clickedOnCorona(clickX,clickY);
}

win.addEventListener("click", handler)






virus = {
    coronas : [],

    createCorona : function(x,y,size) {
        this.coronas.push({
            id: uuid(),
            size: size,
            positionX: x,
            positionY: y,
        })
    },

    deleteCorona : function(id) {
        index = this.getCoronaIndex(id);
        this.coronas.splice(index, 1);
    },

    getCoronaIndex : function(id) {
        var i = this.coronas.length;
        while (i--) {
            if (this.coronas[i].id === id) {
                return i;
            }
        }
    },

    generateRandom : function() {
        var x = Math.floor( 150 + (Math.random() * (screen.width - 280) ) );
        var y = Math.floor( 150 + (Math.random() * (screen.height - 280) ) );
        var size = Math.floor(Math.random() * 60) + 10;
        return [x,y,size];
    },

    clickedOnCorona : function(x,y) {
        for (var i = 0; i<virus.coronas.length; i++) {
            corona = virus.coronas[i];
            if ( Math.abs( (corona.positionX + corona.size/2) - x ) < corona.size/2 && Math.abs( (corona.positionY + corona.size/2) - y ) < corona.size/2) {
                console.log("clicked on corona")
                virus.deleteCorona(corona.id);
            }
        }
    }

}
for (var count = 0; count<10; count++) {
values = virus.generateRandom();
virus.createCorona(values[0],values[1],values[2]);
}
var background = new Image();
background.src = 'pictures/white.png';
background.onload = function() {
    start();
};

for (var corona = 0; corona < virus.coronas.length; corona++ ) {
    element = virus.coronas[corona];
    element.obj = new Image();
    element.obj.src = 'pictures/coronaPic.png';
}

var startTime = Date.now()/1000;
var wonGame = false;
var lostGame = false;
var wonDisp = 1000;
function start() {
    win.requestAnimationFrame(start);
    ctx.save();
    ctx.translate(-win.screenX, -win.screenY);
    ctx.drawImage(background, 0, 0, screen.width, screen.height);

    for (var corona = 0; corona < virus.coronas.length; corona++ ) {
        element = virus.coronas[corona];
        ctx.drawImage(element.obj, element.positionX, element.positionY, element.size, element.size);
    }
//    ctx.drawImage(virus.coronas[0].obj, 40, 40, 40,40);
    ctx.beginPath();
    ctx.arc(win.screenX + 85,win.screenY + 70,40,0,2*Math.PI);
    ctx.rect(winwidth, 0, -winwidth, winheight);
    ctx.fill();

    ctx.moveTo(win.screenX + 85, win.screenY);
    ctx.lineTo(win.screenX + 85, win.screenY + 65);
    ctx.moveTo(win.screenX + 85, win.screenY + 130);
    ctx.lineTo(win.screenX + 85, win.screenY + 75);
    ctx.moveTo(win.screenX + 35, win.screenY + 70);
    ctx.lineTo(win.screenX + 76, win.screenY + 70);
    ctx.moveTo(win.screenX + 148, win.screenY + 70);
    ctx.lineTo(win.screenX + 94, win.screenY + 70);
    ctx.lineWidth = 3
    ctx.stroke();
    ctx.font = "20px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Viruses to kill:  " + virus.coronas.length, win.screenX + canvas.width/2, win.screenY + canvas.height/2 - 45);
    elapsedTime = Math.floor(Date.now()/1000 - startTime);
    time = 60 - elapsedTime;
    if (!wonGame && !lostGame) {
        ctx.fillText("Time left:  " + time, win.screenX + canvas.width/2 - 2, win.screenY + canvas.height/2 + 62);
    }

    if (virus.coronas.length === 0 && time > 0 && lostGame === false) {
        wonGame = true;
    }

    if (virus.coronas.length > 0 && time <= 0 && wonGame === false) {
        lostGame = true;
    }

    if (wonGame) {
        ctx.font = "bold 30px Verdana";
        ctx.fillStyle = "Green";
        ctx.fillText("You Won!", win.screenX + canvas.width/2 - 2, win.screenY + canvas.height/2);
        if (wonDisp === 1000) {
            wonDisp = time;
        }
        ctx.font = "bold 12px Verdana";
        ctx.fillStyle = "Green";
        ctx.fillText("You had " + wonDisp + " seconds left", win.screenX + canvas.width/2 - 2, win.screenY + canvas.height/2 + 20);
    }

    if (lostGame) {
        ctx.font = "bold 30px Verdana";
        ctx.fillStyle = "red";
        ctx.fillText("You Lost!", win.screenX + canvas.width/2 - 2, win.screenY + canvas.height/2);
    }


    ctx.restore();

}