let stats = document.getElementById('statsView');
let game = document.getElementById('gameView');

//control code - ship buttons etc
{
var playerHeight = 310;
var playerWidth = 92;
var playerX = 100;
var playerY = 0;
var playerDeg = 180;
var shipSpeed = 0;
var maxShipSpeed = 3;
var minShipSpeed = -1;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var xPressed = false;
var spacePressed = false;
var img = new Image();
var cannonimg = new Image();
//img.src = "./src/download.jpg";
img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq7Eil4AoNnUAqIaCGoAK6wEHwDpMFL8qGag&usqp=CAU";
cannonimg.src = "src/cannon.png";


var LOWimg = new Image();
LOWimg.src = "./src/LOW.png";
var THRUSTimg = new Image();
THRUSTimg.src = "./src/THRUST.png";
var HIGHimg = new Image();
HIGHimg.src = "./src/HIGH.png";

var QINVimg = new Image(); //pvuln
QINVimg.src = "./src/QINV.png";
var QVULNimg = new Image();
QVULNimg.src = "./src/QVULN.png";//qinv
var RECimg = new Image();
RECimg.src = "./src/recover.jpeg";
}
// images
//player stats - hp time etc

    Day = 3
    Time = 24 //out of 24*4 = 92

    var Gold = 0
    var shipMen = 200
    var Food = 12
    var Morale = 75

    Cannons = 12
    CannonBalls = 100


var globalLocation = 'havana'
var globalTown = 'havana'
currlocation1 = 'havana'
paused = false

//AI==========
let maxAi = 10
let aiX = [1,5,30]
let aiY = [1000,20,1000]
let aiD = ["havana",'nasau',"barbados"]

//WAVES
let spawnRate = 300
let wavesX = []
let wavesY = []
let wavesDir = []
let wavesStr = []
let angleVar = 30

//SHIP-FIGHT-MINISCENE
let startXEnemy = 200
let startYEnemy = 0
let enemyX = 0
let enemyY = 0
let enemyDeg = 0
let enemyHealth = 100
let playerHealth = 100
let playerArenaX = 0
let playerArenaY = 0

//ARRAYS================
var islands = []
var islandsX = []
var islandsY = []
var islandsSize = []

var imageList = []

//TAVERN?MEN Arrays=========
lastUpdatedDay = Day
var islandMen = [];
var islandMenMax = [];
var islandMenRefreshRate = [];
var islandMenRefreshVariation = [];

//LISTENERS + CANVAS + HITBOXES
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


//Initializeing Functions======================

    function getIndex(island) {
        let i = 0
        let returnVal = -1;

        for (value in islands) {
            if (islands[i] == island) {
                returnVal = i
            }
            i++;
        }
        return returnVal
    }

    function fillIslandLists() {
        islands = ["havana", "nasau", "barbados"]
    }
    function fillMenLists() {
        i = 0;
        for (value in islands) {
            //find
            const currStats = menStats.find(currStats => currStats.islandName == islands[i])
            islandMen[i] = [currStats.islandMen] / 1
            islandMenMax[i] = [currStats.islandMenMax] / 1
            islandMenRefreshRate[i] = [currStats.islandMenRefreshRate] / 1
            islandMenRefreshVariation[i] = [currStats.islandMenRefreshVariation] / 1
            i++;
        }
    }
    function fillImageList() {

        let i = 0;
        for (value in islands) {
            //find
            const currStats = islandStats.find(currStats => currStats.islandName == islands[i])

            let islandTempImage = new Image();
            islandTempImage.src = currStats.islandImage;
            islandTempImage.alt = currStats.islandName;

            imageList[i] = islandTempImage;
            i++;
        }


    }
    function fillCoordLists() {

        i = 0;
        for (value in islands) {
            //find
            const currStats = islandStats.find(currStats => currStats.islandName == islands[i])

            islandsX[i] = currStats.islandX;
            islandsY[i] = currStats.islandY;
            islandsSize[i] = currStats.islandSize;
            i++;
        }

    }


//Canvas + Sea functions========================

    function keyDownHandler(e) {
        if ("code" in e) {
            switch (e.code) {
                case "Unidentified":
                    break;
                case "ArrowRight":
                case "Right": // IE <= 9 and FF <= 36
                case "KeyD":
                    rightPressed = true;
                    return;
                case "ArrowLeft":
                case "Left": // IE <= 9 and FF <= 36
                case "KeyA":
                    leftPressed = true;
                    return;
                case "ArrowUp":
                case "Up": // IE <= 9 and FF <= 36
                case "KeyW":
                    upPressed = true;
                    return;
                case "ArrowDown":
                case "Down": // IE <= 9 and FF <= 36
                case "KeyS":
                    downPressed = true;
                    return;
                case "KeyX":
                    xPressed = true;
                    return;
                case "Space":
                    spacePressed = true;
                    return;

                default:
                    return;
            }
        }

        if (e.keyCode == 32) {
            spacePressed = true;
        }
        if (e.keyCode == 39) {
            rightPressed = true;
        } else if (e.keyCode == 37) {
            leftPressed = true;
        }
        if (e.keyCode == 40) {
            downPressed = true;
        } else if (e.keyCode == 38) {
            upPressed = true;
        }
    }
    function keyUpHandler(e) {
        if ("code" in e) {
            switch (e.code) {
                case "Unidentified":
                    break;
                case "ArrowRight":
                case "Right": // IE <= 9 and FF <= 36
                case "KeyD":
                    rightPressed = false;
                    return;
                case "ArrowLeft":
                case "Left": // IE <= 9 and FF <= 36
                case "KeyA":
                    leftPressed = false;
                    return;
                case "ArrowUp":
                case "Up": // IE <= 9 and FF <= 36
                case "KeyW":
                    upPressed = false;
                    return;
                case "ArrowDown":
                case "Down": // IE <= 9 and FF <= 36
                case "KeyS":
                    downPressed = false;
                    return;
                case "KeyX":
                    xPressed = false;
                    return;
                case "Space":
                    spacePressed = false;
                    return;
                default:
                    return;
            }
        }
        if (e.keyCode == 32) {
            spacePressed = false;
        }
        if (e.keyCode == 39) {
            rightPressed = false;
        } else if (e.keyCode == 37) {
            leftPressed = false;
        }
        if (e.keyCode == 40) {
            downPressed = false;
        } else if (e.keyCode == 38) {
            upPressed = false;
        }
    }

    function draw() {
        if (globalLocation == 'sea') {
            if (!paused) {

                //reset canvas
                var canvas = document.getElementById("myCanvas");
                var ctx = canvas.getContext("2d");


                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // KEYBOARD input
                if (xPressed) {
                    shipSpeed = 0;
                }
                if (rightPressed) {
                    playerDeg += 1;
                } else if (leftPressed) {
                    playerDeg -= 1;
                }
                if (downPressed) {
                    if (shipSpeed > minShipSpeed) {
                        shipSpeed -= 0.1;
                    }
                } else if (upPressed) {
                    if (shipSpeed < maxShipSpeed) {
                        shipSpeed += 0.1;
                    }
                }

                //apply player direction + speed
                playerY += Math.sin(playerDeg * Math.PI / 180) * shipSpeed;
                playerX += Math.cos(playerDeg * Math.PI / 180) * shipSpeed;

                spawnWaves(canvas)
                updateWaves()
                drawWaves(ctx, canvas);
                despawnWaves(canvas)

                //redundant
                //ctx.drawImage(img, 0, 0);
                drawRotated(ctx, canvas, img, playerDeg);

                //AI calculations
                spawnAI();
                despawnAI();
                updateAI();

                //collision with ship
                checkShipScene(canvas)

                //draw AI
                drawAIRotated(ctx, canvas, img, playerX, playerY);
                drawStationaries(ctx, canvas, playerX, playerY);

            }
            checkHitboxes(); //player island collistion
            requestAnimationFrame(draw)
        }
    }
    function drawMini() {
        if (globalLocation == 'seaFight') {
            if (!paused) {

                //reset canvas
                var canvas = document.getElementById("myCanvas");
                var ctx = canvas.getContext("2d");

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // KEYBOARD input
                updatePlayer();
                if (spacePressed) {
                    addCannons('player')
                }

                //UPDATE + AI
                updateCannonballs();//projectiles
                despawnCannonballs() //splash
                updateEnemy();//AI
                AIFiresRandomly()//AI

                //WAVES
                spawnWavesFight(canvas);
                updateWavesFight();
                drawWavesFight(ctx, canvas);
                despawnWavesFight(canvas);

                //DRAW SHIPS + cannonballs + UI
                drawPlayer(ctx, canvas, img, playerDeg);
                drawEnemy(ctx, canvas, img, enemyDeg, playerArenaX, playerArenaY);
                drawCannons(ctx, canvas)

                //temp
                drawEnemyHealth(canvas, ctx)
                drawPlayerHealth(canvas, ctx)
                ctx.beginPath();
                ctx.arc(enemyX - playerArenaX + canvas.width / 2, enemyY - playerArenaY + canvas.height / 2, img.height / 3.5, 180, 200, false);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(canvas.width / 2, canvas.height / 2, img.height / 3.5, 180, 200, false);
                ctx.stroke();


                //COLLISION DETECTION
                let collisionDist = img.height / 1.75
                checkArenaShipScene(canvas, collisionDist) //ship to ship
                checkArenaCannonballs(canvas, collisionDist) //ship to ship

                //CHECK SUCCESS / FAILURE / LEAVE
                checkPlayerDeadArena()
                checkEnemyDeadArena()
                checkPlayerLeftArena()

            }
            //checkHitboxes(); //player island collistion TODO to leave distance
            requestAnimationFrame(drawMini)
        }
    }

//WAVES
    function clearWaves() {
        wavesX = []
        wavesY = []
        wavesDir = []
        wavesStr = []
    }
    function spawnWaves(canvas) {
        for (let i = wavesX.length; i < spawnRate; i++) {
            if (wavesX.length < spawnRate) {
                wavesX[wavesX.length] = getRand(-1000 + playerX, canvas.width + 1000 + playerX)
                wavesY[wavesY.length] = getRand(-1000 + playerY, canvas.height + 1000 + playerY)
                wavesDir[wavesDir.length] = getRand(0, 360)
                wavesStr[wavesStr.length] = 100
            }
        }
    }
    function despawnWaves(canvas) {
        for (let i = 0; i < wavesX.length; i++) {
            if (wavesX[i] - playerX < -225) {
                wavesX.splice(i, 1)
                wavesY.splice(i, 1)
                wavesDir.splice(i, 1)
                wavesStr.splice(i, 1)

            } else if (wavesX[i] - playerX > canvas.width + 225) {
                wavesX.splice(i, 1)
                wavesY.splice(i, 1)
                wavesDir.splice(i, 1)
                wavesStr.splice(i, 1)

            } else if (wavesY[i] - playerY < -225) {
                wavesX.splice(i, 1)
                wavesY.splice(i, 1)
                wavesDir.splice(i, 1)
                wavesStr.splice(i, 1)

            } else if (wavesY[i] - playerY > canvas.height + 225) {
                wavesX.splice(i, 1)
                wavesY.splice(i, 1)
                wavesDir.splice(i, 1)
                wavesStr.splice(i, 1)
            }
        }
    }
    function updateWaves() {
        //decrease str
        for (let i = 0; i < wavesStr.length; i++) {
            wavesStr[i] = wavesStr[i] - 1
            wavesY[i] += Math.sin(wavesDir[i] * Math.PI / 180) * 1;
            wavesX[i] += Math.cos(wavesDir[i] * Math.PI / 180) * 1;

        }
    }
    function drawWaves(ctx, canvas) {
        ctx.strokeStyle = 'cyan';
        ctx.lineWidth = 2;
        let radius = 30

        for (let i = 0; i < wavesX.length; i++) {
            ctx.beginPath();
            ctx.arc(wavesX[i] - playerX, wavesY[i] - playerY, radius, (-angleVar + wavesDir[i]) * Math.PI / 180, (angleVar + wavesDir[i]) * Math.PI / 180, false);
            ctx.stroke();
        }


    }

//arena waves
    function spawnWavesFight(canvas) {
        for (let i = wavesX.length; i < spawnRate; i++) {
            if (wavesX.length < spawnRate) {
                wavesX[wavesX.length] = getRand(-1000 + playerArenaX, canvas.width + 1000 + playerArenaX)
                wavesY[wavesY.length] = getRand(-1000 + playerArenaY, canvas.height + 1000 + playerArenaY)
                wavesDir[wavesDir.length] = getRand(0, 360)
                wavesStr[wavesStr.length] = 100
            }
        }
    }
    function updateWavesFight() {
        //decrease str
        for (let i = 0; i < wavesStr.length; i++) {
            wavesStr[i] = wavesStr[i] - 1
            wavesY[i] += Math.sin(wavesDir[i] * Math.PI / 180) * 1;
            wavesX[i] += Math.cos(wavesDir[i] * Math.PI / 180) * 1;

        }
    }
    function despawnWavesFight(canvas) {
        for (let i = 0; i < wavesX.length; i++) {
            if (wavesX[i] - playerArenaX < -225) {
                wavesX.splice(i, 1)
                wavesY.splice(i, 1)
                wavesDir.splice(i, 1)
                wavesStr.splice(i, 1)

            } else if (wavesX[i] - playerArenaX > canvas.width + 225) {
                wavesX.splice(i, 1)
                wavesY.splice(i, 1)
                wavesDir.splice(i, 1)
                wavesStr.splice(i, 1)

            } else if (wavesY[i] - playerArenaY < -225) {
                wavesX.splice(i, 1)
                wavesY.splice(i, 1)
                wavesDir.splice(i, 1)
                wavesStr.splice(i, 1)

            } else if (wavesY[i] - playerArenaY > canvas.height + 225) {
                wavesX.splice(i, 1)
                wavesY.splice(i, 1)
                wavesDir.splice(i, 1)
                wavesStr.splice(i, 1)
            }
        }
    }
    function drawWavesFight(ctx, canvas) {
        ctx.strokeStyle = 'cyan';
        ctx.lineWidth = 2;
        let radius = 30

        for (let i = 0; i < wavesX.length; i++) {
            ctx.beginPath();
            ctx.arc(wavesX[i] - playerArenaX, wavesY[i] - playerArenaY, radius, (-angleVar + wavesDir[i]) * Math.PI / 180, (angleVar + wavesDir[i]) * Math.PI / 180, false);
            ctx.stroke();
        }


    }

//DRAW
    function drawStationaries(ctx, canvas, playerX, playerY) {
        playerUsableX = playerX - canvas.width / 2;
        playerUsableY = playerY - canvas.height / 2;
        i = 0
        for (value in islands) {
            ctx.drawImage(imageList[i], -playerUsableX + islandsX[i], -playerUsableY + islandsY[i]);
            i++;
        }
    } //islands sea
    function drawRotated(ctx, canvas, image, degrees) {
        ctx.save();
        //ctx.translate(playerX + canvas.width/2,playerY + canvas.height/2); //old
        ctx.translate(canvas.width / 2, canvas.height / 2); //new
        ctx.rotate(degrees * Math.PI / 180);

        ctx.drawImage(image, -image.width / 2, -image.width / 2);

        ctx.rotate(degrees * Math.PI / 180);
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.restore();
    } //player
    function drawAIRotated(ctx, canvas, degrees, playerX, playerY) {
        //ctx.translate(canvas.width/2,canvas.height/2); //new
        //ctx.rotate(degrees*Math.PI/180);

        var i = 0;
        playerUsableX = playerX - canvas.width / 2;
        playerUsableY = playerY - canvas.height / 2;

        for (value in aiX) {
            ctx.drawImage(img, -playerUsableX + aiX[i], -playerUsableY + aiY[i]);
            i++
        }


        //ctx.rotate(degrees*Math.PI/180);
        //ctx.translate(canvas.width/2,canvas.height/2);
    } //ships

    function startArena() {
        enemyX = startXEnemy
        enemyY = startYEnemy
        playerArenaY = 0
        playerArenaX = 0
        enemyHealth = 100

    }

//HITBOXES
    let numOut = 0
    function checkHitboxes() {
        //X = islandsX[getIndex(islands[i])]
        //Y = islandsY[getIndex(islands[i])]
        //location = islands[i]
        //img = imageList[getIndex(islands[i])]
        i = 0
        for (value in islands) {
            if (playerX > islandsX[getIndex(islands[i])] && playerX < (islandsX[getIndex(islands[i])] + imageList[getIndex(islands[i])].width)) {
                if (playerY > islandsY[getIndex(islands[i])] && playerY < (islandsY[getIndex(islands[i])] + imageList[getIndex(islands[i])].height)) {
                    updateGame(islands[i])
                }
            }
            i++;
        }
    } //islands at sea
    function checkShipScene(canvas) {
        //hitboxes
        i = 0

        for (value in aiX) {
            if (playerX > aiX[i] && playerX < aiX[i] + imageList[0].width) {
                if (playerY > aiY[i] && playerY < aiY[i] + imageList[0].height) {

                    clearWaves()
                    startArena()

                    aiY.splice(i, 1)
                    aiX.splice(i, 1)
                    aiD.splice(i, 1)
                    i--

                    updateGame('seaFight')
                }
            }
            i++;
        }
    } //ship at sea
    function checkArenaShipScene(canvas, collisionDist) {
        //hitboxes

        let checkDistance = collisionDist
        if (getDistance(playerArenaX, playerArenaY, enemyX, enemyY) < checkDistance) {
            advancement = 50
            enemyMen = 40
            swordfight = true
            unchosen = true
            enemyStance = 'enemyHits3'

            updateGame('swordfight')
        }
    } //enemy at ship fight
    function checkArenaCannonballs(canvas, collisionDist) {
        //hitboxes
        let dist = collisionDist / 2

        let i = 0
        for (value in cannonsX) {
            if (cannonsOrigin[i] == ('player')) {
                if (getDistance(cannonsX[i], cannonsY[i], enemyX, enemyY) < dist) {
                    //hit enemy
                    enemyHealth--
                    cannonsStr.splice(i, 1)
                    cannonsX.splice(i, 1)
                    cannonsY.splice(i, 1)
                    cannonsDir.splice(i, 1)
                    cannonsOrigin.splice(i, 1)
                    i--
                }
            } else {
                if (getDistance(cannonsX[i], cannonsY[i], playerArenaX, playerArenaY) < dist) {
                    //hit enemy
                    playerHealth--
                    cannonsStr.splice(i, 1)
                    cannonsX.splice(i, 1)
                    cannonsY.splice(i, 1)
                    cannonsDir.splice(i, 1)
                    cannonsOrigin.splice(i, 1)
                    i--
                }
            }

            i++
        }


        if (getDistance(playerArenaX, playerArenaY, enemyX, enemyY) < dist) {
            updateGame('havana')
        }
    } //enemy at ship fight

    function drawEnemyHealth(canvas, ctx) {
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText('Heaalth = ' + enemyHealth, 200, 100)
    }
    function drawPlayerHealth(canvas, ctx) {
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText('Heaalth = ' + playerHealth, 200, 200)
    }

//AI
    function spawnAI() {
        if (aiD.length <= maxAi) {
            //add random Ai
            let originAi = islands[getRand(-1, islands.length - 1)]
            let destination = originAi

            while (destination == originAi) {
                destination = islands[getRand(-1, islands.length - 1)]
            }

            aiD[aiD.length] = destination
            aiX[aiD.length] = islandsX[getIndex(originAi)]
            aiY[aiD.length] = islandsY[getIndex(originAi)]
        }
    }
    function despawnAI() {
        //X = islandsX[getIndex(islands[i])]
        //Y = islandsY[getIndex(islands[i])]
        //location = islands[i]
        //img = imageList[getIndex(islands[i])]

        //Check destination arrival only
        i = 0
        for (value in aiD) {
            aiCenterX = aiX[i] + (img.width) / 2//plus half width TODO
            aiCenterY = aiY[i] + (img.height) / 2//
            destinationLeft = islandsX[getIndex(aiD[i])]
            destinationRight = islandsX[getIndex(aiD[i])] + (imageList[0]).width
            destinationTop = islandsY[getIndex(aiD[i])]
            destinationBottom = islandsY[getIndex(aiD[i])] + (imageList[0]).height

            if (aiCenterX >= destinationLeft && aiCenterX < destinationRight) {
                if (aiCenterY > destinationTop && aiCenterY < destinationBottom) {
                    //splice Ai out
                    aiX.splice(i, 1)
                    aiY.splice(i, 1)
                    aiD.splice(i, 1)
                }
            }
            i++;
        }
    }
    function updateAI() {
        let i = 0
        for (value in aiX) {
            //X = islandsX[getIndex[aiD[i]]]
            if (aiX[i] > islandsX[getIndex(aiD[i])] + 5) {
                aiX[i] = aiX[i] - 1
            } else if (aiX[i] < islandsX[getIndex(aiD[i])] - 5) {
                aiX[i] = aiX[i] + 1
            }
            //Y
            if (aiY[i] > islandsY[getIndex(aiD[i])] + 5) {
                aiY[i] = aiY[i] - 1
            } else if (aiY[i] < islandsY[getIndex(aiD[i])] - 5) {
                aiY[i] = aiY[i] + 1
            }
            i++;
        }
    }



//ARENA=========================================

//ARENA DRAW
    function drawPlayer(ctx, canvas, image, degrees) {
        ctx.save();
        ctx.translate((canvas.width / 2), (canvas.height / 2)); //old
        ctx.rotate(degrees * Math.PI / 180);

        ctx.drawImage(img, -image.width / 2, -image.width / 2);

        ctx.restore();
    }
    function drawEnemy(ctx, canvas, image, degrees, playerX, playerY) {
        let playerUsableX = playerArenaX + canvas.width / 2;
        let playerUsableY = playerArenaY + canvas.height / 2;

        ctx.save();
        //ctx.translate(playerX + canvas.width/2,playerY + canvas.height/2); //old
        ctx.translate((canvas.width / 2) + enemyX - playerArenaX, (canvas.height / 2) + enemyY - playerArenaY); //old
        ctx.rotate(degrees * Math.PI / 180);

        ctx.drawImage(img, -image.width / 2, -image.width / 2);

        ctx.restore();

    }
    function drawCannons(ctx, canvas) {
        let i = 0
        for (value in cannonsX) {
            ctx.drawImage(cannonimg, (canvas.width / 2) + cannonsX[i] - playerArenaX - cannonimg.width / 2, (canvas.height / 2) + cannonsY[i] - playerArenaY - cannonimg.width / 2);

            ctx.beginPath();
            ctx.arc((canvas.width / 2) + cannonsX[i] - playerArenaX, (canvas.height / 2) + cannonsY[i] - playerArenaY, cannonimg.height / 2, 180, 200, false);
            ctx.stroke();
            i++

        }

    }

//ARENA UPDATE
    function updatePlayer() {
        if (xPressed) {
            shipSpeed = 0;
        }
        if (rightPressed) {
            playerDeg += 1;
        } else if (leftPressed) {
            playerDeg -= 1;
        }
        if (downPressed) {
            if (shipSpeed > minShipSpeed) {
                shipSpeed -= 0.1;
            }
        } else if (upPressed) {
            if (shipSpeed < maxShipSpeed) {
                shipSpeed += 0.1;
            }
        }
        //apply player direction + speed
        playerArenaY += Math.sin(playerDeg * Math.PI / 180) * shipSpeed;
        playerArenaX += Math.cos(playerDeg * Math.PI / 180) * shipSpeed;
    }
    function updateEnemy() {
        enemyDeg += 1
        enemyY += Math.sin(enemyDeg * Math.PI / 180) * 1;
        enemyX += Math.cos(enemyDeg * Math.PI / 180) * 1;

    }
    function updateCannonballs() {
        let i = 0
        for (value in cannonsX) {

            cannonsY[i] += Math.sin(cannonsDir[i] * Math.PI / 180) * cannonSpeed;
            cannonsX[i] += Math.cos(cannonsDir[i] * Math.PI / 180) * cannonSpeed;
            cannonsStr[i] -= cannonDespawnSpeed
            i++
        }
    }
    function despawnCannonballs() {
        let i = 0
        for (value in cannonsX) {
            if (cannonsStr[i] <= 0) {
                cannonsStr.splice(i, 1)
                cannonsX.splice(i, 1)
                cannonsY.splice(i, 1)
                cannonsDir.splice(i, 1)
                cannonsOrigin.splice(i, 1)
            } else {
                i++
            }
        }
    }

    function AIFiresRandomly() {
        addCannon(enemyX, enemyY, "enemy")
    }

    function addCannons(player) {
        addCannon(playerArenaX, playerArenaY, player)
    }
    function addCannon(cx, cy, player) {
        cannonsX[cannonsX.length] = cx
        cannonsY[cannonsY.length] = cy
        cannonsOrigin[cannonsOrigin.length] = player
        cannonsStr[cannonsStr.length] = getCannonStr(playerArenaX, playerArenaY, enemyX, enemyY)


        let ptoE = getCannonDir(playerArenaX, playerArenaY, enemyX, enemyY)
        let etoP = getCannonDir(enemyX, enemyY, playerArenaX, playerArenaY)

        while (playerDeg < 360) {
            playerDeg += 360
        }
        while (ptoE < 0) {
            ptoE += 360
        }
        while (etoP < 0) {
            etoP += 360
        }
        ptoE = (ptoE % 360)
        etoP = (etoP % 360)
        playerDeg = (playerDeg % 360)


        //console.log(getCannonDir(playerArenaX,playerArenaY,enemyX,enemyY))
        if (player == 'player') {
            if ((ptoE > playerDeg) && (ptoE < (playerDeg + 180))) {
                //right pos 0 180
                cannonsDir[cannonsDir.length] = playerDeg + 90
            } else {
                //left
                cannonsDir[cannonsDir.length] = playerDeg - 90
            }
            //then adjust to broadside
        } else {
            if ((etoP > enemyDeg) && (etoP < (enemyDeg + 180))) {
                //right pos 0 180
                cannonsDir[cannonsDir.length] = enemyDeg + 90
            } else {
                //left
                cannonsDir[cannonsDir.length] = enemyDeg - 90
            }
            //then adjust to broadside
        }
    }

    function getCannonDir(cx, cy, ex, ey) {
        let dy = ey - cy;
        let dx = ex - cx;
        let theta = Math.atan2(dy, dx); // range (-PI, PI]
        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        //if (theta < 0) theta = 360 + theta; // range [0, 360)
        return theta;
    }
    function getCannonStr(cx, cy, ex, ey) {
        let dist = getDistance(cx, cy, ex, ey) + extraCannonStr
        let max = maxCannonStr
        if (dist > max) {
            return max
        } else {
            return dist
        }
    }

    function checkPlayerDeadArena() {
        if (playerHealth <= 0) {
            playerHealth = 100
            updateGame('havana')
        }
    }
    function checkEnemyDeadArena() {
        if (enemyHealth <= 0) {
            updateGame('rewards')
        }
    }
    function checkPlayerLeftArena() {
        let dist = getDistance(playerArenaX, playerArenaY, enemyX, enemyY)
        if (dist > 900) {
            updateGame('sea')
        }
    }

let cannonsX = [100]
let cannonsY = [200]
let cannonsDir = [2]
let cannonsStr = [50]
let cannonsOrigin = ['player']

    let cannonSpeed = 4
    let cannonDespawnSpeed = 4
    let maxCannonStr = 400
    let cannonsReadyPlayer = 0
    let cannonsReadyEnemy = 0
    let maxCannonsPlayer = 3
    let maxCannonsEnemy = 3
    let extraCannonStr = 20

//=========================================
//=========================================

//game cycle
function start(){
    fillIslandLists()
    fillMenLists()
    fillCoordLists()
    fillImageList()
    run()
} //call run()
function run(){
    updateStatsCheats() //update stats screen
    timeratio = 1000 //ms per 15mins 96 quarter hours per day
    setInterval(() => {
        if(!paused) {
            incrementTime()
            incrementTime()
            updateStatsCheats()
        }
    }, timeratio); //2 15mins every 1000ms


    startUpTime = 1000 //ms to startup
    game.innerText = 'starting game';
    setTimeout(() => {
        updateGame(currlocation1)
    }, startUpTime); //added startup time

} //startup time

function updateGame(currlocation){
    if(!paused) {
        //STATS for towns
        updateTowns()

        //LOCATION RESET
        game.style.backgroundColor = '#768567';//generic teal for all but ocean
        globalLocation = currlocation//update location
        while (game.firstChild) {
            game.removeChild(game.firstChild)
        } //remove all buttons

        //display location
        game.innerHTML = '-----------------------------' + '<br>'
        game.innerHTML += currlocation;
        game.innerHTML += '<br>'
        game.innerHTML += '-----------------------------' + '<br>'

        //get location node info
        const currLoc = places.find(currLoc => currLoc.Name == currlocation)
        globalTown = currLoc.Town;

        //SEA========================
        if (currLoc.Name == 'sea') {
            while (game.firstChild) {
                game.removeChild(game.firstChild)
            } //remove all
            game.style.backgroundColor = '#012399';//ocean color

            //draw canvas
            const canvas = document.createElement('canvas');
            canvas.setAttribute('id', 'myCanvas')
            canvas.setAttribute('width', String(game.offsetWidth))
            canvas.setAttribute('height', String(game.offsetHeight))
            game.appendChild(canvas)
            playerDeg += 180;
            draw()
        }
        if (currLoc.Name == 'seaFight') {
            while (game.firstChild) {
                game.removeChild(game.firstChild)
            } //remove all
            game.style.backgroundColor = '#012399';//ocean color

            //draw canvas
            const canvas = document.createElement('canvas');
            canvas.setAttribute('id', 'myCanvas')
            canvas.setAttribute('width', String(game.offsetWidth))
            canvas.setAttribute('height', String(game.offsetHeight))
            game.appendChild(canvas)
            playerDeg += 180;
            let enemyMen = 50
            drawMini()
        }
        if (currLoc.Type == 'swordfight') {
            if(advancement > 99 | enemyMen < 0){
                swordfight = false
                goldTaken = false
                updateGame('rewards')
            }
            else if(advancement < 1 || shipMen < 1){
                swordfight = false
                updateGame('havana')
            }
            //UPDATE progress
            if(currLoc.Name == "swordfightUp"){
                advancement += 10
            }else if(currLoc.Name == "swordfightDown"){
                advancement -= 10
            }else if(currLoc.Name == "swordfightNeutrak"){
                //no advancement progress
            }
            if(advancement != 50){
                updateSwordFightMen()
            }

            //DISPLAY men plus adv
            if(true) {
                game.innerHTML += "ADV: " + advancement + " / 100"
                game.innerHTML += '<br>'
                game.innerHTML += "MEN:"
                game.innerHTML += '<br>'
                game.innerHTML += "YOU: " + shipMen + " vs. THEM: " + enemyMen
                game.innerHTML += '<br>'
                game.innerHTML += '<br>'
            }

            //set state based on stance
            //q.inv q.vuln p.vuln eprec q.rand q.rand1
            if(true) {
                if (enemyStance == "bothHit1" | enemyStance == "bothHit2" |
                    enemyStance == "playerHits1" | enemyStance == "playerHits2" |
                    enemyStance == "enemyHits1" | enemyStance == "enemyHits2" |
                    enemyStance == "playerParries1" |
                    enemyStance == "enemyParries1"
                ) {
                    fightState = 'eprec'
                } else if (enemyStance == "enemyHits3" |
                    enemyStance == "playerHits3" |
                    enemyStance == "playerParries3" |
                    enemyStance == "bothHit3"
                ) {
                    fightState = 'qinv'
                } else if (
                    enemyStance == "playerParries2"
                ) {
                    fightState = 'qvuln'
                } else if (
                    enemyStance == "enemyParries2"
                ) {
                    fightState = 'pvuln'
                } else if (enemyStance == "bothHit4" |
                    enemyStance == "playerHits4" |
                    enemyStance == "enemyHits4" |
                    enemyStance == "playerParries4"
                ) {
                    fightState = 'qrand'
                } else if (enemyStance == "bothHit5" |
                    enemyStance == "playerHits5" |
                    enemyStance == "enemyHits5" |
                    enemyStance == "playerParries5" |
                    enemyStance == "enemyParries3"
                ) {
                    fightState = 'qrand1'
                } else {
                    fightState = 'error'
                }
            }

            //SET RAND ATK
            if(fightState == "qrand" | fightState == "pvuln"){
                let randNum = getRand(0,3)
                if(randNum == 1){
                    enemyAttack = "High"
                }else if(randNum == 2){
                    enemyAttack = "Thrust"
                }else if(randNum == 3){
                    enemyAttack = "Low"
                }
            }

            //SHOW STATE INFO
            game.innerHTML += enemyStance
            game.innerHTML += '<br>'
            game.innerHTML += fightState
            game.innerHTML += '<br>'

            //IMAGE
            let images = document.createElement('span')
            let buttons = document.createElement('div')
            images.classList.add('a')
            buttons.classList.add('a')
            images.id = 'images'
            buttons.id = 'buttons'
            game.appendChild(images)
            game.appendChild(buttons)
            appendIMGSF()

            //BUTTONS
            //set new buttons based on enemy stance
            buttons.innerHTML += 'ACTIONS: '
            let br1 = document.createElement('div')
            buttons.appendChild(br1)
            if(fightState == "eprec"){
                lineBreakOne = document.createElement("br");
                images.appendChild(lineBreakOne)
                info = document.createElement("p");
                info.innerText = "HE RECOVERS  /  " + enemyStance
                images.appendChild(info)
                lineBreakTwo = document.createElement("br");
                game.appendChild(lineBreakTwo)
                lineBreakThree = document.createElement("br");
                game.appendChild(lineBreakThree)
                lineBreakThree1 = document.createElement("br");
                game.appendChild(lineBreakThree1)
                game.appendChild(lineBreak3)
                game.appendChild(lineBreak3)
            }//nada
            if(fightState == "pvuln"){
                lineBreakOne = document.createElement("br");
                images.appendChild(lineBreakOne)

                info = document.createElement("p");
                info.innerText = enemyAttack + "  /  ..."
                images.appendChild(info)

                lineBreakTwo = document.createElement("br");
                game.appendChild(lineBreakTwo)
                lineBreakThree = document.createElement("br");
                game.appendChild(lineBreakThree)
                lineBreakThree1 = document.createElement("br");
                game.appendChild(lineBreakThree1)
                game.appendChild(lineBreak3)
                game.appendChild(lineBreak3)
            }//nada / pick Atk
            if(fightState == "qvuln"){
                lineBreakOne = document.createElement("br");
                images.appendChild(lineBreakOne)

                enemyAttack = 'None'
                info = document.createElement("p");
                info.innerText = "HE RECOVERS  /  ..."
                images.appendChild(info)

                appendSwordfightButtons()
            }//append / free hit
            if(fightState == "qinv"){
                lineBreakOne = document.createElement("br");
                images.appendChild(lineBreakOne)

                enemyAttack = 'Wait'
                info = document.createElement("p");
                info.innerText = "...   /   ..."
                images.appendChild(info)

                appendSwordfightButtons()
            }//append / parry chance
            if(fightState == "qrand"){
                lineBreakOne = document.createElement("br");
                images.appendChild(lineBreakOne)

                info = document.createElement("p");
                info.innerText = enemyAttack + "  /  ..."
                images.appendChild(info)

                appendSwordfightButtons()
            }//append / pick Atk
            if(fightState == "qrand1"){
                lineBreakOne = document.createElement("br");
                images.appendChild(lineBreakOne)

                info = document.createElement("p");
                info.innerText = enemyAttack + "  /  ..."
                images.appendChild(info)

                appendSwordfightButtons()
            }//append

            //reset timerchosen stats
            if(enemyStance == "playerHits2" |
                enemyStance == "enemyParries2" |
                enemyStance == "playerParries2" |
                enemyStance == "bothHit2" |
                enemyStance == "enemyHits2"
            ){
                unchosen = true
            }

            //timer
            //apply enemy attack + stance after time
            if(true) {
                lineBreak33 = document.createElement("br");
                p33 = document.createElement("p");
                p33.innerText = "advance time: "
                game.appendChild(lineBreak33)
                game.appendChild(p33)
                const button = document.createElement('button');
                button.innerText = 'Next cycle';
                button.classList.add('btn');
                button.id = 'timeButton';
                button.addEventListener('click', updateSwordFight);
                game.appendChild(button);
                lineBreak3 = document.createElement("br");
                game.appendChild(lineBreak3)

                var delayInMilliseconds = 1030; //1 second
                setTimeout(function() {
                    if(unchosen){
                        if(swordfight) {
                            updateSwordFight()
                        }
                    }
                }, delayInMilliseconds);
            }
            //0.5 seconds update

            p3 = document.createElement("br");
            p3.innerText = 'FORCE ADVANCE:'
            game.appendChild(p3)


            if(advancement > 99 | enemyMen < 0){
                swordfight = false
                goldTaken = false
                updateGame('rewards')
            }
            else if(advancement < 1 || shipMen < 1){
                swordfight = false
                updateGame('havana')
            }

        }

        //TEXT========================
        if (currLoc.Type == 'townsquare') {
            //game.innerHTML += '<img src="p;ttps://cdn.images.express.co.uk/img/dynamic/galleries/517x/326705.jpg" alt="Camilla Cabello">'
            game.innerHTML += '<br>'
            game.innerHTML += 'welcome to ' + currLoc.Name
            game.innerHTML += '<br>'
        } // title TOWN SQUARE special welcome title

        //BUTTONS=================================================
        if (currLoc.Type == 'tavern') {
            const button = document.createElement('button')
            button.innerText = 'Recruit Men'
            button.classList.add('btn')
            button.addEventListener('click', () => {
                addMen()
                updateGame(currLoc.Name)
            })
            game.appendChild(button)

            lineBreak = document.createElement("br");
            game.appendChild(lineBreak)

            const button2 = document.createElement('button')
            button2.innerText = 'talk to vendor'
            button2.classList.add('btn')
            button2.addEventListener('click', () => {
                addMen()
                updateGame(currLoc.Name)
            })
            game.appendChild(button2)
        } // generic TAVERN BUTTONS
        if (currLoc.Name == 'rewards') {
            if(!goldTaken) {
                const buttonGold = document.createElement('button')
                buttonGold.innerText = 'Take Gold'
                buttonGold.classList.add('btn')
                buttonGold.addEventListener('click', () => {
                    addGold()
                    goldTaken = true
                    updateGame('rewards')
                })
                game.appendChild(buttonGold)

            }
            lineBreak = document.createElement("br");
            game.appendChild(lineBreak)
        } // generic REWARDS BUTTONS

        currLoc.options.forEach(option => {
            if (showOption(option)) {
                const button = document.createElement('button')
                button.innerText = option.text
                button.classList.add('btn')
                button.addEventListener('click', () => selectOption(option))
                game.appendChild(button)
            }
        }) //create generic buttons

        if (currLoc.Type == 'townsquare') {
            lineBreak = document.createElement("br");
            game.appendChild(lineBreak)

            const button = document.createElement('button')
            button.innerText = 'Set Sail'
            button.classList.add('btn')
            button.addEventListener('click', () => {
                game.style.backgroundColor = '#012399';//ocean color
                updateGame('sea')
                incrementTime();
            })
            game.appendChild(button)


        } // set sail BUTTONS
    }
}
//call on repeat for each node

//=========================================
//=========================================

//display-view=====================================

//update screen
function selectOption(option) {
    nextTextNodeId = option.destination

    if (nextTextNodeId <= 0) {
        return run()
    }

    updateGame(nextTextNodeId)
}
function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

//statsView display
function updateStats(){

    stats.innerHTML = 'Day: ' + Day + '<br>'
    stats.innerHTML += 'Time: ' + roundFloor(Time) + ":"
    addMinutes()
    stats.innerHTML += '<br>'
    stats.innerHTML += '<button onclick="pause()">Pause</button>'
    stats.innerHTML += '<button onclick="resume()">Resume</button>'
    stats.innerHTML += '<br>'
    stats.innerHTML += '<br>'
    stats.innerHTML += '<b>Advancement Stats</b>' + '<br>'
    stats.innerHTML += 'Gold: ' + '<br>'
    stats.innerHTML += 'Men: ' + '<br>'
    stats.innerHTML += 'Food: ' + '<br>'
    stats.innerHTML += 'Morale: ' + '<br>'
    stats.innerHTML += '<br>'
    stats.innerHTML += '<b>Ship Stats</b>' + '<br>'

    stats.innerHTML += 'Speed: ' + '<br>'
    stats.innerHTML += 'Sail health: ' + '<br>'
    stats.innerHTML += 'Hull health: ' + '<br>'
    stats.innerHTML += 'Cannons: ' + '<br>'
    stats.innerHTML += 'Cannonballs: ' + '<br>'
} //stats display
function updateStatsCheats(){
    stats.innerHTML = 'Day: ' + Day + '<br>'
    stats.innerHTML += 'Time: ' + roundFloor(Time) + ":"
    addMinutes()
    stats.innerHTML += '<br>'
    stats.innerHTML += '<button onclick="pause()">Pause</button>'
    stats.innerHTML += '<button onclick="resume()">Resume</button>'
    stats.innerHTML += '<button onclick="Day++">add day</button>'
    stats.innerHTML += '<br>'
    stats.innerHTML += '<br>'
    stats.innerHTML += '<b>Advancement Stats</b>' + '<br>'
    stats.innerHTML += 'Gold: ' + Gold + '<br>'
    stats.innerHTML += 'Men: ' + shipMen + '<br>'
    stats.innerHTML += 'Food: ' + Food + '<br>'
    stats.innerHTML += 'Morale: ' + Morale + '<br>'
    stats.innerHTML += '<br>'
    stats.innerHTML += '<b>Ship Stats</b>' + '<br>'

    stats.innerHTML += 'Speed: ' + '<br>'
    stats.innerHTML += 'Sail health: ' + '<br>'
    stats.innerHTML += 'Hull health: ' + '<br>'
    stats.innerHTML += 'Cannons: ' + '<br>'
    stats.innerHTML += 'Cannonballs: ' + '<br>'
    stats.innerHTML += '<br>'
    stats.innerHTML += '<button onclick="Gold++">Add Gold</button>'

    stats.innerHTML += '<button onclick="shipMen++">Add Men</button>'

    stats.innerHTML += '<button onclick="Morale++">Add Morale</button>'

    stats.innerHTML += '<button onclick="Food++">Add Food</button>'

    stats.innerHTML += '<br>'
    stats.innerHTML += '<button onclick="Gold--">Less Gold</button>'

    stats.innerHTML += '<button onclick="shipMen--">Less Men</button>'

    stats.innerHTML += '<button onclick="Morale--">Less Morale</button>'

    stats.innerHTML += '<button onclick="Food--">Less Food</button>'

    stats.innerHTML += '<br>'
    stats.innerHTML += '<button onclick="Gold = Gold + 5">Add 5 Gold</button>'

    stats.innerHTML += '<button onclick="shipMen = shipMen + 5">Add 5 Men</button>'

    stats.innerHTML += '<button onclick="Morale = Morale + 5">Add 5 Morale</button>'

    stats.innerHTML += '<button onclick="Food = Food + 5">Add 5 Food</button>'

    stats.innerHTML += '<br>'
    stats.innerHTML += '<button onclick="Gold = Gold - 5">Less 5 Gold</button>'

    stats.innerHTML += '<button onclick="shipMen = shipMen - 5">Less 5 Men</button>'

    stats.innerHTML += '<button onclick="Morale = Morale - 5">Less 5 Morale</button>'

    stats.innerHTML += '<button onclick="Food = Food - 5">Less 5 Food</button>'

} //stats display w/ cheats
function addMinutes(){
    var tempTime = Time
    while(tempTime >= 1){
        tempTime -= 1
    }
    if(tempTime == 0.25) {
        stats.innerText += '15'
    }else if(tempTime == 0) {

        stats.innerText += '00'
    }else if(tempTime == 0.5){

        stats.innerText += '30'
    }else if(tempTime == 0.75){

        stats.innerText += '45'
    }else{

        stats.innerText += '??'
    }
} //append mins to string ???

//utilities
function roundFloor(num){
    let temp = num;
    while(num >= 1){
        num = num-1;
    }
    return temp - num;
} //round down
function getRand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min + 1;
} //inclusive top bound
function getDistance(x1, y1, x2, y2){
    let y = x2 - x1;
    let x = y2 - y1;

    //return root(x * x + y * y);
    return Math.sqrt(x * x + y * y);
}
function root(n){
    // Max and min are used to take into account numbers less than 1
    let lo = 1
    let hi = n
    if(n > 1){
        lo = 1
    }
    if(n < 1){
        hi = 1
    }
    let mid;

    // Update the bounds to be off the target by a factor of 10
    while(100 * lo * lo < n) lo *= 10;
    while(100 * hi * hi > n) hi *= 0.1;

    for(let i = 0 ; i < 100 ; i++){
        mid = (lo+hi)/2;
        if(mid*mid == n) return mid;
        if(mid*mid > n) hi = mid;
        else lo = mid;
    }
    return mid;
}

//time
function incrementTime(){
    Time = Time + 0.25;
    if(Time>24) {
        Day = Day + 1;
        Time = 0.25;
    }
} //15mins increment
function pause(){paused = true} //...
function resume(){paused = false} //...


//game-functions=====================================

//stance theory
{
//recoveryFromGettingHit - e.invincible - e.recTime:avg into atk - p.recTime:avg
//recoveryFromParrying - e.invincible - e.recTime:quick into atk - p.recTime:avg
//recoveryFromLandingHit  - e.invincible - e.recTime:avg into atk - p.recTime:avg
//recoveryFromGettingParried  - e.vulnerable - e.recTime:avg into vuln - p.recTime:quick

//chargingVulnerable - if hit (parry chance) then wound

//chargingHigh 2.5dmg
    //parry
    //hit
    //hit
//chargingThrust 1.5dmg
    //get hit
    //parry
    //get hit
//chargingLow 2dmg
    //hit
    //get hit
    //parry

//player stance

//hit either way is two cycles
//parry is one cycle + vulnerable cycle for parried
//attacker charging = two cycles
//q1 = chargev one cycle
//q.1 chargeH two cycles
//q.2 chargeM two cycles
//q.3 chargeL two cycles

//enemyHits cycle1 prec erec    -> cycle2 prec erec -> q.inv -> q.rand->     q.rand(+1)
//playerHits cycle1 prec erec   -> cycle2 prec erec -> q.inv -> q.rand->     q.rand(+1)
//bothHits  cycle1 prec erec     -> cycle2 prec erec -> q.inv -> q.rand->     q.rand(+1)
//playerParries cycle1 prec erec->    q.vuln    -> q.inv ->   q.rand->     q.rand(+1)
//enemyParries cycle1 prec erec ->   p.vuln  ->     q.rand(+1)

//prec erec if
// enemyHits1 / enemyHits2
// playerHits1 / playerHits2
// bothHits1 / bothHits2
// playerParries1
// enemyParries1
//wait -> next

//q.inv if
// enemyHits3
// playerHits3
// bothHits3
// playerParries3
//appendButtons -> q.rand

// q.vuln  if
// playerParries2
//appendButtons -> q.inv

// p.vuln if
// enemyParries2
// show q.rand no button -> q.rand(+1)



}

//SWORDFIGHT
let swordfight = false
let fightState = 'qinv'
let enemyAttack = 'None'
let enemyMen = 50
let unchosen = true
let advancement = 50
let enemyStance = 'playerHits3'
function updateSwordFight(){
    //update stance
    if(swordfight) {
        let down = false;
        if (fightState == "qrand1") {
            down = true
        }
        updateStance();
        if (down) {
            updateGame('swordfightDown');
        } else {
            updateGame('swordfightNeutral');
        }
    }
}
function updateStance(){
    if(enemyStance == 'bothHit1'){
        enemyStance = 'bothHit2'//eprec
    }else if(enemyStance == 'bothHit2'){
        enemyStance = 'bothHit3'//qinv
    }else if(enemyStance == 'bothHit2'){
        enemyStance = 'bothHit4' //qrand
    }else if(enemyStance == 'bothHit2'){
        enemyStance = 'bothHit5'//qrand1

    }else if(enemyStance == 'playerHits1'){
        enemyStance = 'playerHits2'//eprec
    }else if(enemyStance == 'playerHits2'){
        enemyStance = 'playerHits3'//qinv
    }else if(enemyStance == 'playerHits3'){
        enemyStance = 'playerHits4' //qrand
    }else if(enemyStance == 'playerHits4'){
        enemyStance = 'playerHits5'//qrand1

    }else if(enemyStance == 'enemyHits1'){
        enemyStance = 'enemyHits2' //eprec
    }else if(enemyStance == 'enemyHits2'){
        enemyStance = 'enemyHits3'  //qinv
    }else if(enemyStance == 'enemyHits3'){
        enemyStance = 'enemyHits4' //qrand
    }else if(enemyStance == 'enemyHits4'){
        enemyStance = 'enemyHits5'//qrand1

    }else if(enemyStance == 'playerParries1'){
        enemyStance = 'playerParries2' //qvuln
    }else if(enemyStance == 'playerParries2'){
        enemyStance = 'playerParries3' //qinv
    }else if(enemyStance == 'playerParries3'){
        enemyStance = 'playerParries4'//qrand
    }else if(enemyStance == 'playerParries4'){
        enemyStance = 'playerParries5'//qrand1

    }else if(enemyStance == 'enemyParries1'){
        enemyStance = 'enemyParries2' //pvuln
    }else if(enemyStance == 'enemyParries2'){
        enemyStance = 'enemyParries3' //qrand1
    }else{
        //on qrand1
        //playerHits5 | enemyHits5 | bothHit5
        //playerParries5 | enemyParries4
        //then hit and set
        enemyStance = 'enemyHits1'

    }
}
function appendIMGSF(){

    if(fightState == "eprec"){
        br1 = document.createElement("br");
        game.appendChild(br1)

        document.getElementById('images').appendChild(RECimg)

        br2 = document.createElement("br");
        game.appendChild(br2)
    }//nada
    if(fightState == "pvuln"){

        br1 = document.createElement("br");
        game.appendChild(br1)

        appendATK()

        br2 = document.createElement("br");
        game.appendChild(br2)
    }//nada / pick Atk
    if(fightState == "qvuln"){

        br1 = document.createElement("br");
        game.appendChild(br1)

        document.getElementById('images').appendChild(QVULNimg)

        br2 = document.createElement("br");
        game.appendChild(br2)
    }//append / free hit
    if(fightState == "qinv"){

        br1 = document.createElement("br");
        game.appendChild(br1)


        document.getElementById('images').appendChild(QINVimg)

        br2 = document.createElement("br");
        game.appendChild(br2)
    }//append / parry chance
    if(fightState == "qrand"){

        br1 = document.createElement("br");
        game.appendChild(br1)

        appendATK()

        br2 = document.createElement("br");
        game.appendChild(br2)
    }//append / pick Atk
    if(fightState == "qrand1"){

        br1 = document.createElement("br");
        game.appendChild(br1)

        appendATK()

        br2 = document.createElement("br");
        game.appendChild(br2)
    }//append
}
function appendATK(){
    if(enemyAttack == "High"){
        document.getElementById('images').appendChild(HIGHimg)
    }
    if(enemyAttack == "Thrust"){
        document.getElementById('images').appendChild(THRUSTimg)
    }
    if(enemyAttack == "Low"){
        document.getElementById('images').appendChild(LOWimg)
    }
}
function appendSwordfightButtons(){
    lineBreak11 = document.createElement("br");
    lineBreak12 = document.createElement("br");
    lineBreak13 = document.createElement("br");
    lineBreak14 = document.createElement("br");
    //game.appendChild(lineBreak11)

    const buttonHigh = document.createElement('button');
    const buttonThrust = document.createElement('button');
    const buttonLow = document.createElement('button');
    buttonLow.innerText = 'Attack Low';
    buttonThrust.innerText = 'Attack Thrust';
    buttonHigh.innerText = 'Attack High';
    buttonLow.classList.add('btn');
    buttonThrust.classList.add('btn');
    buttonHigh.classList.add('btn');

    if(enemyAttack == "High"){

        buttonHigh.addEventListener('click', SFparry);
        buttonThrust.addEventListener('click', SFhit);
        buttonLow.addEventListener('click',SFhit);
        document.getElementById('buttons').appendChild(buttonHigh);
        document.getElementById('buttons').appendChild(lineBreak12)
        document.getElementById('buttons').appendChild(buttonThrust);
        document.getElementById('buttons').appendChild(lineBreak13)
        document.getElementById('buttons').appendChild(buttonLow);
        document.getElementById('buttons').appendChild(lineBreak14)
    }
    else if(enemyAttack == "Thrust"){

        buttonHigh.addEventListener('click', SFgethit);
        buttonThrust.addEventListener('click', SFparry);
        buttonLow.addEventListener('click',SFgethit);
        document.getElementById('buttons').appendChild(buttonHigh);
        document.getElementById('buttons').appendChild(lineBreak12)
        document.getElementById('buttons').appendChild(buttonThrust);
        document.getElementById('buttons').appendChild(lineBreak13)
        document.getElementById('buttons').appendChild(buttonLow);
        document.getElementById('buttons').appendChild(lineBreak14)
    }
    else if(enemyAttack == "Low"){

        buttonHigh.addEventListener('click', SFhit);
        buttonThrust.addEventListener('click', SFgethit);
        buttonLow.addEventListener('click',SFparry);
        document.getElementById('buttons').appendChild(buttonHigh);
        document.getElementById('buttons').appendChild(lineBreak12)
        document.getElementById('buttons').appendChild(buttonThrust);
        document.getElementById('buttons').appendChild(lineBreak13)
        document.getElementById('buttons').appendChild(buttonLow);
        document.getElementById('buttons').appendChild(lineBreak14)
    }
    else if(enemyAttack == "Wait"){

        console.log('wait')
        buttonHigh.addEventListener('click', SFChance);
        buttonThrust.addEventListener('click', SFChance);
        buttonLow.addEventListener('click',SFChance);
        document.getElementById('buttons').appendChild(buttonHigh);
        document.getElementById('buttons').appendChild(lineBreak12)
        document.getElementById('buttons').appendChild(buttonThrust);
        document.getElementById('buttons').appendChild(lineBreak13)
        document.getElementById('buttons').appendChild(buttonLow);
        document.getElementById('buttons').appendChild(lineBreak14)
    }
    else{
        buttonHigh.addEventListener('click', SFhit);
        buttonThrust.addEventListener('click', SFhit);
        buttonLow.addEventListener('click',SFhit);
        document.getElementById('buttons').appendChild(buttonHigh);
        document.getElementById('buttons').appendChild(lineBreak12)
        document.getElementById('buttons').appendChild(buttonThrust);
        document.getElementById('buttons').appendChild(lineBreak13)
        document.getElementById('buttons').appendChild(buttonLow);
        document.getElementById('buttons').appendChild(lineBreak14)
    }//free hit
}
function updateSwordFightMen(){
    let temp = shipMen;

    shipMen -= roundFloor(enemyMen/50) + 1
    enemyMen -= roundFloor(temp/50) + 1
}
function SFgethit(){
    unchosen = false
    enemyStance = 'enemyHits1'
    setTimeout(function() {
        updateSwordFight()
    }, 1200);
    updateGame('swordfightDown')
}
function SFhit(){
    unchosen = false
    enemyStance = 'playerHits1'
    setTimeout(function() {
        updateSwordFight()
    }, 1200);
    updateGame('swordfightUp')
}
function SFparry(){
    unchosen = false
    enemyStance = 'playerParries1'
    setTimeout(function() {
        updateSwordFight()
    }, 1200);
    updateGame('swordfightNeutral')
}
function SFChance(){
    unchosen = false
    let n = getRand(0,2)
    console.log(n)
    if(n == 1){
        enemyStance = 'enemyParries1'
        setTimeout(function() {
            updateSwordFight()
        }, 1200);
        updateGame('swordfightNeutral')
    }else{
        enemyStance = 'playerHits1'
        setTimeout(function() {
            updateSwordFight()
        }, 1200);
        updateGame('swordfightUp')
    }


}

//REWARDS
let goldTaken = false
function addGold(){
        Gold += getRand(0,300);
}

//GAMESTATS UPDATES
    function updateTowns() {
        updateTavern();
    } //refreshing town stats
    function updateTavern() {
        updateMen()
    } //refreshTavern
    function updateMen() {
        //havana
        if (Day != lastUpdatedDay) {
            //generic
            i = 0;
            for (value in islands) {
                islandMen[i] = islandMenRefreshRate[i] / 1 + getRand(-islandMenRefreshVariation[i], islandMenRefreshVariation[i]) / 1
                i++;
            }

            lastUpdatedDay = Day

        }

        i = 0;
        for (value in islands) {
            if (islandMen[i] < 0) {
                islandMen[i] = 0
            } else if (islandMen[i] > islandMenMax[i]) {
                islandMen[i] = islandMenMax[i]
            }
            i++;
        }//check min/max
    } //refreshMen

//RECRUIT MEN BUTTON calls this
    function islandsContains(town) {
        let i = 0
        let returnVal = false
        for (let value in islands) {
            if (islands[i] == town)
                returnVal = true
            i++
        }
        return returnVal
    }
    function addMen() {
        if (islandsContains(globalTown)) {
            let i = getIndex(globalTown)
            shipMen += islandMen[i] / 1
            islandMen[i] = 0
        }
        updateStatsCheats()
    }


//PLACES TEXT NAVIGATION=============================

//nodes and options
const places = [
    {
        id:0,
        Name: 'sea',
        options:[]
    }, //sea
    {
        id:9,
        Name: 'seaFight',
        options:[]
    },//seaFight
    {
        id:93,
        Name: 'swordfight',
        Type: 'swordfight',
        options:[
            {
                destination: 'rewards',
                text: 'skip',
            },
            {
                destination: 'swordfightUp',
                text: 'up',
            },
            {
                destination: 'swordfightNeutral',
                text: 'mid',
            },
            {
                destination: 'swordfightDown',
                text: 'down',
            },
        ]
        },//swordFight
        {
            id:931,
            Name: 'swordfightDown',
            Type: 'swordfight',
            options:[
                {
                    destination: 'rewards',
                    text: 'skip',
                },
                {
                    destination: 'swordfightUp',
                    text: 'up',
                },
                {
                    destination: 'swordfightNeutral',
                    text: 'mid',
                },
                {
                    destination: 'swordfightDown',
                    text: 'down',
                },
            ]
        },//swordFight
        {
            id:932,
            Name: 'swordfightNeutral',
            Type: 'swordfight',
            options:[
                {
                    destination: 'rewards',
                    text: 'skip',
                },
                {
                    destination: 'swordfightUp',
                    text: 'up',
                },
                {
                    destination: 'swordfightNeutral',
                    text: 'mid',
                },
                {
                    destination: 'swordfightDown',
                    text: 'down',
                },
            ]
        },//swordFight
        {
            id:933,
            Name: 'swordfightUp',
            Type: 'swordfight',
            options:[
                {
                    destination: 'rewards',
                    text: 'skip',
                },
                {
                    destination: 'swordfightUp',
                    text: 'up',
                },
                {
                    destination: 'swordfightNeutral',
                    text: 'mid',
                },
                {
                    destination: 'swordfightDown',
                    text: 'down',
                },
            ]
        },//swordFight
    {
        Name:'rewards',
        Type:'rewards',
        id:91,
        options:[
            {
                destination: 'sea',
                text: 'sink',
            },
            {
                destination: 'raid',
                text: 'raid',
            }
            ]
    },//rewards
    {
        Name:'raid',
        Type:'raid',
        id:92,
        options:[
            {
                destination: 'raid',
                text: 'next',
            },
            {
                destination: 'rewards',
                text: 'back',
            }
        ]
    },//raid

    {
        Name:'havana',
        Type:'townsquare',
        id:1,
        options:[
            {
                destination: 'havanaMayor',
                text: 'talk to the mayor',
            },
            {
                destination: 'havanaTavern',
                text: 'go to the Tavern',
            },
            {
                destination: 'havanaMerchant',
                text: 'trade with the merchant',
            },
            {
                destination: 'havanaShipwright',
                text: 'talk to the Shipwright',
            },
        ]
    }, //havana
    {
        Name:'havanaTavern',
        Type:'tavern',
        Town:'havana',
        id:11,
        options:[
            {
                destination: 'havana',
                text: 'back to town',
            },
        ]
    },
    {
        Name:'havanaMayor',
        Town:'havana',
        id:12,
        options:[
            {
                destination: 'havana',
                text: 'back to town',
            },
        ]
    },
    {
        Name:'havanaMerchant',
        Town:'havana',
        id:13,
        options:[
            {
                destination: 'havana',
                text: 'back to town',
            },
        ]
    },
    {
        Name:'havanaShipwright',
        Town:'havana',
        id:14,
        options:[
            {
                destination: 'havana',
                text: 'back to town',
            },
        ]
    },

    {
        Name:'nasau',
        Type:'townsquare',
        id:1,
        Town:'nasau',
        options:[
            {
                destination: 'nasauMayor',
                text: 'talk to the mayor',
            },
            {
                destination: 'nasauTavern',
                text: 'go to the Tavern',
            },
            {
                destination: 'nasauMerchant',
                text: 'trade with the merchant',
            },
            {
                destination: 'nasauShipwright',
                text: 'talk to the Shipwright',
            },
        ]
    }, //nasau
    {
        Name:'nasauTavern',
        Type:'tavern',
        Town:'nasau',
        id:11,
        options:[
            {
                destination: 'nasau',
                text: 'back to town',
            },
        ]
    },
    {
        Name:'nasauMayor',
        Town:'nasau',
        id:12,
        options:[
            {
                destination: 'nasau',
                text: 'back to town',
            },
        ]
    },
    {
        Name:'nasauMerchant',
        Town:'nasau',
        id:13,
        options:[
            {
                destination: 'nasau',
                text: 'back to town',
            },
        ]
    },
    {
        Name:'nasauShipwright',
        Town:'nasau',
        id:14,
        options:[
            {
                destination: 'nasau',
                text: 'back to town',
            },
        ]
    },

    {
        Name:'barbados',
        Type:'townsquare',
        Town:'barbados',
        id:1,
        options:[
            {
                destination: 'barbadosMayor',
                text: 'talk to the mayor',
            },
            {
                destination: 'barbadosTavern',
                text: 'go to the Tavern',
            },
            {
                destination: 'barbadosMerchant',
                text: 'trade with the merchant',
            },
            {
                destination: 'barbadosShipwright',
                text: 'talk to the Shipwright',
            },
        ]
    }, //barbados
    {
        Name:'barbadosTavern',
        Type:'tavern',
        Town:'barbados',
        id:11,
        options:[
            {
                destination: 'barbados',
                text: 'back to town',
            },
        ]
    },
    {
        Name:'barbadosMayor',
        Town:'barbados',
        id:12,
        options:[
            {
                destination: 'barbados',
                text: 'back to town',
            },
        ]
    },
    {
        Name:'barbadosMerchant',
        Town:'barbados',
        id:13,
        options:[
            {
                destination: 'barbados',
                text: 'back to town',
            },
        ]
    },
    {
        Name:'barbadosShipwright',
        Town:'barbados',
        id:14,
        options:[
            {
                destination: 'barbados',
                text: 'back to town',
            },
        ]
    }
]
const menStats = [
    {
        islandName:'havana',
        islandMen:30,
        islandMenRefreshRate:3,
        islandMenRefreshVariation:3,
        islandMenMax:60,
    },{
        islandName:'nasau',
        islandMen:30,
        islandMenRefreshRate:3,
        islandMenRefreshVariation:3,
        islandMenMax:60,
    },{
        islandName:'barbados',
        islandMen:30,
        islandMenRefreshRate:3,
        islandMenRefreshVariation:3,
        islandMenMax:60,
    }
]
const islandStats = [
{
    islandName: "havana",
    islandX: 650,
    islandY: 320,
    islandSize: 4,
    islandImage: "./src/download.jpg"
},{
    islandName: "nasau",
    islandX: 150,
    islandY: 650,
    islandSize: 4,
    islandImage: "./src/download.jpg"
},{
    islandName: "barbados",
    islandX: 0,
    islandY: -3500,
    islandSize: 4,
    islandImage: "./src/download.jpg"
}]

//WORLD DATA
//ship stats UNUSED
{
    shipType = 'sloop'
    hullHP = 10
    sailHP = 10
}
//Item stats UNUSED


