var prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 100
    
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id= "capture_img" src= '+data_uri+'>';
    });
}

console.log("ml5 version", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/vwtx-z79W/model.json", modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded!");
}

function speak()
{
    var synth = window.speechSynthesis;
    var speak_data = "The prediction is"+prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById("capture_img");
    classifier.classify(img, gotResults);
}

function gotResults(error, results)
{
    if (error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        document.getElementById("hand_gesture_name_result").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "amazing")
        {
            document.getElementById("emoji_result").innerHTML = "&#128076;";
            document.getElementById("message").innerHTML = "This is looking amazing";
        }

        if(results[0].label == "best")
        {
            document.getElementById("emoji_result").innerHTML = "&#128077;";
            document.getElementById("message").innerHTML = "All The Best";
        }

        if(results[0].label == "victory")
        {
            document.getElementById("emoji_result").innerHTML = "&#9996;";
            document.getElementById("message").innerHTML = "That was a marvelous victory";
        }
    }
}