function locateTreasure(paramsArr) {
    let islands = {
        Tuvalu: [1, 1, 3, 3],
        Tokelau: [8, 0, 9, 1],
        Samoa: [5, 3, 7, 6],
        Tonga: [0, 6, 2, 8],
        Cook: [4, 7, 9, 8]
    };

    function isInRange(x, y, island) {
        return ((island[0] <= x && x <= island[2]) && (island[1] <= y && y <= island[3]));
    }

    for (let index = 0; index < paramsArr.length; index += 2) {
        let xTreasure = paramsArr[index];
        let yTreasure = paramsArr[index + 1];

        let position = "";
        for (let island in islands) {
            let isOnIsland = isInRange(xTreasure, yTreasure, islands[island]);
            if (isOnIsland) {
                position = island;
                break;
            }
        }

        console.log(position !== "" ? position : "On the bottom of the ocean");
    }
}

locateTreasure([4, 2, 1.5, 6.5, 1, 3]);
locateTreasure([6, 4]);