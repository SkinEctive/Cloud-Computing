const clinic = require("../modules/clinic");

exports.searchByLocation = async (req, res) => {
  const { latitude, longitude } = req.query;

  try {
    const data = await clinic.searchByLocation(latitude, longitude);
    return res.status(200).json({
      status: true,
      message: "Data retrieved successfully",
      result: data,
    });
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    return res.status(500).json({
      status: false,
      message: "Terjadi kesalahan saat mencari klinik kecantikan.",
      err: error.toString(),
    });
  }
};

exports.searchByKeyword = async (req, res) => {
  const { keyword } = req.query;

  try {
    const data = await clinic.searchByKeyword(keyword);
    return res.status(200).json({
      status: true,
      message: "Data retrieved successfully",
      result: data,
    });
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    return res.status(500).json({
      status: false,
      message: "Terjadi kesalahan saat mencari klinik kecantikan.",
      err: error.toString(),
    });
  }
};
