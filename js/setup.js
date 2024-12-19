function preload_image(url) {
    var img=new Image();
    img.src=url;
    return img
}

let slots = [
    //row 1
    {
        startX: 33,
        startY: 133,
        endX: 135,
        endY: 235,
        button: 0
    },
    {
        startX: 184,
        startY: 133,
        endX: 285,
        endY: 235,
        button: 0
    },
    {
        startX: 334,
        startY: 133,
        endX: 435,
        endY: 235,
        button: 0
    },
    {
        startX: 468,
        startY: 133,
        endX: 570,
        endY: 235,
        button: 0
    },
    //row 2
    {
        startX: 33,
        startY: 248,
        endX: 135,
        endY: 350,
        button: 0
    },
    {
        startX: 184,
        startY: 248,
        endX: 285,
        endY: 350,
        button: 0
    },
    {
        startX: 334,
        startY: 248,
        endX: 435,
        endY: 350,
        button: 0
    },
    //row 3
    {
        startX: 33,
        startY: 364,
        endX: 135,
        endY: 465,
        button: 0
    },
    {
        startX: 184,
        startY: 364,
        endX: 285,
        endY: 465,
        button: 0
    },
    {
        startX: 334,
        startY: 364,
        endX: 435,
        endY: 465,
        button: 0
    }
]

let button0 = preload_image("img/0.png");
let button1 = preload_image("img/1.png");
let button2 = preload_image("img/2.png");
let button3 = preload_image("img/3.png");
let button4 = preload_image("img/4.png");
let button5 = preload_image("img/5.png");
let button6 = preload_image("img/6.png");
let button7 = preload_image("img/7.png");
let button8 = preload_image("img/8.png");
let button9 = preload_image("img/9.png");
let pin_screen = preload_image("img/pin-screen-fix.png");
let button_images = [ button0, button1, button2, button3, button4, button5, button6, button7, button8, button9 ]

