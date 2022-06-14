// require express
const express = require("express");
// instantiate express
const app = express();

app.use(express.json());

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`SERVER LISTENING AT http://localhost:${PORT}`);
});
