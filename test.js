const PORT = process.env.PORT || 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();

const url = "https://www.newsnow.co.uk/h/World+News";

const articles = {title:" ", url:" ", tags:" ",};


app.get("/news", (req, res) => {
  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const

      $(".hl__inner", html).each(function () {
        const title = $(this).text();
        const url = $(this).find("a").attr("href");
        const flag = $(this).find("span").attr("class");
        articles.push({
          title,
          url,
          flag,
        });
      });
      res.json(articles);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server running on PORT: ${PORT}`));
