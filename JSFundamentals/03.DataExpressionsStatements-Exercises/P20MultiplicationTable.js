function generateMultiplicationTable(size) {
    let output = "<table border=\"1\">\n";

    for (let i = 0; i <= size; i++) {
        if (i !== 0) {
            output += `<th>${i}</th>`;
        } else {
            output += "  <tr><th>x</th>";
        }
    }

    output += "</tr>\n";

    for (let row = 1; row <= size; row++) {
        output += `  <tr><th>${row}</th>`;
        for (let col = 1; col <= size; col++) {
            output += `<td>${row * col}</td>`;
        }
        output += "</tr>\n";
    }


    output += "</table>\n";

    return output;
}


generateMultiplicationTable(5);

//  <tr><th>x</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr>
//  <tr><th>1</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr>
//  <tr><th>2</th><td>2</td><td>4</td><td>6</td><td>8</td><td>10</td></tr>
//  <tr><th>3</th><td>3</td><td>6</td><td>9</td><td>12</td><td>15</td></tr>
//  <tr><th>4</th><td>4</td><td>8</td><td>12</td><td>16</td><td>20</td></tr>
//  <tr><th>5</th><td>5</td><td>10</td><td>15</td><td>20</td><td>25</td></tr>
//