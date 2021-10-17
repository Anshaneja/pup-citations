const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

let userData = {
    citations : { 
        all : 243,
        since2016 : 31
    },
    hindex : { 
        all : 243,
        since2016 : 31
    },
    i10index : { 
        all : 243,
        since2016 : 31
    },

};
let userinfo = [ [1,2],[1,2],[1,2]];

axios.get('https://scholar.google.com/citations?user=pLs3_AMAAAAJ&hl=en')
    .then((response) => {
        const $ = cheerio.load(response.data);
        const name = $("#gsc_prf_in").text();
        $("#gsc_rsb_st tbody").children().each((index, elem) => {
            $(elem).children('.gsc_rsb_std').each((j, elem2)=> {
                userinfo[index][j] = parseInt($(elem2).text());
            })
        });
        console.log(userinfo);
    })

    .catch((error) => {
        console.log(error);
    });
