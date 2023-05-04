import React from 'react'
import makerjs from 'makerjs'

const Bra1 = (props) => {
    let Og4 = 800 //обхват под грудью
    let Dgt = 240 //высота груди
    let Vng = 70 //высота низа груди
    let KoefRast = 1 //коэффициент растяжимости

    function segmentByStartAndLength(originLine, segmentLength, startPoint) {
        //откладывает на выбранной прямой отрезок указанной длины от startPoint
        const angle = Math.atan2(
            originLine.end[1] - originLine.origin[1],
            originLine.end[0] - originLine.origin[0]
        )
        const segmentEnd = makerjs.point.add(startPoint, [
            segmentLength * Math.cos(angle),
            segmentLength * Math.sin(angle),
        ])
        return new makerjs.paths.Line(startPoint, segmentEnd)
    }

    function lineToLineUnderAngleWithLength(
        originLine,
        angleInDegrees,
        length,
        startPoint
    ) {
        //откладвает прямую длины length под углом angleInDegrees к прямой originLine из startPoint
        var angleInRadians = makerjs.angle.toRadians(angleInDegrees)

        // Расчет угла наклона изначальной прямой
        var angleOfOriginLine = makerjs.angle.ofPointInDegrees(
            originLine.origin,
            originLine.end
        )
        // Перевод углов в радианы
        var angleInRadians = makerjs.angle.toRadians(
            angleOfOriginLine + angleInDegrees
        )

        // Расчет координат конца новой прямой
        var endX = startPoint[0] + length * Math.cos(angleInRadians)
        var endY = startPoint[1] + length * Math.sin(angleInRadians)
        var endPoint = [endX, endY]

        return new makerjs.paths.Line(startPoint, endPoint)
    }

    //lines
    var ag = {
        type: 'line',
        origin: [Number(props.startX), Number(props.startY)],
        end: [Number(props.startX) + Opb / 2, Number(props.startY)],
    }

    console.log('ag:' + ag.origin + ' to ' + ag.end)

    var pathObject = {}
    var modelsObject = {}

    const svgOptions = {
        useTitle: true,
    }
    var mainModel = {
        paths: pathObject,
        models: modelsObject,

        units: makerjs.unitType.Millimeter,
    }
    //var model = makerjs.model.combine(model, outline)
    const svgModel = makerjs.exporter.toSVG(totalModel)
    document.write(
        `<div style="margin:${props.marginAmount}px">${svgModel}</div>`
    )
    // return <div>Bra1</div>
}
export default Bra1
