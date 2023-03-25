function addPadding(model, padding) {
    makerjs.model.walk({}, function (modelContext, pathId, pathContext) {
        // Игнорируем вложенные модели и текст
        if (pathContext.type === 'model' || pathContext.type === 'text') return

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
        var newPath = makerjs.path.moveRelative(points, center[0], center[1])

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
//var paddedModel = addPadding(mainModel, 20)
