const express = require('express')
const app = express();
const PORT = process.env.PORT || 80;

app.get('/', (req, res) => {
  res.send('Welcome to Express App');
})

app.listen(PORT, err => {
  if (err) return console.log(`Error: `, err);
  console.log(`App is listening on PORT ${PORT}`);
})

// TODO  jira auth
