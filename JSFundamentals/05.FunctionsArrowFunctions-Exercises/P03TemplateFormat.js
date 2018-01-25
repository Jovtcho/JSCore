function quizAsXml(paramsArr) {
    let output = '<?xml version="1.0" encoding="UTF-8"?>\n';
    output += '<quiz>\n';

    function injectQandA(question, answer) {
        output += '  <question>\n' + '    ' + question + '\n  </question>\n';
        output += '  <answer>\n' + '    ' + answer + '\n  </answer>\n';
    }

    for (let index = 0; index < paramsArr.length; index += 2) {
        let questionText = paramsArr[index];
        let answerText = paramsArr[index + 1];
        injectQandA(questionText, answerText);
    }

    output += '</quiz>';

    return output;
}

// console.log(quizAsXml(["Who was the forty-second president of the U.S.A.?",
//     "William Jefferson Clinton"]));
console.log(quizAsXml(["Dry ice is a frozen form of which gas?", "Carbon Dioxide",
    "What is the brightest star in the night sky?", "Sirius"]));