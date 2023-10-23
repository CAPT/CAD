import React from 'react'
import makerjs from 'makerjs'

const Bra1 = (props) => {
    let Og = 890 //обхват груди
    let Opg = 800 //обхват под грудью
    let Cg = 180 //центр груди
    let Vng = 65 //высота низа груди-от основания груди до соска
    let Vd = 60 //высота декольте-до необходимой высоты по модели
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
    var ba = {
        type: 'line',
        origin: [Number(props.startX), Number(props.startY)],
        end: [Number(props.startX) + Og / 2, Number(props.startY)],
    }
    var bc = {
        type: 'line',
        origin: ba.origin,
        end: [ba.origin[0], ba.origin[1] + Vng],
    }
    var bd = {
        type: 'line',
        origin: ba.origin,
        end: [ba.origin[0], ba.origin[1] + Vng / 2],
    }
    var ce = {
        type: 'line',
        origin: bc.end,
        end: [bc.end[0], bc.end[1] + Vd - 1],
    }
    var ac1 = {
        type: 'line',
        origin: ba.end,
        end: [ba.end[0], ba.end[1] + Vng],
    }
    var ai = {
        type: 'line',
        origin: ba.end,
        end: [ba.end[0], ba.end[1] + Vng / 2],
    }
    var c1f = {
        type: 'line',
        origin: ac1.end,
        end: [ac1.end[0], ac1.end[1] + Vd - 1],
    }
    var di = {
        type: 'line',
        origin: bd.end,
        end: ai.end,
    }
    var cc1 = {
        type: 'line',
        origin: bc.end,
        end: ac1.end,
    }
    var ef = {
        type: 'line',
        origin: ce.end,
        end: c1f.end,
    }
    var c1h = {
        type: 'line',
        origin: cc1.end,
        end: [cc1.end[0] - 15, cc1.end[1]],
    }
    var c1c2 = {
        type: 'line',
        origin: cc1.end,
        end: [cc1.end[0] - Cg / 2, cc1.end[1]],
    }
    var im1 = {
        type: 'line',
        origin: ai.end,
        end: [ai.end[0] - (1 / 4) * Og - 10, ai.end[1]],
    }
    var c1n = {
        type: 'line',
        origin: c1c2.origin,
        end: [c1c2.origin[0] - (1 / 4) * Og, c1c2.origin[1]],
    }
    var m1n = {
        type: 'line',
        origin: im1.end,
        end: c1n.end,
    }
    var nn1 = segmentByStartAndLength(m1n, 35, m1n.end)

    var c2m1 = {
        type: 'line',
        origin: c1c2.end,
        end: im1.end,
    }

    var c2j = {
        type: 'line',
        origin: c1c2.end,
        end: [c1c2.end[0], c1c2.end[1] - Vng],
    }
    var lj = {
        type: 'line',
        origin: [c2j.end[0] - ((1 / 2) * Og - (1 / 2) * Opg), c2j.end[1]],
        end: c2j.end,
    }
    var kj = {
        type: 'line',
        origin: [c2j.end[0] + ((1 / 2) * Og - (1 / 2) * Opg), c2j.end[1]],
        end: c2j.end,
    }
    var c2l = {
        type: 'line',
        origin: c1c2.end,
        end: lj.origin,
    }
    var c2k = {
        type: 'line',
        origin: c1c2.end,
        end: kj.origin,
    }
    var kh = {
        type: 'line',
        origin: kj.end,
        end: c1h.end,
    }

    var pathObject = {
        ba,
        bc,
        bd,
        ce,
        ac1,
        ai,
        c1f,
        di,
        cc1,
        ef,
        c1h,
        c1c2,
        im1,
        c1n,
        m1n,
        nn1,
        c2m1,
        c2m1,
        c2j,
        lj,
        kj,
        c2l,
        c2k,
        kh
    }
    var modelsObject = {}

    const svgOptions = {
        useTitle: true,
    }

    var mainModel = {
        paths: pathObject,
        models: modelsObject,

        // units: makerjs.unitType.Millimeter,
    }
    //var model = makerjs.model.combine(model, outline)

    const svgModel = makerjs.exporter.toSVG(mainModel)
    document.write(
        `<div style="margin:${props.marginAmount}px">${svgModel}</div>`
    )
    // return <div>Bra1</div>
}
export default Bra1
