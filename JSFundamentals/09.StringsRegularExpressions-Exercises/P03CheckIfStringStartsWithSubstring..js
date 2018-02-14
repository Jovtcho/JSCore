function isStartWithSubstr(str, subStr) {
    //let isStartWith = str.substring(0, subStr.length) === subStr;
    let isStartWith = str.startsWith(subStr);

    return isStartWith;
}

console.log(isStartWithSubstr("How have you been?", "how"));
console.log(isStartWithSubstr("Marketing Fundamentals, starting 19/10/2016", "Marketing Fundamentals, sta"));