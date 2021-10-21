const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const { next } = require('cheerio/lib/api/traversing');

const OurApp = express();

const getData = async function(url){
    // tableinfo = [ [citations_all , citations_since 2016] , [hindex_all, hindex_since2016 ] , [i10index_all , i10index_since2016] ]
    let tableinfo = [ [1,2],[1,2],[1,2]];
    // graphinfo = [ [ year , no_of_citations ] , ... ]
    let graphinfo = [];
    try{
        // gets the html data from the url
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const name = $("#gsc_prf_in").text();

        $("#gsc_rsb_st tbody").children().each((index, elem) => {
            $(elem).children('.gsc_rsb_std').each((j, elem2)=> {
                tableinfo[index][j] = parseInt($(elem2).text());
                
            })
        });

        $(".gsc_md_hist_b .gsc_g_t").each( (index, elem) => {
            graphinfo.push([$(elem).text()])
        })

        $(".gsc_g_al").each((index,elem) => {
            graphinfo[index].push($(elem).text())
        })

        console.log(graphinfo);
        console.log(tableinfo);
        return ({
            name : name,
            tableData : tableinfo,
            graphData : graphinfo
        })
    }
    catch (error){
        console.log(error);
        next(error);
    }
        
}

// function start(url) {
//     return getData(url);
//   }

OurApp.get('/user/:id', async(req,res) => {
    const url = 'https://scholar.google.com/citations?user=' + req.params.id + '&hl=en';
    const data = await getData(url);
    console.log('express code continues');
    console.log(data);
    return res.json(data);
});

OurApp.get('/', (req,res) => {
    return res.json({ message: "Server is working!!!!!!" });
});

OurApp.listen(4000, () => console.log("Server is running"));

