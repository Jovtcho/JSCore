function modifyNumber(num) {
    let strNum = String(num);
    let average = str => str.split("").map(Number).reduce((acc, curr) => acc + curr, 0) / strNum.length;

    while (average(strNum) <= 5) {
        strNum += "9";
    }

    console.log(strNum);
}


modifyNumber(101);
modifyNumber(5835);