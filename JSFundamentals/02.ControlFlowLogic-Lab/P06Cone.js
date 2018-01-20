function calcConeVolumeAndSurface(radius, height) {
    let volume = Math.PI * radius * radius * height / 3;
    let baseArea = Math.PI * radius * radius;
    let surroundingArea = Math.PI * radius * Math.sqrt(radius * radius + height * height);
    let area = baseArea + surroundingArea;

    console.log(`volume = ${volume}`);
    console.log(`area = ${area}`);
}

calcConeVolumeAndSurface(3, 5);
calcConeVolumeAndSurface(3.3, 7.8);
