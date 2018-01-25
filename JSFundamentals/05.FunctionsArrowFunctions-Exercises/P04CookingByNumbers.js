function cooking(paramsArr) {
    let num = Number(paramsArr[0]);

    function cook(num, func) {
        return func(num);
    }

    function getCookOp(cookOp) {
        switch (cookOp) {
            case "chop":
                return num => num / 2;
            case "dice":
                return num => Math.sqrt(num);
            case "spice":
                return num => num + 1;
            case "bake":
                return num => num * 3;
            case "fillet":
                return num => num - num * 20 / 100;
        }
    }

    for (let index = 1; index < paramsArr.length; index++) {
        num = cook(num, getCookOp(paramsArr[index]));
        console.log(num);
    }
}

cooking([32, "chop", "chop", "chop", "chop", "chop"]);
cooking([9, "dice", "spice", "chop", "bake", "fillet"]);