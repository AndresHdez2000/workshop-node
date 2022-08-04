const puppeteer = require("puppeteer");

function delay(ms) {
    return new Promise(r => setTimeout(r, ms));
}

(async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  const p = "ibai.png"
  await page.goto("https://www.youtube.com/watch?v=NU8iOl8Caq8")
  await delay(2000).then(() => {
    return page.screenshot({ path: p, fullPage: true }).catch(e => console.error(e))
});
  await browser.close()
})();