    const $escala = document.querySelector('#escala');

    $escala.addEventListener('change', (event) =>{
        app.view.width = 800 * $escala.value;
        app.view.height = 600 * $escala.value;
        app.stage.scale.set($escala.value);
    });
