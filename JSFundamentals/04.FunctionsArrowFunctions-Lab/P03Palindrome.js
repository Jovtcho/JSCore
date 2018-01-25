function isPalindrome(str) {
    let reversed = str.toString().split("").reverse().join("");

    return str === reversed;
}


console.log(isPalindrome("haha"));
console.log(isPalindrome("teset"));