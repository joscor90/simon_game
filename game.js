gamePattern = [] //Aquí se almacena la secuencia del juego.
userClickedPattern = [];  //Aquí se almacenan los colores que presiona el usuario.
buttonColors = ["red", "blue", "green", "yellow"];  //Arreglo con los colores usados en el juego.

function nextSequence () {   //Función a cargo de generar la secuencia del juego.
    userClickedPattern = [];
    level++
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);   //Este codigo genera un número aleatorio entre 0 y 3.
    var randomChosenColor = buttonColors[randomNumber]; //Selecciona un color al azar del arreglo buttonColors.
    gamePattern.push(randomChosenColor); //Se agrega el color seleccionado al azar al arreglo gamePattern.
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100); //animación "flash" para el color elegido al azar.
    playSound(randomChosenColor); //sonido correspondiente del color elegido.
    
   
    
}

$(".btn").on("click", function () {  //Función para detectar a qué botón se le hizo click.
    var userChosenColor = $(this).attr("id");  //Almacenamiento de la id del botón clickeado en una variable.
    userClickedPattern.push(userChosenColor);  //Se añade el color clickeado por el usuario al arreglo correspondiente.
    playSound(userChosenColor);  //sonido al color correspondiente elegido por el usuario.
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length -1); // esta es la última posición del array.
    
});

function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor) {
        $("#"+currentColor).addClass("pressed");       // Añade clase pressed y luego de 100 ms se remueve.
        setTimeout(function () {                         //Se remueve la clase pressed usando setTimeOut().
            $("#"+currentColor).removeClass("pressed"); 

        }, 100) 
}

var level = 0
var started = false;
$(document).on("keydown", function (event) {     //Para confirmar si se ha presionado una tecla.
        if (started===false) {     //Esto permite comenzar el juego
            nextSequence();
            started = true;   //esto hace que la función nextSequence se llame una vez cuando presione una tecla.
        }
});

function checkAnswer(currentLevel) {
        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
            console.log("Success!");
            if (userClickedPattern.length === gamePattern.length) {
             setTimeout(function () {                         
                nextSequence(); 
    
            }, 1000) }
        } else {
            playSound("wrong");
            $("h1").text("Game Over - Press a Key to Start Again");
            $("body").addClass("game-over");
            setTimeout(function () {                        
                $("body").removeClass("game-over"); 
    
            }, 200);
            startOver();
        }
    }

function startOver() {
    level = 0;
    started = false;
    gamePattern = []
}

