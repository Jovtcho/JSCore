function isFruitOtVegetable(input) {
    let output = "";
    switch (input) {
        case "banana":
        case "apple":
        case "kiwi":
        case "cherry":
        case "lemon":
        case "grapes":
        case "peach":
            output = "fruit";
            break;
        case "tomato":
        case "cucumber":
        case "pepper":
        case "onion":
        case "garlic":
        case "parsley":
            output = "vegetable";
            break;
        default:
            output = "unknown";
    }

    return output;
}

console.log(isFruitOtVegetable("banana"));
console.log(isFruitOtVegetable("cucumber"));
console.log(isFruitOtVegetable("pizza"));

