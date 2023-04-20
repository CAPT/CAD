import React from 'react'
import makerjs from 'makerjs'
import { jsPDF } from 'jspdf'
import 'svg2pdf.js'
//import svg2img from 'svg2img'

const FrontSide2 = (props) => {
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

    var ab = {
        type: 'line',
        origin: [Number(props.startX), Number(props.startY)],
        end: [Number(props.startX), Number(props.startX) - props.vb],
    }

    console.log('ab:' + ab.origin + ' to ' + ab.end)

    var ac = {
        type: 'line',
        origin: ab.origin,
        end: [ab.origin[0], ab.origin[1] - props.vs],
    }

    console.log('ac:' + ac.origin + ' to ' + ac.end)

    var aa2 = {
        type: 'line',
        origin: ab.origin,
        end: [ab.origin[0] + props.ob / 4, ab.origin[1]],
    }

    console.log('aa2:' + aa2.origin + ' to ' + aa2.end)

    var a2b1 = {
        type: 'line',
        origin: aa2.end,
        end: [aa2.end[0], aa2.end[1] - props.vb],
    }

    console.log('a2b1:' + a2b1.origin + ' to ' + a2b1.end)

    var a2c1 = {
        type: 'line',
        origin: aa2.end,
        end: [aa2.end[0], aa2.end[1] - props.vs],
    }

    console.log('a2c1:' + a2c1.origin + ' to ' + a2c1.end)

    var aa3 = {
        type: 'line',
        origin: aa2.origin,
        end: [aa2.origin[0] + props.ot / 4, aa2.origin[1]],
    }

    console.log('aa3:' + aa3.origin + ' to ' + aa3.end)

    var a3b1 = {
        type: 'line',
        origin: aa3.end,
        end: [a2b1.end[0], a2b1.end[1]],
    }

    console.log('a3b1:' + a3b1.origin + ' to ' + a3b1.end)

    var a3d1 = segmentByStartAndLength(
        a3b1,
        makerjs.measure.pathLength(a3b1) / 2,
        a3b1.origin
    )

    var cl = {
        type: 'line',
        origin: ac.end,
        end: [ac.end[0], ac.end[1] - (props.ob * 0.1) / 2],
    }

    console.log('cl:' + cl.origin + ' to ' + cl.end)

    var ll1 = {
        type: 'line',
        origin: cl.end,
        end: [cl.end[0] + 25, cl.end[1]],
    }

    console.log('ll1:' + ll1.origin + ' to ' + ll1.end)

    var cc3 = {
        type: 'line',
        origin: ac.end,
        end: [ac.end[0] + 20, ac.end[1]],
    }

    console.log('cc3:' + cc3.origin + ' to ' + cc3.end)

    var b1d5 = segmentByStartAndLength(a3b1, -70, a3b1.end)

    var c3d5 = {
        type: 'line',
        origin: b1d5.end,
        end: [cc3.end[0], cc3.end[1]],
    }

    console.log('cc3:' + cc3.origin + ' to ' + cc3.end)

    var c3n = segmentByStartAndLength(
        c3d5,
        makerjs.measure.pathLength(c3d5) / 2,
        c3d5.origin
    )

    var nn1 = lineToLineUnderAngleWithLength(c3n, 270, props.ot / 30, c3n.end)

    var c3n2 = segmentByStartAndLength(
        c3d5,
        makerjs.measure.pathLength(c3d5) / 40,
        c3d5.origin
    )

    var n2n3 = lineToLineUnderAngleWithLength(
        c3n2,
        270,
        props.ot / 30,
        c3n2.end
    )

    var c3n1d5B = new makerjs.models.BezierCurve(
        [
            b1d5.end,
            [
                nn1.end[0] - makerjs.measure.pathLength(nn1) * 1.8, //props.ot * 0.003,
                nn1.end[1],
            ],
            // [
            //     n2n3.end[0] - makerjs.measure.pathLength(n2n3) * 1.8, //props.ot * 0.003,
            //     n2n3.end[1],
            // ],
            cc3.end,
        ],
        1
    )
    // alert(makerjs.measure.pathLength(nn1))

    var d5d6 = segmentByStartAndLength(b1d5, 40, b1d5.end)
    var d6a90 = {
        type: 'line',
        origin: d5d6.end,
        end: [ab.origin[0], d5d6.end[1]],
    }

    var a90a4 = {
        type: 'line',
        origin: d6a90.end,
        end: [d6a90.end[0], d6a90.end[1] - 15],
    }

    var a4ar5 = {
        type: 'line',
        origin: a90a4.end,
        end: [a90a4.end[0] + 5, a90a4.end[1]],
    }
    var d6a90Divided2 = segmentByStartAndLength(
        d6a90,
        makerjs.measure.pathLength(d6a90) / 2,
        d6a90.origin
    )

    var ar5D6B = new makerjs.models.BezierCurve(
        [
            a4ar5.end,
            [
                d6a90Divided2.end[0], //props.ot * 0.003,
                d6a90Divided2.end[1] - 18,
            ],

            d5d6.end,
        ],
        1
    )

    var c3l1B = new makerjs.models.BezierCurve(
        [cc3.end, [cc3.end[0] - 3, cc3.end[1] - 25], ll1.end],
        1
    )

    var pathObject = {
        ab,
        ac,
        aa2,
        a2b1,
        a2c1,
        aa3,
        //a3b1,
        a3d1,
        cl,
        ll1,
        cc3,
        b1d5,
        c3d5,
        c3n,
        nn1,
        // n2n3,
        d5d6,
        d6a90,
        a90a4,
        a4ar5,
        d6a90Divided2,
    }
    var modelsObject = { c3n1d5B, ar5D6B, c3l1B }

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

export default FrontSide2
