    /// Prueba ///

    window.addEventListener('keydown',(key) => {
        // if (key.repeat) return;
        switch (key.code){
            case 'ArrowUp':
                ascenderSeleccion(menu.selector);
                break;
            case 'ArrowDown':
                descenderSeleccion(menu.selector);
                break;
        }
    });
