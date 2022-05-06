status = "";
objects = [];
song = "";

function setup() {
    canvas = createCanvas(600, 480);
    canvas.position(370,300);
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "status : detecting objects";
}
function modelLoaded() {
    console.log("Model loaded");
    status = true;
}
function preload() {
    song = loadSound("B87RGFJ-telephone-ringing.mp3");
}
function draw() {
    image(video, 0, 0, 600, 480);
    if (status != "") {
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
            label = objects[i].label;
            if (objects[i].label == "person") {
                document.getElementById("conclusion").innerHTML = "Baby found";
                song.stop();
            }
            else {
                document.getElementById("conclusion").innerHTML = "Baby not found";
                song.play();
                console.log("I am not in front of the camera");
            }
        //    if (objects.length == 0) {
        //         document.getElementById("status").innerHTML = "Status: object not detected";
        //         song.play();
        //     }
        }
    }
}
function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}
