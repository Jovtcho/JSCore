function parseScoreToHtml(json) {
    let elements = JSON.parse(json);
    let output = "<table>\n";
    output += "  <tr><th>name</th><th>score</th></tr>\n";

    for (let element of elements) {
        let name = escapeHtml(element.name);
        let score = Number(element.score);
        output += `  <tr><td>${name}</td><td>${score}</td></tr>\n`;
    }

    output += "</table>";

    function escapeHtml(text) {
        return text.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;")
    }

    return output;
}


//console.log(scoreToHtml('[{"name":"Pesho","score":479},{"name":"Gosho","score":205}]'));
console.log(scoreToHtml('[{"name":"Pesho & Kiro","score":479},{"name":"Gosho, Maria & Viki","score":205}]'));
