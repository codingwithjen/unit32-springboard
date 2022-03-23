const express = require('express');
const app = express();
const ExpressError = require('./expressError');
const { getNums, getMean, getMedian, getMode } = require('./helper');

// Tell Express to parse request bodies for either form data or JSON:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Requirements: all routes accept GET requests
app.get('/mean', function(req, res, next) {
    try {
        let nums = getNums(req.query.nums);
        let results = getMean(nums);

        return res.json({ operation: 'mean', value: results });
    } catch (err) {
        next(err);
    }
});

app.get('median', function(req, res, next) {
    try {
        let nums = getNums(req.query.nums);
        let results = getMedian(nums);

        return res.json({ operation: 'median', value: results });
    } catch (err) {
        next(err);
    }
});

app.get('/mode', function(req, res, next) {
    try {
        let nums = getNums(req.query.nums);
        let results = getMode(nums);

        return res.json({ operation: 'mode', value: results });
    } catch(err) {
        next(err);
    }
});

// 4040 Handler
app.use(function(req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
});

// Generic Error Handler
app.use(function(err, req, res, next) {
    // The default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;

    // Set the status and alert the user
    return res.status(status).json({
        error: { message, status }
    });
});


// Goes towards the bottom of the file -- The Generic Error Handler
app.listen(3000, function () {
    console.log('App on port 3000');
})