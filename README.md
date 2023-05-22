
# HEART RATE Task

## Problem Definition
For a clinical trial, it is required to calculate some statistics for patients' heart rate data. 
The input “heartrate.json” file contains heart rate measurements collected by a patient over several days.Each measurement consists of beats per minute and timestamps when the measurement was taken (start and end timestamps). 

Using JavaScript/TypeScript write an aggregator script that reads the input “heartrate.json” file and calculates the minimum, maximum and median beats per minute and the latest data timestamp (timestamp of the last measurement in the day) for each day. 


## Installation

Install project dependencies with npm

```bash
  npm install 
```
    
## To compile the Script 

To compile the script, run the following command

```bash
  npx tsc heart-rate-aggregator.ts
```

## To run the script

```bash
  node heart-rate-aggregator.js   
```

