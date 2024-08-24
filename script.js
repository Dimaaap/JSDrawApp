const myCanvas = document.getElementById("myCanvas");

const canvasProperties = {
    width: window.innerWidth,
    height: window.innerHeight,
    center: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    }
}

myCanvas.height = canvasProperties.height;
myCanvas.width = canvasProperties.width;

const stageProperties = {
    width: 600,
    height: 480,
    left: canvasProperties.center.x - 600 / 2,
    right: canvasProperties.center.y - 480 / 2
}

const ctx = myCanvas.getContext("2d");
clearCanvas();


 
const shapes = [];
let path = [];
let rectangle = {};


myCanvas.addEventListener("pointerdown", (e) => {
    const mousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };
    rectangle.corner1 = mousePosition

    const moveCallback = (e) => {
        const mousePosition = {
            x: e.offsetX,
            y: e.offsetY
        };
        rectangle.corner2 = mousePosition;

        clearCanvas();
        for(const shape of [...shapes, rectangle]){
            ctx.beginPath();
            ctx.strokeStyle="rgba(0, 0, 0, 0.5)";
            ctx.lineWidth = 5;
            const rect = shape;
            const minX = Math.min(rect.corner1.x, rect.corner2.x);
            const minY = Math.min(rect.corner1.y, rect.corner2.y);
            const width = Math.abs(rect.corner1.x - rect.corner2.x);
            const height = Math.abs(rect.corner1.y - rect.corner2.y);
            ctx.rect(minX, minY, width, height)
            ctx.stroke();
        }
    }

    const upCallback = e => {
        myCanvas.removeEventListener("pointermove", moveCallback);
        myCanvas.removeEventListener("pointerup", upCallback);
        
        shapes.push(rectangle);
        rectangle = {};

    }

    myCanvas.addEventListener("pointermove", moveCallback)
    myCanvas.addEventListener("pointerup", upCallback)
})


function clearCanvas(){
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

    ctx.fillStyle = "white";
    ctx.fillRect(stageProperties.left, stageProperties.right, 
        stageProperties.width, stageProperties.height);
}