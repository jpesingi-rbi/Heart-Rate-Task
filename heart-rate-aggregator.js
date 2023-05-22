"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var _ = require("lodash");
// Read input file
var inputFile = 'heartrate.json';
var heartRateData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
// Group measurements by date
var groupedData = _.groupBy(heartRateData, function (measurement) { return measurement.timestamps.startTime.substr(0, 10); });
// Calculate statistics for each day
var aggregatedData = Object.entries(groupedData).map(function (_a) {
    var _b, _c;
    var date = _a[0], measurements = _a[1];
    var beatsPerMinute = heartRateData.map(function (measurement) { return measurement.beatsPerMinute; });
    var min = _.min(beatsPerMinute);
    var max = _.max(beatsPerMinute);
    var sortedbpm = _.sortBy(beatsPerMinute);
    console.log("..................", sortedbpm);
    var median = calculateMedian(beatsPerMinute);
    var latestDataTimestamp = (_c = (_b = _.maxBy(measurements, function (measurement) { return measurement.timestamps.endTime; })) === null || _b === void 0 ? void 0 : _b.timestamps.endTime) !== null && _c !== void 0 ? _c : '';
    return {
        date: date,
        min: min,
        max: max,
        median: median,
        latestDataTimestamp: latestDataTimestamp,
    };
});
function calculateMedian(sortedList) {
    var middleIndex = Math.floor(sortedList.length / 2);
    if (sortedList.length % 2 === 0) {
        return (sortedList[middleIndex - 1] + sortedList[middleIndex]) / 2;
    }
    else {
        return sortedList[middleIndex];
    }
}
// Write output file
var outputFile = 'output.json';
fs.writeFileSync(outputFile, JSON.stringify(aggregatedData, null, 3));
console.log("Output saved to ".concat(outputFile));
