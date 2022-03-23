const ExpressError = require('./expressError');

/** Function for checking the numbers and return the Array of numbers
 * @param {*} numStr
 */

function getNums(numStr) {
    if (numStr === undefined || numStr.trim().length === 0) {
        throw new ExpressError('NUMS ARE REQUIRED!!!', 400);
    }

    let nums = numStr.split(',');

    for (let i = 0; i < nums.length; i++) {
        let num = nums[i];
        nums[i] = Number(num);

        if (isNaN(nums[i])) {
            // if not a number, throw an error
            throw new ExpressError(`${num} is not a number`, 400);
        }
    }
    return nums;
}

function getMean(nums) {
    let total = 0;

    nums.forEach(num => {
        total += num;
    });
    return total / nums.length;
}

function getMedian(nums) {
    nums.sort((a, b) =. (a - b));

    if (nums.length === 1) {
        return nums[0];
    }
    if (nums.length % 2 === 1) {
        return nums[Math.floor(nums.length / 2)];
    } else {
        return (nums[nums.length / 2] + nums[nums.length / 2 -1]) / 2;
    }
}

function getMode(nums) {

    let numSet = new Set(nums);

    let numCounts = {};

    numSet.forEach(num => {
        numCounts[num] = 0;
        index = nums.indexOf(num , 0);
        while (index !== -1){
            index ++;
            numCounts[num] ++;

            index = nums.indexOf(num , index);
        }
    });

    let max = 2;
    let modes = [];

    for (num in numCounts){
        if (numCounts[num] > max){
            modes = [Number(num)];

            max = numCounts[num];
        } else if (numCounts[num] === max){
            modes.push(Number(num));
        }
    }

    return modes;
}


module.exports = {
    getNums: getNums,
    getMean: getMean,
    getMedian: getMedian,
    getMode: getMode

