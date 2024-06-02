const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("node:fs");

const url = "https://guardianindonesia.co.id/perawatan-wajah.html?";

(async () => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const products = [];

    $(
      ".product k24-thumb-md k24-df-on k24-df-direct-column k24-df-align-center k24-gap-4 k24-bgr-white k24-height-auto k24-width-30"
    ).each((i, element) => {
      const productName = $(element).find(".item-name-LPg").text().trim();
      const productImage = $(element).find(".item-images--uD").attr("src");

      products.push({
        productName,
        productImage,
      });
    });

    // Convert array to JSON
    fs.writeFile("productData.json", JSON.stringify(products), (err) => {
      if (err) throw err;
      console.log("file disimpen");
    });

    console.log(jsonData);
  } catch (error) {
    console.error(error);
  }
})();
