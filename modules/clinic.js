const axios = require("axios");
require("dotenv").config();

async function searchClinic(req, res) {
  try {
    const { latitude, longitude } = req.body;
    const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&keyword=klinik%20kecantikan&key=${API_KEY}`;

    const response = await axios.get(url);
    const results = response.data.results;

    const clinicPromises = results.map(async (place) => {
      const photoUrl = place.photos
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${API_KEY}`
        : "";

      const distanceUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${latitude},${longitude}&destinations=${place.geometry.location.lat},${place.geometry.location.lng}&key=${API_KEY}`;
      const distanceResponse = await axios.get(distanceUrl);
      const distance = distanceResponse.data.rows[0].elements[0].distance.text;

      const detailUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_address,rating,photos,opening_hours,formatted_phone_number&key=${API_KEY}`;
      const detailResponse = await axios.get(detailUrl);
      const detailResult = detailResponse.data.result;
      const openingHours = detailResult.opening_hours;
      const phoneNumber =
        detailResult.formatted_phone_number || "Belum Tersedia";

      let jamBuka = "";
      let jamTutup = "";

      if (
        openingHours &&
        openingHours.periods &&
        openingHours.periods.length > 0
      ) {
        const period = openingHours.periods[0];
        jamBuka = period.open ? period.open.time : "";
        jamTutup = period.close ? period.close.time : "";
      }

      return {
        nama: place.name,
        alamat: place.vicinity,
        rating: place.rating,
        fotoUrl: photoUrl,
        jarak: distance,
        jamBuka,
        jamTutup,
        nomorHP: phoneNumber,
      };
    });

    const clinic = await Promise.all(clinicPromises);
    res.json({ clinic });
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mencari klinik kecantikan." });
  }
}

async function searchClinicByKeyword(req, res) {
  try {
    const { keyword } = req.body;
    const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      keyword
    )}&type=beauty_salon&key=${API_KEY}`;

    const response = await axios.get(url);
    const results = response.data.results;

    const clinicPromises = results.map(async (place) => {
      const photoUrl = place.photos
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${API_KEY}`
        : "";

      const detailUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_address,rating,photos,opening_hours,formatted_phone_number&key=${API_KEY}`;
      const detailResponse = await axios.get(detailUrl);
      const detailResult = detailResponse.data.result;
      const openingHours = detailResult.opening_hours;
      const phoneNumber =
        detailResult.formatted_phone_number || "Belum Tersedia";

      let jamBuka = "";
      let jamTutup = "";

      if (
        openingHours &&
        openingHours.periods &&
        openingHours.periods.length > 0
      ) {
        const period = openingHours.periods[0];
        jamBuka = period.open ? period.open.time : "";
        jamTutup = period.close ? period.close.time : "";
      }

      return {
        nama: place.name,
        alamat: place.formatted_address,
        rating: place.rating,
        fotoUrl: photoUrl,
        jamBuka,
        jamTutup,
        nomorHP: phoneNumber,
      };
    });

    const clinic = await Promise.all(clinicPromises);
    res.json({ clinic });
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mencari klinik kecantikan." });
  }
}

module.exports = { searchClinic, searchClinicByKeyword };
