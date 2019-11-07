const express = require("express");
const app = express();
const port = 3000;
// this sets direction for the routes file
const indexRoutes = require("./routes/index.js");
// we now need some additional libraries ejs and express-ejs-layouts
var expressLayouts = require('express-ejs-layouts');
// order matters
// Setup ejs as view engine we need the 'ejs' npm module for this
app.set('view engine', 'ejs');
// the /views is the default so this line is not needed this is what res.render uses
app.set('views', process.cwd() + '/views');
// Express-ejs-layouts handles doing layout files and has
// other nice templating features.
app.use(expressLayouts);
app.use("/", indexRoutes);
app.use('/public', express.static('public'))
app.listen(port, () => console.log(`Example app listening on port ${port}.\nTry opening your browser to http://localhost:${port}!`));
