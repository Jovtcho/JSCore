function parseJsonToTable(paramsArr) {
    let output = "<table>\n";
    for (let line of paramsArr) {
        let employee = JSON.parse(line);
        let name = escapeHtml(employee.name);
        let position = escapeHtml(employee.position);
        let salary = escapeHtml(String(employee.salary));

        output += "\t<tr>\n";
        output += `\t\t<td>${name}</td>\n`;
        output += `\t\t<td>${position}</td>\n`;
        output += `\t\t<td>${Number(salary)}</td>\n`;
        output += "\t<tr>\n";

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

console.log(parseJsonToTable([
    '{"name":"Pesho","position":"Promenliva","salary":100000}',
    '{"name":"Teo","position":"Lecturer","salary":1000}',
    '{"name":"Georgi","position":"Lecturer","salary":1000}'
]));;