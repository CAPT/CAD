import React from 'react'
import makerjs from 'makerjs'
import { jsPDF } from 'jspdf'
import 'svg2pdf.js'
//import svg2img from 'svg2img'

const BackSide2 = (props) => {
    console.log(props)

    // function exportSvgToPdf() {
    //     // выбираем SVG-элемент из документа

    //     var x = 1
    //     var y = 1
    //     var width = 238.95
    //     var height = 331.2
    //     const doc = new jsPDF({
    //         orientation: 'portrait',
    //         unit: 'mm',
    //         format: 'a4',
    //     })
    //     const element = document.querySelector('#presentedSvg svg')
    //     doc.svg(element, {
    //         x,
    //         y,
    //         width,
    //         height,
    //     }).then(() => {
    //         // save the created pdf
    //         doc.save('myPDF.pdf')
    //     })
    // }

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

    var a2b1 = {
        type: 'line',
        origin: [Number(props.startX), Number(props.startY)],
        end: [Number(props.startX), Number(props.startX) - props.vb],
    }

    console.log('a2b1:' + a2b1.origin + ' to ' + a2b1.end)

    var a2c1 = {
        type: 'line',
        origin: a2b1.origin,
        end: [a2b1.origin[0], a2b1.origin[1] - props.vs],
    }

    console.log('a2c1:' + a2c1.origin + ' to ' + a2c1.end)

    var a2a1 = {
        type: 'line',
        origin: a2b1.origin,
        end: [a2b1.origin[0] + props.ob / 4, a2b1.origin[1]],
    }

    console.log('a2a1:' + a2a1.origin + ' to ' + a2a1.end)

    var a1b2 = {
        type: 'line',
        origin: a2a1.end,
        end: [a2a1.end[0], a2a1.end[1] - props.vb],
    }

    console.log('a1b2:' + a1b2.origin + ' to ' + a1b2.end)

    var a1c2 = {
        type: 'line',
        origin: a2a1.end,
        end: [a2a1.end[0], a2a1.end[1] - props.vs],
    }

    console.log('a1c2:' + a1c2.origin + ' to ' + a1c2.end)

    var a4a1 = {
        type: 'line',
        origin: a2a1.origin,
        end: [a2a1.origin[0] - props.ot / 4, a2a1.origin[1]],
    }

    console.log('a4a1:' + a4a1.origin + ' to ' + a4a1.end)

    var a4b1 = {
        type: 'line',
        origin: a4a1.origin,
        end: [a2b1.end[0], a2b1.end[1]],
    }

    console.log('a4b1:' + a4b1.origin + ' to ' + a4b1.end)

    var a4d2 = segmentByStartAndLength(
        a4b1,
        makerjs.measure.pathLength(a4b1) / 2,
        a4b1.origin
    )

    var c2l4 = {
        type: 'line',
        origin: a1c2.end,
        end: [a1c2.end[0], a1c2.end[1] - (props.ob * 0.2) / 2],
    }

    console.log('c2l4:' + c2l4.origin + ' to ' + c2l4.end)

    var l4l6 = {
        type: 'line',
        origin: c2l4.end,
        end: [c2l4.end[0] - 25, c2l4.end[1]],
    }

    console.log('l4l6:' + l4l6.origin + ' to ' + l4l6.end)

    var b1d5 = segmentByStartAndLength(a4b1, -60, a4b1.end)

    // var c3d5 = {
    //     type: 'line',
    //     origin: b1d5.end,
    //     end: [cc3.end[0], cc3.end[1]],
    // }

    // console.log('cc3:' + cc3.origin + ' to ' + cc3.end)

    // var c3n = segmentByStartAndLength(
    //     c3d5,
    //     makerjs.measure.pathLength(c3d5) / 2,
    //     c3d5.origin
    // )

    // var nn1 = lineToLineUnderAngleWithLength(c3n, 270, 20, c3n.end)

    // var c3n1d5B = new makerjs.models.BezierCurve(
    //     [
    //         b1d5.end,
    //         [nn1.end[0] - makerjs.measure.pathLength(nn1) * 1.8, nn1.end[1]],
    //         cc3.end,
    //     ],
    //     1
    // )

    var d5d6 = segmentByStartAndLength(a4b1, -110, a4b1.end)

    var pathObject = {
        a2b1,
        a2c1,
        a2a1,
        a1c2,
        a4a1,
        a4b1,
        a4d2,
        c2l4,
        l4l6,
        d5d6,
        b1d5,
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
    /* const combinedMainPath = makerjs.model.combine(mainModel)
    var outerModel = makerjs.model.outline(combinedMainPath, 10, 1, false)
    combinedMainPath.layer = 'red'
    outerModel.layer = 'blue'

    var totalModel = {
        models: {
            combinedMainPath: combinedMainPath,
            outerModel: outerModel,
        },

        units: makerjs.unitType.Millimeter,
    }*/

    //var model = makerjs.model.combine(model, outline)
    const svgModel = makerjs.exporter.toSVG(mainModel)

    document.write(
        `<div id="presentedSvg" style="margin:${props.marginAmount}px">${svgModel}</div>`
    )
    // console.log(svgModel)

    // const image =
    //     '<svg xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="tiny" width="47.4" height="40.65" viewBox="21 18.5 158 135.5"><path d="M25,50 l150,0 0,100 -150,0 z" stroke-width="4" stroke="black" fill="rgb(128,224,255)" fill-opacity="1" ></path><path d="M25,50 L175,150 M25,150 L175,50" stroke-width="4" stroke="black" fill="black" ></path><g transform="translate(0,0)" stroke-width="4" stroke="black" fill="none" ><circle cx="100" cy="30" r="7.5" fill="black" ></circle><circle cx="70" cy="30" r="7.5" fill="black" ></circle><circle cx="130" cy="30" r="7.5" fill="black" ></circle></g></svg>'

    // var parser = new DOMParser()
    // var doccc = parser.parseFromString(svgModel, 'image/svg+xml')
    // console.log(doccc)
    // return (
    //     <>
    //         {/* <button onClick={exportSvgToPdf}>1232313</button> */}
    //         <div id="presentedSvg">
    //             <img
    //                 src={`data:image/svg+xml;utf8,${encodeURIComponent(
    //                     svgModel
    //                 )}`}
    //             />
    //             {/* <div dangerouslySetInnerHTML={{ __html: svgModel }} /> */}
    //         </div>
    //     </>
    // )

    //document.write(`<button onClick="exportSvgToPdf()" >1232313</button>`)
}

export default BackSide2
