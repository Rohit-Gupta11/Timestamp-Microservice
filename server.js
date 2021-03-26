var express = require('express');
var app = express();
 
app.use(express.static('public'));

app.get("/", function (req, res) {+
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});

app.get("/api/timestamp/:date_statement", (req,res) => {
  let dateStatement = req.params.date_statement;
  if (/\d{5,}/.test(dateStatement)) {
    const dateInt = parseInt(dateStatement);
    res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
  } else {
    let dateObject = new Date(dateStatement);

    if (dateObject.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
    }
  }
})


var listener = app.listen(4000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
