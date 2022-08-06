    class Ventana {
        constructor(opciones, estilos){
            this.display = generarTexto(0, 0, opciones, estilos);
            this.opciones = generarOpciones(opciones, this.display);
    class Opcion {
        constructor(display, texto, evento){
            this.display = display;
            this.texto = texto;
            this.evento = evento;
        }
    }

    class Selector {
        constructor(display, ventana, indice = 0){
            this.display = display;
            this.ventana = ventana;
            this.indice = indice;
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

    function generarOpciones(opciones,display){
        const ops = [];
        for (let i = 0; i < opciones.length; i++){
            ops[i] = {
                display: display.children[i],
                texto: opciones[i]
            };
        };

        return ops;
    };

    function descenderSeleccion(seleccion){
        if (seleccion.indice == seleccion.ventana.opciones.length - 1){
            seleccion.indice = 0
            seleccion.display.position = seleccion.ventana.opciones[seleccion.indice].display.position;
        }
        else {
            seleccion.indice++;
            seleccion.display.position = seleccion.ventana.opciones[seleccion.indice].display.position;
        }
    };

    function ascenderSeleccion(seleccion){
        if (seleccion.indice == 0){
            seleccion.indice = seleccion.ventana.opciones.length - 1
            seleccion.display.position = seleccion.ventana.opciones[seleccion.indice].display.position;
        }
        else {
            seleccion.indice--;
            seleccion.display.position = seleccion.ventana.opciones[seleccion.indice].display.position;
        }
    };

    const dibujar = function(ancho, alto){
        const rectangulo = new PIXI.Graphics();
        rectangulo.beginFill(0xfffffff)
            .drawRect(0, 0, ancho, alto)
            .endFill();

        return rectangulo;
    }

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

    const seleccion = new Selector(dibujar(menu.display.width,menu.display.children[0].height), menu, 0);

    seleccion.display.alpha = 0.25;
    seleccion.display.position = seleccion.ventana.opciones[seleccion.indice].display.position;

    main_menu.addChild(menu.display);
    menu.display.addChild(seleccion.display);

    
    // parpadear(seleccion.display, 500);
