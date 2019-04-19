// !!!!!  ATTENTION PHASER NE FONCTIONNE QU'A PARTIR D'UN SERVEUR  !!!!!  //


function id(str) {
    return document.getElementById(str);
}

function play() {
    id('menu').classList.add('hidden');
}



var mainState = {
    preload: function () { // load image et son au chargement

        game.load.image('star', 'assets/star.png');
        game.load.image('cloud', 'assets/cloud.png');
        game.load.image('bird', 'assets/sup2.png');
        game.load.image('pipe', 'assets/bloc.jpg');
        game.load.image('cloud2', 'assets/cloud2.png');
        game.load.image('corbac', 'assets/corbac.png');
        game.load.image('fond', 'assets/fond.jpg');
        game.load.audio('jump', 'assets/jump.wav');
        game.load.audio('intro', 'assets/intro.mp3');
    },

    create: function () { // la physique de chaque éléments 

        game.stage.backgroundColor = '#011E60';

        game.physics.startSystem(Phaser.Physics.ARCADE); // lance le systeme physique de phaser

        game.add.sprite(0, 250, 'fond');

        this.bird = game.add.sprite(100, 245, 'bird'); // position du bird

        this.clouds = game.add.group();

        this.timer = game.time.events.loop(2000, this.addOneCloud, this);

        this.cloud2s = game.add.group();

        this.timer = game.time.events.loop(800, this.addOneCloud2, this);

        this.corbacs = game.add.group();

        this.timer = game.time.events.loop(1600, this.addOneCorbac, this);

        this.stars = game.add.group();

        this.timer = game.time.events.loop(1000, this.addOneStar, this);

        this.fonds = game.add.group();

        //      this.timer = game.time.events.loop(8000, this.addOneFond, this);          // loop fond

        //       game.physics.arcade.enable(this.corbac);    


        game.physics.arcade.enable(this.bird); // ajoute la physique du bird afin de lui assigner le mouvement/gravité/collision...

        this.bird.body.gravity.y = 800; // gravité du bird

        var spaceKey = game.input.keyboard.addKey( // commande la barre d'espace pour sauter
            Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        this.pipes = game.add.group(); // crée un groupe (feature de phaser) qui contient tous nos murs

        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this); // ajoute une rangée de murs toutes les 1,5secondes (1500)

        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", // style du score (emplacement, taille...)
            {
                font: "30px Arial",
                fill: "#ffffff"
            });

        this.bird.anchor.setTo(-0.2, 0.5); // place un nouveau centre (pour changer l'axe de rotation)

        this.jumpSound = game.add.audio('jump'); // son associé au jump

        this.introSound = game.add.audio('intro');
    },

    update: function () { // contient la logique du jeu

        if (this.bird.y < 0 || this.bird.y > 490) // si bird touche le plafond ou le sol: restart game
            this.restartGame();

        game.physics.arcade.overlap(
            this.bird, this.pipes, this.hitPipe, null, this); // si bird touche un mur, lance la fonction "hitpipe" (les murs s'arrètent et le bird tombe avant de restart)

        if (this.bird.angle < 10) // l'angle du bird augmente de 20°
            this.bird.angle += 1;
    },

    jump: function () {

        if (this.bird.alive == false) // empèche le saut quand le bird est mort
            return;

        this.bird.body.velocity.y = -250; // permet le mouvement verticale du bird

        var animation = game.add.tween(this.bird); // crée une animation au bird
        animation.to({
            angle: -10
        }, 100); // change l'angle -20° en 100 millisecondes
        animation.start(); // lance l'animation

        this.jumpSound.play(); // lance le son lors des sauts
    },


    addOneStar: function (x, y) { // fonction pour ajouter 1 mur

        var star = game.add.sprite(600, pos_y = Math.round(Math.random() * 500), 'star'); // crée un mur à la position x et y

        this.stars.add(star); // ajoute un mur

        game.physics.arcade.enable(star); // ajoute la physique du mur

        star.body.velocity.x = -260; // ajoute de la vélocité pour qu'il avance vers la gauche (-)

        star.checkWorldBounds = true; // le mur n'existe plus une fois sorti de l'écran
        star.outOfBoundsKill = true;
    },



    addOnePipe: function (x, y) { // fonction pour ajouter 1 mur

        var pipe = game.add.sprite(600, y, 'pipe'); // crée un mur à la position x et y

        this.pipes.add(pipe); // ajoute un mur

        game.physics.arcade.enable(pipe); // ajoute la physique du mur

        pipe.body.velocity.x = -200; // ajoute de la vélocité pour qu'il avance vers la gauche (-)

        pipe.checkWorldBounds = true; // le mur n'existe plus une fois sorti de l'écran
        pipe.outOfBoundsKill = true;
    },


    addRowOfPipes: function () { // fonction pour superposer les murs                               (voir l'image "mur" explicative dans le dossier) 

        var hole = Math.floor(Math.random() * 4) + 1; // position du trou par rapport au mur 

        for (var i = 0; i < 8; i++) // ajoute 6 murs superposés avec un trou de 2 (hole et hole+1)
            if (i != hole && i != hole + 1 && i != hole + 2)
                this.addOnePipe(400, i * 60 + 10);

        this.score += 1;
        this.labelScore.text = this.score; // ajoute 1 point au score par mur généré
    },

    addOneCloud: function (x, y) { // fonction pour ajouter 1 mur

        var cloud = game.add.sprite(600, pos_y = Math.round(Math.random() * 500), 'cloud', ); // crée un mur à la position x et y

        this.clouds.add(cloud); // ajoute un mur

        game.physics.arcade.enable(cloud); // ajoute la physique du mur

        cloud.body.velocity.x = -400; // ajoute de la vélocité pour qu'il avance vers la gauche (-)

        cloud.checkWorldBounds = true; // le mur n'existe plus une fois sorti de l'écran
        cloud.outOfBoundsKill = true;

        

    },

    addOneCloud2: function (x, y) { // fonction pour ajouter 1 mur

        var cloud2 = game.add.sprite(600, pos_y = Math.round(Math.random() * 400), 'cloud2', ); // crée un mur à la position x et y

        this.cloud2s.add(cloud2); // ajoute un mur

        game.physics.arcade.enable(cloud2); // ajoute la physique du mur

        cloud2.body.velocity.x = -320; // ajoute de la vélocité pour qu'il avance vers la gauche (-)

        cloud2.checkWorldBounds = true; // le mur n'existe plus une fois sorti de l'écran
        cloud2.outOfBoundsKill = true;
    },

    addOneCorbac: function (x, y) { // fonction pour ajouter 1 mur

        var corbac = game.add.sprite(600, pos_y = Math.round(Math.random() * 600), 'corbac', ); // crée un mur à la position x et y

        this.corbacs.add(corbac); // ajoute un mur

        game.physics.arcade.enable(corbac); // ajoute la physique du mur

        corbac.body.velocity.x = -300; // ajoute de la vélocité pour qu'il avance vers la gauche (-)

        corbac.checkWorldBounds = true; // le mur n'existe plus une fois sorti de l'écran
        corbac.outOfBoundsKill = true;
    },

    /*
    addOneFond: function(x, y) {                

        var fond = game.add.sprite(0, 220, 'fond');   
        this.fonds.add(fond);       // ajoute un mur

        game.physics.arcade.enable(fond);       //
        fond.body.velocity.x = -20;            //           mettre un 2e fond qui s'enchaine avec le premier
        fond.checkWorldBounds = true;         //
        fond.outOfBoundsKill = true;
    },                                      
    */

    restartGame: function () { // fonction qui relance le jeu
        game.state.start('main'); // relancer à partir de "main" donc le début
    },


    hitPipe: function () { // fonction "toucher un mur"

        if (this.bird.alive == false) // plus d'action possible quand le bird touche un mur
            return;

        this.bird.alive = false; // la fonction "hitpipe" rend la vie du bird "fausse" donc mort

        game.time.events.remove(this.timer); // empèche un nouveau mur d'apparaitre

        this.pipes.forEach(function (p) { // arrête le mouvement de tous les murs
            p.body.velocity.x = 0;
        }, this);
    },

    hitCorbac: function () { // fonction "toucher un mur"

        if (this.bird.alive == false) // plus d'action possible quand le bird touche un mur
            return;

        this.bird.alive = false; // la fonction "hitpipe" rend la vie du bird "fausse" donc mort

        game.time.events.remove(this.timer); // empèche un nouveau mur d'apparaitre

        this.corbacs.forEach(function (p) { // arrête le mouvement de tous les murs
            p.body.velocity.x = 0;
        }, this);


        Playerprefs.SetInt("score", score); // Enregistrer le score sur le disque

        score = PlayerPrefs.GetInt("score");

    },
};

//
class Star extends Phaser.Sprite
{
    constructor(game, x, y)
    {
        // Permet d'accéder à l'objet parent
        super(game, x, y, 'main', 3);

        // Ajout de l'élément dans le groupe correspondant
        this.game.custom.group.star.add(this);

        // Redimension de l'objet et repositionnement de la texture
        this.scale.setTo(this.game.custom.scaling * .5);
        this.anchor.setTo(.5);
    }

    update()
    {
        // Collision avec le joueur
        this.game.physics.arcade.overlap(this.game.custom.player, this, () =>
        {
            // Incrementation du score
            this.game.custom.score += 10;

            // Affichage du score
            this.game.custom.text.setText('Score : ' + this.game.custom.score);

            // Destruction de la pièce
            this.destroy();
        });

        // Rotation de la pièce
        this.angle += 2.5;
    }
}


var game = new Phaser.Game(600, 490); // initialise le framework "Phaser" et crée une fen^tre de jeu de 400*490

game.state.add('main', mainState); // ajoute la variable principale du jeu et l'appel "main"

game.state.start('main'); // démarrer "l'état" de "main" donc démarre le jeu
