const dbCheck = require('./dbCheck')

finhubLPs = async(Currency) => {
    // console.log("Finhub start")
  
    for(let lpindex = 0; lpindex < 5; lpindex++)
    {
      let LP_id = (lpindex + 1);
      await dbCheck(Currency, LP_id)
    }
  }

module.exports = finhubLPs