// source:
// http://rectangleworld.com/blog/archives/413

export const setLinePoints = iterations => {
    let point
    const pointList = {}
    
    const lastPoint = { x: 1, y: 1 }
    let nextPoint
    let dx
    let newX
    let newY
    
    pointList.first = { x: 0, y: 1 }
    pointList.first.next = lastPoint

    for (let i = 0; i < iterations; i++) {
        point = pointList.first

        while (point.next != null) {
            nextPoint = point.next

            dx = nextPoint.x - point.x
            newX = 0.5 * (point.x + nextPoint.x)
            newY = 0.5 * (point.y + nextPoint.y)
            newY += dx * (Math.random() * 2 - 1)

            const newPoint = { x: newX, y: newY }

            //put between points
            newPoint.next = nextPoint
            point.next = newPoint

            point = nextPoint
        }
    }

    return pointList
};

export const getPolyPoints = (minBallSize, maxBallSize) => {

    const twoPi = 2 * Math.PI
    let point
    let rad
    let x0
    let y0
    let phase = 0

    //generate the random function that will be used to vary the radius, 9 iterations of subdivision
    var pointList = setLinePoints(6)

    var coordString = ''

    point = pointList.first

    while (point.next) {
        point = point.next
        phase = twoPi * point.x
        rad = minBallSize + point.y * (maxBallSize - minBallSize)
        x0 = rad * Math.cos(phase)
        y0 = rad * Math.sin(phase)

        coordString = coordString + (Math.round(x0 * 100) / 100 + ',' + Math.round(y0 * 100) / 100 + ' ')
    }

    console.log(coordString)
    

    return coordString
}
