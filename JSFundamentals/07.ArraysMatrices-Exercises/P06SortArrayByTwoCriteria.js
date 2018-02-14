function sortArrByTwoCriteria(arr) {
    function compare(str1, str2) {
        if (str1.length === str2.length) {
            return str1 > str2;
        }

        return str1.length - str2.length;
    }

    return arr.sort((a, b) => compare(a, b)).join("\n");
}

//console.log(sortArrByTwoCriteria(["alpha", "beta", "gamma"]));
//console.log(sortArrByTwoCriteria(["Isacc", "Theodor", "Jack", "Harrison", "George"]));
console.log(sortArrByTwoCriteria(["test", "Deny", "omen", "Default"]));

