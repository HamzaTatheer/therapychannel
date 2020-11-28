//loading express
var app = require("./config/init")();

const port = process.env.PORT || 3000;
//server listening on required port
app.listen(port, () => console.log(`Server listening on port ${port}!`));
