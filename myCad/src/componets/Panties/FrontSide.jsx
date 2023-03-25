import React from 'react'
import makerjs from 'makerjs'

const FrontSide = (props) => {
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

    var an1 = {
        type: 'line',
        origin: [Number(props.startX), Number(props.startY)],
        end: [Number(props.startX), -props.gs /*minus(props.gs)*/],
    }

    console.log('an1:' + an1.origin + ' to ' + an1.end)

    var n1n = {
        type: 'line',
        origin: an1.end,
        //end: [props.width, props.height],
        end: [an1.end[0], an1.end[1] - Number(props.ob) / 10 + 10],
    }
    console.log('n1n:' + n1n.origin + ' to ' + n1n.end)

    var at = {
        type: 'line',
        origin: [Number(props.startX), Number(props.startY)],
        end: [props.ob / 4, Number(props.startY)],
    }
    console.log('at:' + at.origin + ' to ' + at.end)

    var at1 = {
        type: 'line',
        origin: [Number(props.startX), Number(props.startY)],
        end: [props.ob / 4 - 20, Number(props.startY)],
    }
    console.log('at1:' + at1.origin + ' to ' + at1.end)

    var tb = {
        type: 'line',
        origin: at.end,
        end: [at.end[0], -props.vb],
    }
    console.log('tb:' + tb.origin + ' to ' + tb.end)

    var t1b = {
        type: 'line',
        origin: at1.end,
        end: tb.end,
    }
    console.log('t1b:' + t1b.origin + ' to ' + t1b.end)

    var t1g = segmentByStartAndLength(t1b, 60, t1b.origin)

    console.log('t1g:' + t1g.origin + ' to ' + t1g.end)

    var ge = segmentByStartAndLength(t1b, 40, t1g.end)
    console.log('ge:' + ge.origin + ' to ' + ge.end)

    var ak = {
        type: 'line',
        origin: at.origin,
        end: [at.origin[0], -80],
    }
    console.log('ak:' + ak.origin + ' to ' + ak.end)

    var kg = {
        type: 'line',
        origin: ak.end,
        end: ge.origin,
    }
    console.log('kg:' + kg.origin + ' to ' + kg.end)

    console.log('an1:' + an1.origin + ' to ' + an1.end)
    var nd = {
        type: 'line',
        origin: n1n.end,
        end: [n1n.end[0], n1n.end[1] - makerjs.measure.pathLength(n1n) / 4],
    }

    console.log('nd:' + nd.origin + ' to ' + nd.end)

    var dm1 = {
        type: 'line',
        origin: nd.end,
        end: [nd.end[0] + 35, nd.end[1]],
    }

    console.log('dm1:' + dm1.origin + ' to ' + dm1.end)

    var m1m = {
        type: 'line',
        origin: dm1.end,
        end: [dm1.end[0], dm1.end[1] + 10],
    }

    console.log('m1m:' + m1m.origin + ' to ' + m1m.end)

    //пропустили дугу

    var kc = {
        type: 'line',
        origin: kg.origin,
        end: [kg.origin[0], kg.origin[1] - 10],
    }
    console.log('kc:' + kc.origin + ' to ' + kc.end)

    var cc1 = {
        type: 'line',
        origin: kc.end,
        end: [kc.end[0] + 20, kc.end[1]],
    }
    console.log('cc1:' + cc1.origin + ' to ' + cc1.end)

    var cn1 = {
        type: 'line',
        origin: cc1.origin,
        end: n1n.end,
    }
    var gg1 = lineToLineUnderAngleWithLength(ge, 270, 15, kg.end)
    console.log('gg1:' + gg1.origin + ' to ' + gg1.end)

    var ee1 = lineToLineUnderAngleWithLength(ge, 270, 15, ge.end)
    console.log('ee1:' + ee1.origin + ' to ' + ee1.end)

    var g1e1 = {
        type: 'line',
        origin: gg1.end,
        end: ee1.end,
    }
    console.log('g1e1:' + g1e1.origin + ' to ' + g1e1.end)

    var em = {
        type: 'line',
        origin: ee1.origin,
        end: m1m.end,
    }
    console.log('em:' + em.origin + ' to ' + em.end)

    var ev = segmentByStartAndLength(
        em,
        makerjs.measure.pathLength(em) / 2,
        em.origin
    )
    console.log('ev:' + ev.origin + ' to ' + ev.end)

    var vv1 = lineToLineUnderAngleWithLength(em, 270, 70, ev.end)
    console.log('vv1:' + vv1.origin + ' to ' + vv1.end)

    var v1v2 = segmentByStartAndLength(vv1, 25, vv1.end) //строим 3 невидимых вспомогательных для правильной дуги mv2e1B
    var v2v2_BOT = lineToLineUnderAngleWithLength(v1v2, 90, 105, v1v2.end)
    var v2v2_TOP = lineToLineUnderAngleWithLength(v1v2, 270, 25, v1v2.end)

    //var mv2e1B = new makerjs.models.BezierCurve(em.end, v1v2.end, ee1.end, 5)
    var mv2e1B = new makerjs.models.BezierCurve(
        em.end,
        v2v2_BOT.end,
        v2v2_TOP.end,
        ee1.end,
        5
    )
    //console.log(JSON.parse(JSON.stringify(mv1e1)))
    //d-m
    //строим 2 невидимых вспомогательных для правильной дуги dmB
    var m1m2 = segmentByStartAndLength(
        m1m,
        makerjs.measure.pathLength(m1m) / 15,
        m1m.origin
    )
    var m2m3 = lineToLineUnderAngleWithLength(m1m2, 270, -10, m1m2.end)
    console.log('vv1:' + vv1.origin + ' to ' + vv1.end)
    var dmB = new makerjs.models.BezierCurve(m1m.end, m2m3.end, nd.end, 100)

    var c1c2 = segmentByStartAndLength(cc1, 55, cc1.end)
    var c1g1B = new makerjs.models.BezierCurve(cc1.end, c1c2.end, gg1.end, 100)

    var pathObject = {
        //an1: an1,
        cn1,
        n1n: n1n,
        // at: at,
        //at1: at1,
        //tb: tb,
        //t1b: t1b,
        // t1g: t1g,
        // ge: ge,
        //ak: ak,
        //kg: kg,
        nd: nd,
        //dm1: dm1,
        //m1m: m1m,
        //kc: kc,
        //gg1: gg1,
        // ee1: ee1,
        g1e1: g1e1,
        //em: em,
        // ev: ev,
        //vv1: vv1,
        cc1: cc1,
        //  c1c2,
    }
    var modelsObject = { mv2e1B, dmB, c1g1B }

    const svgOptions = {
        useTitle: true,
    }
    var mainModel = {
        paths: pathObject,
        models: modelsObject,

        // units: makerjs.unitType.Millimeter,
    }
    const combinedPath = makerjs.model.combine(mainModel)
    var outerModel = makerjs.model.outline(combinedPath, 10, 1, false)

    var totalModel = {
        models: {
            combinedPath: combinedPath,
            outerModel: outerModel,
        },

        units: makerjs.unitType.Millimeter,
    }

    //var model = makerjs.model.combine(model, outline)
    const svg = makerjs.exporter.toSVG(totalModel)
    document.write(`<div style="margin:20px">${svg}</div>`)
}

export default FrontSide
