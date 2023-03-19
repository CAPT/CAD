import React from 'react'
import makerjs from 'makerjs'

const Gusset = (props) => {
    var line = {
        type: 'line',
        origin: [Number(props.startX), Number(props.startY)],
        //end: [props.width, props.height],
        end: [300, 300],
    }
    var line2 = {
        type: 'line',
        origin: [Number(props.startX), Number(props.startY)],
        //end: [props.width, props.height],
        end: [300, -300],
    }
    var line3 = {
        type: 'line',
        origin: [300, 300],
        //end: [props.width, props.height],
        end: [600, 0],
    }
    var line4 = {
        type: 'line',
        origin: [300, -300],
        //end: [props.width, props.height],
        end: [600, 0],
    }
    var horiz = {
        type: 'line',
        origin: [0, 0],
        //end: [props.width, props.height],
        end: [600, 0],
    }
    var vert = {
        type: 'line',
        origin: [300, 300],
        //end: [props.width, props.height],
        end: [300, -300],
    }
    var arc = {
        type: 'arc',
        origin: [0, 0],
        radius: 100,
        startAngle: 45,
        endAngle: 315,
    }
    var arc2 = {
        type: 'arc',
        origin: [600, 0],
        radius: 100,
        startAngle: 225,
        endAngle: 135,
    }

    var pathObject = {
        myLine: line,
        myLine2: line2,
        myLine3: line3,
        myLine4: line4,
        vert: vert,
        horiz: horiz,
        myArc: arc,
        myArc2: arc2,
    }

    var model = { paths: pathObject }

    const svg = makerjs.exporter.toSVG(model)
    document.write(`<div style="margin-bottom:20px">${svg}</div>`)
}

export default Gusset
