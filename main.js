
function initST(app) {
    // create a text object with a nice stroke
    let spinningText = new PIXI.Text('I\'m very fun!', {
        fontWeight: 'bold',
        fontSize: 60,
        fontFamily: 'Arial',
        fill: '#cc00ff',
        align: 'center',
        stroke: '#FFFFFF',
        strokeThickness: 6
    });

    // setting the anchor point to 0.5 will center align the text... great for spinning!
    spinningText.anchor.set(0.5);
    spinningText.x = app.screen.width / 2;
    spinningText.y = app.screen.height / 2;
        app.stage.addChild(spinningText);

    app.ticker.add(function() {
        // let's spin the spinning text
        spinningText.rotation += 0.03;
    });
}

function initall(app, img){

  initST(app);


  // create a texture from an image path
  let texture = PIXI.Texture.fromImage('https://raw.githubusercontent.com/pixijs/examples/gh-pages/examples/assets/bunny.png', true);
  //let texture = PIXI.Texture.fromImage(img);

  // Scale mode for pixelation
  texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  for (let i = 0; i < 10; i++) {
    let rx = Math.floor(Math.random() * app.screen.width);
    let ry = Math.floor(Math.random() * app.screen.height);
    let sprite = createDraggable(rx, ry, texture);
    app.stage.addChild(sprite);
  }
}

function createDraggable(x, y, texture) {
  let sprite1 = new PIXI.Sprite(texture);
  sprite1.interactive = true;
  sprite1.buttonMode = true;
  sprite1.anchor.set(0.5);

  // make it a bit bigger, so it's easier to grab
  //sprite1.scale.set(3);

  // setup events for mouse + touch using
  // the pointer events
  sprite1
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);

  // move the sprite to its designated position
  sprite1.x = x;
  sprite1.y = y;
  return sprite1;
}

function onDragStart(event) {
  this.data = event.data;
  this.alpha = 0.5;
  this.dragging = true;
}

function onDragEnd() {
  this.dragging = false;
  this.alpha = 1;
  // set the interaction data to null
  this.data = null;
}

function onDragMove() {
  if (this.dragging) {
    let newPosition = this.data.getLocalPosition(this.parent);
    this.x = newPosition.x;
    this.y = newPosition.y;
  }
}

let PIXI_APP = new PIXI.Application({
    width: 800,
    height: 300,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio || 1
  });
document.body.appendChild(PIXI_APP.view);
initall(PIXI_APP, null);
