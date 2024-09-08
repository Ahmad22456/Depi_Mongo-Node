const Ads = require("./model");

exports.createAd = async (req, res, next) => {
  const { title, content } = req.body;
  try {
    const newAd = await Ads.create({
      title,
      content,
      userId: req.user_id,
    });
    res.status(201).json({
      message: "Ad created",
      Ad: newAd,
    });
  } catch (e) {
    next(e);
  }
};

exports.updateAd = async (req, res, next) => {
  const user_id = req.user_id;
  const adId = req.params.id;
  const { title, content } = req.body;
  try {
    const ad = await Ads.findById(adId);
    if (ad.userId != user_id) {
      res.status(400).json({ message: "Can't perform action" });
    } else {
      const updatedAd = await Ads.findByIdAndUpdate(
        adId,
        {
          title,
          content,
        },
        { new: true }
      );
      res.status(200).json({
        message: "Ad updated successfully",
        updatedAd,
      });
    }
  } catch (e) {
    next(e);
  }
};

exports.deleteAd = async (req, res, next) => {
  const id = req.params.id;
  try {
    const ad = await Ads.findById(id);
    if (ad.userId != req.user_id) {
      res.status(400).json({ message: "Can't perform action" });
    } else {
      const deletedAd = await Ads.findByIdAndDelete(id);
      res.status(200).json({ message: "Ad deleted successfully", deletedAd });
    }
  } catch (e) {
    next(e);
  }
};

exports.getAllAds = async (req, res, next) => {
  try {
    const ads = await Ads.find().populate({
      path: "userId",
      select: "name",
    });
    res.status(200).json({ ads });
  } catch (e) {
    next(e);
  }
};

exports.getUserAds = async (req, res, next) => {
  try {
    const userAds = await Ads.find({ userId: req.user_id });
    res.status(200).json({ userAds });
  } catch (e) {
    next(e);
  }
};
