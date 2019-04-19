<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title> FlappyMan </title>
    <script type="text/javascript" src="phaser.min.js"></script>
    <script type="text/javascript" src="main.js"></script>
    <link rel="stylesheet" href="main.css">
    <link rel="stylesheet" href="animate.css">
    <link href="https://fonts.googleapis.com/css?family=Luckiest+Guy" rel="stylesheet">
</head>

<body style="display: flex; justify-content: center; margin-top: 20vh;">



    <div id='menu'>
    <embed src="assets/intro.mp3" id="son" autostart="true" loop="false" hidden="true" volume="10">
        <div class="titre jackInTheBox animated">
            <h1>Flappyman</h1>
        </div>
        <div class='button' id="button" onclick='play()'><br>
            <p>Play</p>
        </div>

        <div class="score">
        </div>

        <img class="sup zoomInLeft animated" src="assets/superman.png">
    </div>
    
    <!--    !!!!!     NE FONCTIONNE QUE SUR UN SERVEUR      !!!!!            -->


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.ui.min.js"></script>

</body>

</html>