const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const webUrl = "https://www.matahari.com/catalogsearch/result/?q=";
const product_data = [];

async function getProduct(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const product = $(".item.product.product-item");
    product.each(function () {
      productName = $(this).find(".product-item-link").text();
      productImage = $(this).find(".product-image-photo").attr("data-src");

      product_data.push({ productName, productImage });
      console.log(productName);
    });
    console.log(product_data);
  } catch (error) {
    console.error(error);
  }
}

getProduct(webUrl);
