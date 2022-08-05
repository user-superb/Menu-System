    /// Prueba ///

    window.addEventListener('keydown',(key) => {
        // if (key.repeat) return;
        switch (key.code){
            case 'ArrowUp':
                ascenderSeleccion(seleccion);
                break;
            case 'ArrowDown':
                descenderSeleccion(seleccion);
                break;
        }
    });
