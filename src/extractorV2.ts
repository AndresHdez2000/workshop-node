const puppeteer = require("puppeteer");
const fs = require("fs");


(async () => { 
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    let results = []
    let urls = ["https://www.tematika.com/libros?limit=40&p=1"]
    for(let url of urls){
        await page.goto(url)
        let page_res = await page.evaluate(()=>{
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
            let new_url = document.querySelector(".i-next").href
            return [products, new_url]
        })
        if (page_res[1] && urls.length<=6){ urls.push(page_res[1]) }
        console.log(page_res[0])
        results = results.concat(page_res[0])
    }
    await fs.writeFile("resultados/ejercicio2.json", JSON.stringify(results), function(err){
        if(err) throw err;
    })
    await browser.close()
  })();
