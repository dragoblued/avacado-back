const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const productsRoutes = require('./routes/products');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use('/addproducts', productsRoutes);
app.use((err, req, res, next) => {
	const {message} = err;
	res.json({status: "error", message});
});
app.get('/', (req, res) => {
	res.end('<p>HEllo</p>');
});

app.listen(8080, () => console.log('Server Start'));