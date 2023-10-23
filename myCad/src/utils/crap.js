function utils() {
    function addPadding(model, padding) {
        makerjs.model.walk({}, function (modelContext, pathId, pathContext) {
            // Игнорируем вложенные модели и текст
            if (pathContext.type === 'model' || pathContext.type === 'text')
                return

            // Получаем координаты вершин пути
            var points = makerjs.path.toPoints(pathContext)

            // Находим центральную точку пути
            var center = makerjs.measure.pathCenter(points)

            // Перемещаем каждую вершину пути на нужное расстояние от центра
            for (var i = 0; i < points.length; i++) {
                var dx = center[0] - points[i][0]
                var dy = center[1] - points[i][1]
                var distance = Math.sqrt(dx * dx + dy * dy)
                points[i][0] += (dx / distance) * padding
                points[i][1] += (dy / distance) * padding
            }

            // Создаем новый путь с отступом
            var newPath = makerjs.path.moveRelative(
                points,
                center[0],
                center[1]
            )

            // Заменяем исходный путь на новый путь в контексте модели
            modelContext[pathId] = newPath
        })

        // Создаем новый прямоугольник, чтобы задать размеры модели с отступом
        var modelSize = makerjs.measure.modelExtents(model)
        var paddedRect = new makerjs.models.Rectangle(
            modelSize.width + padding * 2,
            modelSize.height + padding * 2
        )

        // Перемещаем модель внутрь отступа
        model.origin = [padding, padding]

        // Объединяем модель и отступ в единую модель
        var result = makerjs.model.combine(paddedRect, model)

        return result
    }

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

    function exportSvgToPdf() {
        var x = 1
        var y = 1
        var width = 238.95
        var height = 331.2
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: [500, 500],
        })
        const element = document.querySelector('#presentedSvg svg')
        doc.svg(element, {
            x,
            y,
            width,
            height,
        }).then(() => {
            // save the created pdf
            doc.save('myPDF.pdf')
        })
    }

    this.addPadding = addPadding
    this.segmentByStartAndLength = segmentByStartAndLength
    this.lineToLineUnderAngleWithLength = lineToLineUnderAngleWithLength
    this.exportSvgToPdf = exportSvgToPdf
}

export default utils

//var paddedModel = addPadding(mainModel, 20)
