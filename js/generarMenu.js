    class Ventana {
        constructor(opciones, estilos){
            this.display = generarTexto(0, 0, opciones, estilos); // Para dibujar la ventana
            this.opciones = generarOpciones(opciones, this.display); // Para guardar las opciones y asi acceder facilmente
            this.selector = new Selector(dibujarRectangulo(this.display.width,this.display.children[0].height), this, 0); // Por defecto quiero que ya cree el selector
        }
    }

    class Opcion {
        constructor(display, texto, evento){
            this.display = display;
            this.texto = texto;
            this.evento = evento;
        }
    }

    class Selector {
        constructor(display, ventana, indice = 0){
            this.display = display; // Para dibujar el rectangulo
            this.ventana = ventana; // Para guardar en la ventana donde va a ser creado
            this.indice = indice; // Para saber en que indice esta
        }
    }

    // Funciones

    const dibujarRectangulo = (ancho, alto) => {
        const rectangulo = new PIXI.Graphics();
        rectangulo.beginFill(0xfffffff)
            .drawRect(0, 0, ancho, alto)
            .endFill();

        return rectangulo;
    }

    const escribirConsola = (texto) => {
        console.log(texto);
    }

    function llamarEvento(evento, parametro){
        evento(parametro);
    };
    
    function generarTexto(x = 0, y = 0, opciones, estilos){
        const espacioEntreLineas = 10; // Esta en pixeles
        const display = new PIXI.Container(); // Donde se guardan las lineas de texto

        for(let i = 0; i < opciones.length; i++){
            const texto = new PIXI.Text(opciones[i].texto, estilos);
            texto.x = x;
            texto.y = y + ((texto.height + espacioEntreLineas) * i);

            display.addChild(texto);
        }

        return display
    };

    function generarOpciones(opciones,display){
        const ops = [];
        let opcionActual;

        for (let i = 0; i < opciones.length; i++){
            opcionActual = opciones[i];
            ops[i] = new Opcion(display.children[i], opcionActual.texto, opcionActual.evento);
        };

        return ops;
    };

    function reiniciarAnimacion(objeto){
        clearInterval(objeto.anim);
        objeto.display.visible = true;
        objeto.anim = objeto.animFunc(objeto.display, objeto.animVel);
    }

    function descenderSeleccion(selector){
        if (selector.indice == selector.ventana.opciones.length - 1){
            selector.indice = 0
            selector.display.position = selector.ventana.opciones[selector.indice].display.position;
        }
        else {
            selector.indice++;
            selector.display.position = selector.ventana.opciones[selector.indice].display.position;
        }
        reiniciarAnimacion(selector);
        
    };

    function ascenderSeleccion(selector){
        if (selector.indice == 0){
            selector.indice = selector.ventana.opciones.length - 1
            selector.display.position = selector.ventana.opciones[selector.indice].display.position;
        }
        else {
            selector.indice--;
            selector.display.position = selector.ventana.opciones[selector.indice].display.position;
        }

        reiniciarAnimacion(selector);
    };

    function crearMenuPrincipal(){
        // Crear los estilos
        
        const menuEstilos = new PIXI.TextStyle(
            {
                fill: 'white',
                fontSize: '25px',
                fontFamily: 'Courier New'
            }
        );

        // Crear el menu

        const menu = new Ventana(
            [{texto: "Nueva Partida", evento: escribirConsola},
            {texto: "Cargar Partida", evento: escribirConsola},
            {texto: "Opciones", evento: escribirConsola},
            {texto: "Salir", evento: escribirConsola}],
            menuEstilos
            );
    
        menu.display.pivot.set(menu.display.width / 2, menu.display.height / 2);
        menu.display.position.set(app.screen.width / 2, app.screen.height / 2);

        // Configurar Selector

        menu.selector.display.alpha = 0.25;
        menu.selector.animFunc = parpadear;
        menu.selector.animVel = 500;
        menu.selector.anim = menu.selector.animFunc(menu.selector.display, menu.selector.animVel)// la variable guarda el valor que devuelve el setInterval()

        // Agregar el selector

        menu.display.addChild(menu.selector.display);

        return menu;
    };

    // Agregar a la escena

    const menu = crearMenuPrincipal();
    main_menu.addChild(menu.display);
