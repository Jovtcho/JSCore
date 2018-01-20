function calcTriangleArea(sideA, sideB, sideC) {
    let halfPerimeter = (sideA + sideB + sideC) / 2;
    let area = Math.sqrt(halfPerimeter * (halfPerimeter - sideA) * (halfPerimeter - sideB) * (halfPerimeter - sideC));

    return area;
}

console.log(calcTriangleArea(2, 3.5, 4));

