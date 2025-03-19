const http = require("http");
const url = require("url");


const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname.slice(1);
    const query = parsedUrl.query;

    const a = parseFloat(query.a);
    const b = parseFloat(query.b);

    if (isNaN(a) || isNaN(b)) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end("Invalid input! Please provide valid numbers for 'a' and 'b'.");
    }

    let result;
    switch (pathname) {
        case "add":
            result = a + b;
            break;
        case "subtract":
            result = a - b;
            break;
        case "multiply":
            result = a * b;
            break;
        case "divide":
            if (b === 0) {
                res.writeHead(400, { "Content-Type": "text/plain" });
                return res.end("Error: Division by zero is not allowed.");
            }
            result = a / b;
            break;
        default:
            res.writeHead(404, { "Content-Type": "text/plain" });
            return res.end("Invalid operation! Use /add, /subtract, /multiply, or /divide.");
    }

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Result: ${result}`);
});


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
