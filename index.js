const app = new PIXI.Application(
    {

    }
);

document.body.appendChild(app.view);

const main_menu = new PIXI.Container();

app.stage.addChild(main_menu);