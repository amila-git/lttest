/*const cheerio = require("cheerio");
const request = require('request');

async function main() {
    const url = 'https://en.lottolyzer.com/number-pair-frequency/south-korea/6_slash_45-lotto/by-frequencies/all';
    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            const title = $('title').text();
            const table = $('table > tbody').children()
            //console.log(table);
            const result = table.map((i, element) => (
                $(element).find('.num-pairs-val').children();
                let pairs = 
            )).get()
            console.log(JSON.stringify(result))
            //const firstParagraph = $('p').first().text();
            //console.log(title);
            //console.log(firstParagraph);
        }
    });
}

main();*/
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeTable(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        
        const data = [];

        $('table#pair-by-freq-table tbody tr').each((index, element) => {
            const count = parseInt($(element).find('.freq-val').text().trim());
            const pairs = [];
            $(element).find('.num-pairs-val .label-white').each((index, label) => {
                pairs.push($(label).text().trim());
            });
            data.push({ count, pairs });
        });

        return data;
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
        return null;
    }
}

const url = 'https://en.lottolyzer.com/number-pair-frequency/south-korea/6_slash_45-lotto/by-frequencies/all';

const outputFileName = 'pairs.json';

scrapeTable(url)
    .then(data => {
        if (data) {
            fs.writeFile(outputFileName, JSON.stringify(data, null, 2), err => {
                if (err) {
                    console.error('Error writing to file:', err);
                } else {
                    console.log('Data saved to', outputFileName);
                }
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
