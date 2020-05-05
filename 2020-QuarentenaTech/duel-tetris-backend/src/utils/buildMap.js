function buildMap(height,width){
    let yArray = []
    for (let heightCount = 0; heightCount < height;heightCount++){
        let xArray = []
        for (let widthCount = 0; widthCount < width;widthCount++){
            xArray.push(0)
        }
        yArray.push(xArray)
    }
    return yArray
}
module.exports = buildMap