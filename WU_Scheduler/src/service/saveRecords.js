saveRecords = async () => {
    await CP.save()
    console.log(CP)
  }

module.exports = saveRecords