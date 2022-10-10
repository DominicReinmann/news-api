const PORT = process.env.PORT || 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();

const url = "https://www.newsnow.co.uk/h/World+News";
const articles = [];

//
app.get("/news", (req, res) => {
  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      $(".hl__inner", html).each(function () {
        const title = $(this).find("a.hll").text();
        const url = $(this).find("a").attr("href");
        const source = $(this).find("span.meta").text();
        const tags = $(this).find("a.fav").text();
        articles.push({
          title,
          url,
          source,
          tags,
        });
      });
      res.json(articles);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server running on PORT: ${PORT}`));

