const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const webUrl =
  "https://www.bukalapak.com/products?from=omnisearch&from_keyword_history=false&search%5Bkeywords%5D=skincare&search_source=omnisearch_keyword&source=navbar";
const product_data = [];

async function getProduct(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const product = $(".te-product-card.bl-product-card-new");
    product.each(function () {
      // productName = $(this).find("a.bl-link").text();
      // productImage = $(this).find("a.bl-thumbnail--img").prop("src");

      productName = $(this)
        .find("section.bl-product-card-new__name.a.bl-link")
        .text()
        .trim();
      productImage = $(this).find("figure.bl-thumbnail.img").attr("src");
      product_data.push({ productName, productImage });
      console.log(productName);
    });

    // fs.writeFile("productData.json", JSON.stringify(product_data), (err) => {
    //   if (err) throw err;
    //   console.log("file disimpen");
    // });
    console.log(product_data);
  } catch (error) {
    console.error(error);
  }
}

getProduct(webUrl);
