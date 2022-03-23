const express = require('express');
const app = express();

const ExpressError = require('./expressError');

// Tell Express to parse request bodies for either form data or JSON:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Requirements: all routes accept GET requests
app.get('/mean', function(res, req, next) {
    try {
        const nums = getNums(req.query.nums);
        const result = getMean(nums);

        return res.json({ operation: 'mean', value: result });
    } catch (err) {
        next(err);
    }
});


// goes towards the bottom of the file
app.listen(3000, function () {
    console.log('App on port 3000');
})