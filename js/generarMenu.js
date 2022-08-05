    class Ventana {
        constructor(opciones, estilos){
            this.display = generarTexto(0, 0, opciones, estilos);
            this.opciones = opciones;
            this.opcionActual = 0;
        }
    }
    
    const espacioEntreLineas = 10; // Pixeles
    
    function generarTexto(x = 0, y = 0, opciones, estilos){
        const contenedor = new PIXI.Container();

        for(let i = 0; i < opciones.length; i++){
            const texto = new PIXI.Text(opciones[i], estilos);
            texto.x = x;
            texto.y = y + ((texto.height + espacioEntreLineas) * i);

            contenedor.addChild(texto);
        }

        return contenedor
    };

    const MENU_ESTILO = new PIXI.TextStyle(
        {
            fill: 'white',
            align: 'right',
            fontSize: '25px',
            fontFamily: 'Courier New'
        }
    );
    const menu = new Ventana(["Nueva Partida","Cargar Partida","Opciones","Salir"], MENU_ESTILO);
    menu.display.pivot.set(menu.display.width / 2, menu.display.height / 2);
    menu.display.position.set(app.screen.width / 2, app.screen.height / 2);

    main_menu.addChild(menu.display);