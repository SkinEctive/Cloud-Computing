const clinic = require("../modules/clinic");

exports.searchByLocation = async (req, res) => {
  const { latitude, longitude } = req.body;
  console.log(latitude, longitude);

  if (!latitude || !longitude) {
    return res.status(400).json({
      status: false,
      message: "Latitude dan longitude kosong",
    });
  }

  try {
    const data = await clinic.searchClinic(latitude, longitude);
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
  const { keyword } = req.body;
  console.log(keyword);

  if (!keyword) {
    return res.status(400).json({
      status: false,
      message: "Keyword kosong",
    });
  }

  try {
    const data = await clinic.searchClinicByKeyword(keyword);
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
