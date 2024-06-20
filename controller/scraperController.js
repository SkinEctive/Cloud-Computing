const scraper = require("../modules/scraper");

exports.makeScrap = async (req, res) => {
  const { keyword } = req.body;
  console.log(keyword);

  if (!keyword) {
    return res.status(400).json({
      status: false,
      message: "Keyword is missing",
    });
  }

  try {
    const data = await scraper.getProduct(keyword);
    return res.status(200).json({
      status: true,
      message: "Data retrieved successfully",
      result: data,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({
      status: false,
      message: "An error occurred while searching for products.",
      err: error.toString(),
    });
  }
};
