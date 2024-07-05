const http = require('http');

for (let i = 0; i < 100; i++) {
    setTimeout(() => {
        const request = http.request(`http://localhost:3000/customers/${i}`);
        request.end();
    }, i);
}