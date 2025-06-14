const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const BASE_URL = 'http://books.toscrape.com/catalogue/category/books/';
const MAIN_URL = 'http://books.toscrape.com/';

async function getCategories() {
  const { data } = await axios.get(MAIN_URL);
  const $ = cheerio.load(data);
  const categories = [];

  $('.side_categories ul li ul li a').each((i, el) => {
    const name = $(el).text().trim().toLowerCase().replace(/\s+/g, '-');
    const url = $(el).attr('href');
    categories.push({ name, url: new URL(url, MAIN_URL).href });
  });

  return categories;
}

async function getBooksFromCategory(categoryUrl) {
  let books = [];
  let url = categoryUrl;

  while (url) {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const bookLinks = $('.product_pod h3 a')
      .map((i, el) => new URL($(el).attr('href'), url).href.replace('index.html', ''))
      .get();

    for (let link of bookLinks) {
      const detail = await getBookDetail(link);
      books.push(detail);
    }

    const next = $('.next a').attr('href');
    url = next ? new URL(next, url).href : null;
  }

  return books;
}

async function getBookDetail(bookUrl) {
  const { data } = await axios.get(bookUrl);
  const $ = cheerio.load(data);

  const title = $('h1').text();
  const price = $('.price_color').text().replace('£', '');
  const availability = $('.availability').text().match(/\d+/)[0];
  const imageUrl = new URL($('#product_gallery img').attr('src'), MAIN_URL).href;
  const description = $('#product_description').next().text().trim();
  const upc = $('th:contains("UPC")').next().text();

  return {
    bookTitle: title,
    bookPrice: price,
    available: availability,
    imageUrl,
    bookDescription: description,
    upc
  };
}

(async () => {
  const result = {};
  const categories = await getCategories();

  for (const { name, url } of categories) {
    console.log(`🧲 Crawling ${name}`);
    const books = await getBooksFromCategory(url);
    result[name] = books;
  }

  fs.writeFileSync('../../data/data.json', JSON.stringify(result, null, 2), 'utf-8');
  console.log('✅ Done! Data saved to data.json');
})();
