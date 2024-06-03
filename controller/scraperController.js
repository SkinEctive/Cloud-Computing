const scraper = require("../modules/scraper")
exports.makeScrap = async (req, res) => {
    var query = req.params.query
    query = query.replace(/ /g, "+");
    try {
        const data = await scraper.scrap(query);
        return res.status(200).json({
            status: true,
            message: "Data retrieved sucessfully",
            result: data,
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "An error occured",
            err: err.toString(),
        });
    }
}