const ExpressError = require('./expressError');

/** Function for checking the numbers and return the Array of numbers
 * @param {*} numStr
 */

function getNums(numStr) {
    if (numStr === undefined || numStr.trim().length === 0) {
        throw new ExpressError('NUMS ARE REQUIRED!!!', 400);
    }

    const nums = numStr.split(',');

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        nums[i] = Number(num);

        if (isNaN(nums[i])) {
            // if not a number, throw an error
            throw new ExpressError(`${num} is not a number`, 400);
        }
    }
    return nums;
}

