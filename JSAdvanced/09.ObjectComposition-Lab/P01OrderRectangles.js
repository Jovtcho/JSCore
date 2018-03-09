function sortRectangles(paramsArr) {
    let rectanglesArr = [];
    for (let [width, height] of paramsArr) {
        let rectangle = createRectangle(width, height);
        rectanglesArr.push(rectangle);
    }

    function createRectangle(width, height) {
        let rectangle = {
            width: width,
            height: height,
            area: function () {
                return this.width * this.height;
            },
            compareTo: function (otherRectangle) {
                if (this.area() === otherRectangle.area()) {
                    return otherRectangle.width - this.width;
                }
                return otherRectangle.area() - this.area();
            }
        };

        return rectangle;
    }

    rectanglesArr.sort((rect1, rect2) => rect1.compareTo(rect2));
    return rectanglesArr;
}


console.log(sortRectangles([[10, 5], [3, 20], [5, 12], [20, 3], [30, 30], [45, 2]]));