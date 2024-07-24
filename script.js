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

const ctx = myCanvas.getContext("2d");
ctx.fillStyle = "gray";
ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

const stageProperties = {
    width: 600,
    height: 480,
    left: canvasProperties.center.x - 600 / 2,
    right: canvasProperties.center.y - 480 / 2
}

ctx.fillStyle = "white";
ctx.fillRect(stageProperties.left, stageProperties.right, 
    stageProperties.width, stageProperties.height);
 
const path = [];



myCanvas.addEventListener("pointerdown", (e) => {
    const mousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };
    path.push(mousePosition);
    myCanvas.addEventListener("pointermove", (e) => {
        const mousePosition = {
            x: e.offsetX,
            y: e.offsetY
        }
        path.push(mousePosition);
    })
    myCanvas.addEventListener("pointerup", (e) => {
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        path.forEach((point) => {
            ctx.lineTo(point.x, point.y);
        });
        ctx.stroke();
    })
})
