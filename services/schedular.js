const cron = require('node-cron');
// const SubCategory = require('./models/subCategory');
const SubCategory = require('./../models/subCategory');

// Scheduled task to run daily at midnight
cron.schedule('0 0 * * *', async () => {
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

  try {
    const newArrivalSubCategory = await SubCategory.find({
      isNewArrival: true,
      createdAt: { $lt: twoMonthsAgo }
    });

    for (const subCategory of newArrivalSubCategory) {
        subCategory.isNewArrival = false;
        subCategory.isFeatured = true;
      await subCategory.save();
    }

    console.log('Successfully moved old new arrival subCategory to featured');
  } catch (error) {
    console.error('Error moving new arrival subCategory to featured:', error);
  }
});
