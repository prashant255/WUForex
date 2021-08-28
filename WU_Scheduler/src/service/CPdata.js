const CP1 = require('../models/CPdata')
require('../constant')
require('./clearDailyData')
require('./clearWeeklyData')
const cron = require('node-cron')
const index = require('./index')
require('../db/mongoose')
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

runScript = async () => {
  const exec1 = await exec('python3 ../WU_Prediction_Engine/prediction.py')
  console.log(exec1.stdout)
}


  cron.schedule("0 0 */1 * * 1-5", () => {
    index()
    runScript()
   })

  cron.schedule("0 0 0 */1 * 1-5", () => {
    clearDailyData()
  })

  cron.schedule("0 0 6 * * 1", () => {
    clearWeeklyData()
  })