let canvas = document.getElementById("pin-canvas");
let ctx = canvas.getContext("2d");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function shuffleButtons() {
    let left = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
    for(let i = 0; i < 10; i++) {
        slots[i].button = left.splice(getRandomInt(left.length), 1)[0];
    }
}
shuffleButtons()

function failsafe() {
    if(state == State.SUCCESS || state == State.FAIL) {
        state = State.DIGIT_1;
        pin_current = "";
        return true;
    }
    return false;
}

document.addEventListener("keydown", (event) => {
    if(failsafe()) return;

    let valid = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let active_tag = document.activeElement.tagName;

    if(active_tag == "INPUT" || valid.indexOf(event.key) == -1) return;

    press_button(event.key);
});

canvas.addEventListener('click', (event) => {
    if(failsafe()) return;

    let x = event.clientX - canvas.offsetLeft;
    let y = event.clientY - canvas.offsetTop;

    slots.forEach((slot) => {
        if(
            x >= slot.startX && x <= slot.endX &&
            y >= slot.startY && y <= slot.endY
        ) {
            press_button(slot.button)
        }
    });
});

let pin_current = "";

const State = {
    NO_CHARACTER: {
        status_message: "No character selected."
    },
    DIGIT_1: {
        status_message: "Enter your FIRST digit."
    },
    DIGIT_2: {
        status_message: "Enter your SECOND digit."
    },
    DIGIT_3: {
        status_message: "Enter your THIRD digit."
    },
    DIGIT_4: {
        status_message: "Enter your FINAL digit."
    },
    SUCCESS: {
        status_message: "Pin Correct!"
    },
    FAIL: {
        status_message: "Wrong pin!"
    }
}

let state = State.NO_CHARACTER;

async function press_button(button) {
    pin_current += button;
    if(state == State.DIGIT_1) {
        state = State.DIGIT_2;
    } else if(state == State.DIGIT_2) {
        state = State.DIGIT_3;
    } else if(state == State.DIGIT_3) {
        state = State.DIGIT_4;
    } else if(state == State.DIGIT_4) {
        let hashed = await digest({message: pin_current});
        console.log();
        if(hashed === pin) state = State.SUCCESS;
        else state = State.FAIL;
    }
    shuffleButtons();
}

let searchParams = new URL(window.location).searchParams;
let name = searchParams.get("name");
let pin = searchParams.get("pin");

if(name != null && pin != null) {
    state = State.DIGIT_1;
}

document.getElementById("setup-bookmark-open").onclick = async () => {
    let character_name = document.getElementById("setup-bookmark-name").value;
    let character_pin = document.getElementById("setup-bookmark-pin").value;

    let current = new URL(window.location);
    current.searchParams.append("name", character_name);
    current.searchParams.append("pin", await digest({message: character_pin}));
    window.open(current);
};

function drawLoop() {
    ctx.drawImage(pin_screen, 0, 0, canvas.clientWidth, canvas.clientHeight);
    if(state !== State.NO_CHARACTER && state !== State.SUCCESS && state !== State.FAIL) {
        slots.forEach((slot) => {
            ctx.drawImage(button_images[slot.button], slot.startX, slot.startY, (slot.endX - slot.startX) + 1, (slot.endY - slot.startY) + 1);
        });
    }

    ctx.font = "40px Runescape";
    ctx.fillStyle = "white";
    function drawStatusText(message) {
        let measured = ctx.measureText(message);
        ctx.fillText(message, canvas.clientWidth / 2 - measured.width / 2, 100);
    }

    function drawTopLeftText(message) {
        ctx.font = "35px Runescape"
        let measured = ctx.measureText(message);
        ctx.fillText(message, 15, 37);
    }

    drawStatusText(state.status_message);

    if(name != null && pin != null) {
        drawTopLeftText(`Logged in as ${name}`)
    }

    requestAnimationFrame(drawLoop);
}
drawLoop();
