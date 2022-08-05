function parpadear(display, frecuencia = 1000){
    return setInterval(() => {display.visible = !display.visible}, frecuencia)
}
