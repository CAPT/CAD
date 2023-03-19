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


const arc = new makerjs.paths.Arc(
    at.origin,
    radius,
    startAngle,
    endAngle,
    clockwise
)

    var pathObject = {
        an1: an1,
        n1n: n1n,
        at: at,
        at1: at1,
        tb: tb,
        t1b: t1b,
        t1g: t1g,
        ge: ge,
        ak: ak,
        kg: kg,
        nd: nd,
        dm1: dm1,
        m1m: m1m,

        // myLine3: line3,
        // myLine4: line4,
        // vert: vert,
        // horiz: horiz,
        // myArc: arc,
        // myArc2: arc2,
    }

    var model = { paths: pathObject }
    const convertedModel = makerjs.model.convertUnits(model, 'mm')

    const svg = makerjs.exporter.toSVG(model)
    document.write(`<div style="margin:20px">${svg}</div>`)
}

export default FrontSide
