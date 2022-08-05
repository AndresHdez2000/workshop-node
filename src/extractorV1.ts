const puppeteer = require("puppeteer");
const fs = require("fs");

//let results = []

//let base_url = "https://www.tematika.com/libros?limit=40&p=1"

(async () => { 
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto("https://www.tematika.com/libros?limit=40&p=1")
    let page_res = await page.evaluate( ()=>{
        
        let products = [];
    let lis = document.querySelectorAll(".products-grid-special li.item") 
        console.log(lis)
        for (let li of lis){
            let product = {};
            product["title"] = li.querySelector(".product-name a").title;
            product["img"] = li.querySelector("img").src;
            product["price"] = li.querySelector(".price").innerText;
            product["autor"] = li.querySelector(".author").innerText;
            products.push(product)
        }
        return products
    })
    console.log(page_res)
    await fs.writeFile("resultados/ejercicio1.json", JSON.stringify(page_res), function(err){
        if(err) throw err;
    })
    await browser.close()
  })();

