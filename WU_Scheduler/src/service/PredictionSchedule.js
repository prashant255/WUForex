const cron = require('node-cron')
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

runScript = async () => {
    const exec1 = await exec('python3 ../WU_Prediction_Engine/prediction.py')
    console.log(exec1.stdout)
}


runScript()