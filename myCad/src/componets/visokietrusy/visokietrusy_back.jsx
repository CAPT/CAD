import React from 'react'
import makerjs from 'makerjs'
import { jsPDF } from 'jspdf'
import 'svg2pdf.js'

const Visokietrusy_back = (props) => {
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
    //[ab.origin[0]  ----- ЭТО ИКС!!!!!,
    //ab.origin[1] - ЭТО ИГРЕК!!!!!!
    var ab = {
        type: 'line',
        origin: [Number(props.startX), Number(props.startY)],
        end: [Number(props.startX), Number(props.startX) - props.vb],
    }
    console.log('ab:' + ab.origin + ' to ' + ab.end)

    var ac = {
        type: 'line',
        origin: ab.origin,
        end: [Number(props.startX) + props.ot, ab.origin[1]],
    }

    console.log('ac:' + ac.origin + ' to ' + ac.end)

    var bc = {
        type: 'line',
        origin: ab.end,
        end: ac.end,
    }

    console.log('bc:' + bc.origin + ' to ' + bc.end)

    var pathObject = {
        ab,
        ac,
        bc,
    }

    var modelsObject = {}

    const svgOptions = {
        useTitle: true,
    }
    var mainModel = {
        paths: pathObject,
        models: modelsObject,

        units: makerjs.unitType.Millimeter,
    }

    const svgModel = makerjs.exporter.toSVG(mainModel)

    document.write(
        `<div id="presentedSvg" style="margin:${props.marginAmount}px">${svgModel}</div>`
    )
}

export default Visokietrusy_back
