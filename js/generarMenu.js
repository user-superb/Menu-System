    class Ventana {
        constructor(opciones, estilos){
            this.display = generarTexto(0, 0, opciones, estilos); // Para dibujar la ventana
            this.opciones = generarOpciones(opciones, this.display); // Para guardar las opciones y asi acceder facilmente
            this.selector = new Selector(dibujarRectangulo(this.display.width,this.display.children[0].height), this, 0);
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

    const dibujarRectangulo = function(ancho, alto){
        const rectangulo = new PIXI.Graphics();
        rectangulo.beginFill(0xfffffff)
            .drawRect(0, 0, ancho, alto)
            .endFill();

        return rectangulo;
    }
    
    function generarTexto(x = 0, y = 0, opciones, estilos){
        const espacioEntreLineas = 10; // Esta en pixeles
        const display = new PIXI.Container(); // Donde se guardan las lineas de texto

        for(let i = 0; i < opciones.length; i++){
            const texto = new PIXI.Text(opciones[i], estilos);
            texto.x = x;
            texto.y = y + ((texto.height + espacioEntreLineas) * i);

            display.addChild(texto);
        }

        return display
    };

    function generarOpciones(opciones,display){
        const ops = [];
        for (let i = 0; i < opciones.length; i++){
            ops[i] = new Opcion(display.children[i], opciones[i]);
        };

        return ops;
    };

    function descenderSeleccion(selector){
        if (selector.indice == selector.ventana.opciones.length - 1){
            selector.indice = 0
            selector.display.position = selector.ventana.opciones[selector.indice].display.position;
        }
        else {
            selector.indice++;
            selector.display.position = selector.ventana.opciones[selector.indice].display.position;
        }

        // Reinicia la animacion

        clearInterval(selector.anim);
        selector.display.visible = true;
        selector.anim = menu.selector.animFunc(selector.display, selector.animVel);
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

        // Reinicia la animacion

        clearInterval(selector.anim);
        selector.display.visible = true;
        selector.anim = menu.selector.animFunc(selector.display, selector.animVel);
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
            ["Nueva Partida","Cargar Partida","Opciones","Salir"],
            menuEstilos
            );
    
        menu.display.pivot.set(menu.display.width / 2, menu.display.height / 2);
        menu.display.position.set(app.screen.width / 2, app.screen.height / 2);

        // Configurar Selector

        menu.selector.display.alpha = 0.25;
        menu.selector.animFunc = parpadear;
        menu.selector.animVel = 500;
        menu.selector.anim =  menu.selector.animFunc(menu.selector.display, menu.selector.animVel)// la variable guarda el valor que devuelve el setInterval()

        // Agregar el selector

        menu.display.addChild(menu.selector.display);

        return menu;
    };

    // Agregar a la escena

    const menu = crearMenuPrincipal();
    main_menu.addChild(menu.display);
