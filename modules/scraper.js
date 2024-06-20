const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const product_data = [];

async function getProduct(keyword) {
  const webUrl = "https://www.beautyhaul.com/search?q=";
  try {
    const response = await axios.get(webUrl + encodeURIComponent(keyword));
    const $ = cheerio.load(response.data);

    const product = $(".btn-block");
    product.each(function () {
      const productImage = $(this).find(".img-max").attr("src");
      const productName = $(this).find(".title").text().trim();

      product_data.push({ productName, productImage });
    });

    const filteredProducts = product_data.slice(2, 14);

    fs.writeFile(
      "productData.json",
      JSON.stringify(filteredProducts),
      (err) => {
        if (err) throw err;
        console.log("File has been saved.");
      }
    );

    console.log(filteredProducts);
    return filteredProducts;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching the products.");
  }
}

module.exports = { getProduct };
