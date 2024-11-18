let myCanvas = document.getElementById("myCanvas");
let canvas = myCanvas.getContext("2d");
myCanvas.addEventListener("click", onDrawClicked);


function onDrawClicked(event) {
    let x = event.x;
    let y = event.y;

    drawRectangle(x, y, 50, 50);

}


function onCalculateClicked() {

    let xElement = document.getElementById("xPoint");
    let x = +xElement.value;

    let yElement = document.getElementById("yPoint");
    let y = +yElement.value;

    let ribAElement = document.getElementById("ribA");
    let ribA = +ribAElement.value;

    let ribBElement = document.getElementById("ribB");
    let ribB = +ribBElement.value;

    try {

        resetFields();
        validateInput(x, y, ribA, ribB);
        drawRectangle(x, y, ribA, ribB);

        let squareArea = document.getElementById("paragraghSquareArea");
        squareArea.innerHTML = "The square area is: " + calculateSquareArea(ribA, ribB);

    } catch (err) {

        let errorMessage = document.getElementById("paragraghError");
        errorMessage.innerHTML = err.message;

    }

}


function calculateSquareArea(ribA, ribB) {
    let squareArea = ribA * ribB;
    return squareArea;
}


function onClearClicked() {
    canvas.clearRect(0, 0, 800, 600);
}


function resetFields() {
    cleanError("xPoint");
    cleanError("yPoint");
    cleanError("ribA");
    cleanError("ribB");
    cleanErrorMessage();
    cleanSquareArea();
}


function cleanSquareArea() {
    let squareArea = document.getElementById("paragraghSquareArea");
    squareArea.innerHTML = "";
}


function cleanErrorMessage() {
    let errorMessage = document.getElementById("paragraghError");
    errorMessage.innerHTML = "";
}


function cleanError(id) {
    let nodeElement = document.getElementById(id);
    nodeElement.style.border = "";
}


function showError(id) {
    let nodeElement = document.getElementById(id);
    nodeElement.style.border = "2px solid red";
}


function validateInput(x, y, ribA, ribB) {
    let message = "";

    if (isEmptyField(x)) {
        message = "x-point field is empty<br>";
        showError("xPoint");
    } else if (!isValidX(x)) {
        message = "x-point must be between 1 and 800<br>";
        showError("xPoint");
    }

    if (isEmptyField(y)) {
        message = message + "y-point field is empty<br>";
        showError("yPoint");
    } else if (!isValidY(y)) {
        message = message + "y-point field must be between 1 and 600<br>";
        showError("yPoint");
    }


    if (isEmptyField(ribA)) {
        message = message + "rib-a field is empty<br>";
        showError("ribA");
    } else if (!isValidRib(ribA)) {
        message = message + "rib-a field must be positive<br>";
        showError("ribA");
    }


    if (isEmptyField(ribB)) {
        message = message + "rib-b field is empty<br>";
        showError("ribB");
    } else if (!isValidRib(ribB)) {
        message = message + "rib-b must be positive<br>";
        showError("ribB");
    } else if (!isInLimit(x, y, ribA, ribB)) {
        message = "please reenter x-point, y-point, rib-a and rib-b because your rectangle is exceed";
        showError("xPoint");
        showError("yPoint");
        showError("ribA");
        showError("ribB");
    }

    if (message != "") {
        throw new Error(message);
    }
}


function isEmptyField(id) {
    if (id == "" || id == null) {
        return true;
    }
    return false;
}


function isValidX(x) {
    if (x > 800 || x < 0) {
        return false;
    }
    return true;
}


function isValidY(y) {
    if (y > 600 || y < 0) {
        return false;
    }
    return true;
}


function isValidRib(rib) {
    if (rib <= 0) {
        return false;
    }
    return true;
}


function isInLimit(x, y, ribA, ribB) {
    if (x + ribA > 800) {
        return false;
    }
    if (y + ribB > 600) {
        return false;
    }
    return true;
}


function drawRectangle(x, y, ribA, ribB) {
    canvas.beginPath();
    canvas.rect(x, y, ribA, ribB);
    canvas.strokeStyle = randomColor();
    canvas.stroke();
}


function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}


function start(){
    let x = Math.trunc(Math.random() * 601);
    let y = Math.trunc(Math.random() * 801);
    let ribA = Math.trunc(Math.random() * 101);
    let ribB = Math.trunc(Math.random() * 101);

    function draw() {
        setTimeout(function(){ 
            drawRectangle(x,y,ribA,ribB); 
        }, 1000);
    }
draw();
}

start();