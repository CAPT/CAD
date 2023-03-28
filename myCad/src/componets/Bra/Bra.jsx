import React from 'react'
import makerjs from 'makerjs'

const Bra = (props) => {
    let Opb = 800 //обхват под грудью
    let Vg = 240 //высота груди
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

    var ag1 = {
        type: 'line',
        origin: ag.origin,
        end: [ag.origin[0] + Opb / 4, ag.origin[1]],
    }
    console.log('ag1:' + ag1.origin + ' to ' + ag1.end)

    var ag2 = {
        type: 'line',
        origin: ag1.origin,
        end: [ag.origin[0] + Opb / 8, ag.origin[1]],
    }
    console.log('ag2:' + ag2.origin + ' to ' + ag2.end)

    var g1v = {
        type: 'line',
        origin: ag1.end,
        end: [ag1.end[0], ag1.end[1] + Vng + 20],
    }
    console.log('g1v' + g1v.origin + ' to ' + g1v.end)

    var g2v1 = {
        type: 'line',
        origin: ag2.end,
        end: [ag2.end[0], ag2.end[1] + Vg / 2 + Vng],
    }
    console.log('g2v1' + g2v1.origin + ' to ' + g2v1.end)

    var v1v2 = {
        type: 'line',
        origin: g2v1.end,
        end: [g2v1.end[0] - 10, g2v1.end[1]],
    }
    console.log('v1v2' + v1v2.origin + ' to ' + v1v2.end)

    var av3 = {
        type: 'line',
        origin: ag.origin,
        end: [ag.origin[0], ag.origin[1]+Vng+20],
    }
    console.log('av3' + av3.origin + ' to ' + av3.end)

     var ac = {
         type: 'line',
         origin: ag.origin,
         end: [ag.origin[0], (av3.end[1]-ag.origin[1] )/2],
     }
    console.log('ac' + ac.origin + ' to ' + ac.end)
    
     var cc1 = {
         type: 'line',
         origin: ac.end,
         end: [ac.end[0]+8, ac.end[1]],
     }
    console.log('cc1' + cc1.origin + ' to ' + cc1.end)
    
     var gz = {
         type: 'line',
         origin: ag.end,
         end: [ag.end[0], ag.end[1] + 40],
     }
     console.log('gz' + gz.origin + ' to ' + gz.end)

    //curves
    var pathObject = { ag, ag1, ag2, g1v, g2v1, v1v2, av3, ac, cc1, gz }
    var modelsObject = {}

    const svgOptions = {
        useTitle: true,
    }
    var mainModel = {
        paths: pathObject,
        models: modelsObject,

        // units: makerjs.unitType.Millimeter,
    }
    const combinedMainPath = makerjs.model.combine(mainModel)
    //  var outerModel = makerjs.model.outline(combinedMainPath, 10, 1, false)
    //  combinedMainPath.layer = 'red'
    //  outerModel.layer = 'blue'

    var totalModel = {
        models: {
            combinedMainPath: combinedMainPath,
            //  outerModel: outerModel,
        },

        units: makerjs.unitType.Millimeter,
    }

    //var model = makerjs.model.combine(model, outline)
    const svgModel = makerjs.exporter.toSVG(totalModel)
    document.write(
        `<div style="margin:${props.marginAmount}px">${svgModel}</div>`
    )
    // return <div>Bra</div>
}
export default Bra
