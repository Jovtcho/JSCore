function fromJSONToHTMLTable(json) {
    let elements = JSON.parse(json);
    let columns = Object.keys(elements[0]);

    let output = "<table>\n";
    output += "   <tr>";
    for (let column of columns) {
        output += `<th>${escapeHtml(column)}</th>`;
    }
    output += "</tr>\n";

    for (let element of elements) {
        output += "   <tr>";
        for (let index = 0; index < columns.length; index++) {
            let text = escapeHtml(String(element[columns[index]]));
            output += `<td>${text}</td>`;
        }
        output += "</tr>\n";
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

//console.log(convertJsonToHtmlTable('[{"Name":"Tomatoes & Chips","Price":2.35},{"Name":"J&B Chocolate","Price":0.96}]'));
console.log(convertJsonToHtmlTable('[{"Name":"Pesho <div>-a","Age":20,"City":"Sofia"},' +
    '{"Name":"Gosho","Age":18,"City":"Plovdiv"}, {"Name":"Angel","Age":18,"City":"Veliko Tarnovo"}]'));

