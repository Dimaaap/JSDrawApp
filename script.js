const canvasProperties = {
    width: window.innerWidth,
    height: window.innerHeight,
    center: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    }
}

const stageProperties = {
    width: 600,
    height: 480, 
    left: canvasProperties.center.x-600/2,
    top: canvasProperties.center.y-480/2
}


myCanvas.width = canvasProperties.width;
myCanvas.height = canvasProperties.height;

const ctx = myCanvas.getContext("2d");

clearCanvas();

const shapes = [];
let currentShape = null;

const downCallbackForRect = function(e) {
   const mousePosition = {
            x: e.offsetX,
            y: e.offsetY
        };
        currentShape = new Rect(mousePosition, {
            fillColor: fillColor.value,
            strokeColor:strokeColor.value
        });

        const moveCallback = (e) => {
            const mousePosition = {
                x: e.offsetX,
                y: e.offsetY,
            };
            currentShape.setCorner2(mousePosition);

            clearCanvas();
            drawShapes([...shapes, currentShape]);
        }

        const upCallback = e => {
            myCanvas.removeEventListener("pointermove", moveCallback);
            myCanvas.removeEventListener("pointerup", upCallback);

            shapes.push(currentShape);
        }
        myCanvas.addEventListener("pointermove", moveCallback)
        myCanvas.addEventListener("pointerup", upCallback);
};

const downCallbackForPath = function(e) {
    const mousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };
    
    currentShape = new Path(mousePosition, {
        fillColor: fillColor.value,
        strokeColor: strokeColor.value
    });

    const moveCallback = (e) => {
        const mousePosition = {
            x: e.offsetX,
            y: e.offsetY,
        }
        currentShape.addPoint(mousePosition)

        clearCanvas();
        drawShapes([...shapes, currentShape]);
    }

    const upCallback = e => {
        myCanvas.removeEventListener("pointermove", moveCallback);
        myCanvas.removeEventListener("pointerup", upCallback);

        shapes.push(currentShape);
    }
    myCanvas.addEventListener("pointermove", moveCallback)
    myCanvas.addEventListener("pointerup", upCallback);
}

myCanvas.addEventListener("pointerdown", downCallbackForPath);

function changeTool(tool){
    myCanvas.removeEventListener("pointerdown", downCallbackForRect);
    myCanvas.removeEventListener("pointerdown", downCallbackForPath);

    switch(tool){
        case "rect":
            myCanvas.addEventListener("pointerdown", downCallbackForRect)
            break;
        case "path":
            myCanvas.addEventListener("pointerdown", downCallbackForPath)
            break;
    }
}

function drawShapes(shapes) {
    for(const shape of shapes ){
        shape.draw(ctx);
    }
}

function clearCanvas(){
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
   
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

    ctx.fillStyle = "white";
    ctx.fillRect(
        stageProperties.left, 
        stageProperties.top, 
        stageProperties.width, 
        stageProperties.height
    )
}