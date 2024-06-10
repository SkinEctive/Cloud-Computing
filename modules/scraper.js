const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const webUrl = "https://www.beautyhaul.com/search?q=";
const product_data = [];

async function getProduct(url) {
  try {
    const response = await axios.get(url + "face");
    const $ = cheerio.load(response.data);

    const product = $(".btn-block");
    product.each(function () {
      productImage = $(this).find(".img-max").attr("src");
      productName = $(this).find(".title").text();

      // console.log(productName);

      product_data.slice(10).push({ productName, productImage });
    });

    // fs.writeFile(
    //   "productData.json",
    //   JSON.stringify(product_data.slice(1, 12)),
    //   (err) => {
    //     if (err) throw err;
    //     console.log("file disimpen");
    //   }
    // );
    console.log(product_data);
  } catch (error) {
    console.error(error);
  }
}

getProduct(webUrl);
