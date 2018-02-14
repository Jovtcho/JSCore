function htmlEscape(input) {
    String.prototype.htmlEscape = function () {
        return this.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;")
    };

    let output = "<ul>\n";

    for (let str of input) {
        output += "  <li>";
        let newStr = str.htmlEscape();
        output += newStr;
        output += "</li>\n";
        //console.log(output);
    }

    output += "</ul>";
    return output;
}


console.log(htmlEscape(['<b>unescaped text</b>', 'normal text']));
console.log(htmlEscape(['<div style=\"color: red;\">Hello, Red!</div>', '<table><tr><td>Cell 1</td><td>Cell 2</td><tr>']));

// <	&lt;
// >	&gt;
// &	&amp;
// "	&quot;