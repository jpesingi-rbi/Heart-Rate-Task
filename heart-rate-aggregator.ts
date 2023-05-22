import * as fs from 'fs';
import * as _ from 'lodash';

interface HeartRateMeasurement {
  beatsPerMinute: number;
  timestamps: {
    startTime: string;
    endTime: string;
  };
}

interface AggregatedHeartRateData {
  date: string;
  min: number;
  max: number;
  median: number;
  latestDataTimestamp: string;
}

// Read input file
const inputFile = 'heartrate.json';
const heartRateData: HeartRateMeasurement[] = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

// Group measurements by date
const groupedData = _.groupBy(heartRateData, (measurement) => measurement.timestamps.startTime.substr(0, 10));

// Calculate statistics for each day
const aggregatedData: AggregatedHeartRateData[] = Object.entries(groupedData).map(([date, measurements]) => {
  const beatsPerMinute = heartRateData.map((measurement) => measurement.beatsPerMinute);
  const min = _.min(beatsPerMinute);
  const max = _.max(beatsPerMinute);
  // sort the entries before we calculate the Median
  const sortedbpm=_.sortBy(beatsPerMinute)
  const median = calculateMedian(beatsPerMinute);
  const latestDataTimestamp = _.maxBy(measurements, (measurement) => measurement.timestamps.endTime)?.timestamps.endTime ?? '';

  return {
    date,
    min,
    max,
    median,
    latestDataTimestamp,
  };
});
function calculateMedian(sortedList: number[]): number {
  const middleIndex = Math.floor(sortedList.length / 2);

  if (sortedList.length % 2 === 0) {
    return (sortedList[middleIndex - 1] + sortedList[middleIndex]) / 2;
  } else {
    return sortedList[middleIndex];
  }
}
// Write output file
const outputFile = 'output.json';
fs.writeFileSync(outputFile, JSON.stringify(aggregatedData, null, 3));

console.log(`Output saved to ${outputFile}`);
