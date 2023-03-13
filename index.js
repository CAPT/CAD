var makerjs = require('./maker/makerjs')
var plate = {
    models: {
        outer: makerjs.model.center(
            new makerjs.models.RoundRectangle(120, 100, 10)
        ),
        bolts: makerjs.model.center(
            new makerjs.models.BoltRectangle(100, 80, 5)
        ),
    },
    paths: {
        hole: new makerjs.paths.Circle(25),
    },
}

var svg = makerjs.exporter.toSVG(plate)

document.write(svg)
