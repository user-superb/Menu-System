const app = new PIXI.Application(
    {
        
    }
);

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

document.querySelector('#juego').appendChild(app.view);

const main_menu = new PIXI.Container();

app.stage.addChild(main_menu);
