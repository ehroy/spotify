const puppeteer = require("puppeteer-extra");
const stealthPlugin = require("puppeteer-extra-plugin-stealth")();
[("chrome.runtime", "navigator.languages")].forEach((a) =>
  stealthPlugin.enabledEvasions.delete(a)
);
puppeteer.use(stealthPlugin);
const chalk = require("chalk");
const readline = require("readline-sync");
const fetch = require("node-fetch");
const delay = require("delay");
const fs = require("fs-extra");
require("dotenv").config();

const namav1 = () =>
  new Promise((resolve, reject) => {
    fetch("https://randommer.io/Name", {
      headers: {
        accept: "/",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua":
          '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
      },
      referrerPolicy: "no-referrer",
      body: "type=fullname&number=1&X-Requested-With=XMLHttpRequest",
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
const GenerateRandom = (length) =>
  new Promise((resolve, reject) => {
    var text = "";
    var possible = "123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    resolve(text);
  });
const Passwd = (length) =>
  new Promise((resolve, reject) => {
    var text = "";
    var possible = "qwertyuiopasdfghjklzcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    resolve(text);
  });
(async () => {
  let browser;
  let name;
  let succesfully = 0;
  let gagal = 0;

  const jumlah = readline.question("Input Jumlah Run : ");
  for (let index = 0; index < jumlah; index++) {
    console.log("");

    try {
      const indoName = await namav1();
      name =
        indoName[0].split(" ")[0].toLowerCase() +
        indoName[0].split(" ")[1].toLowerCase();
      const email = name + (await GenerateRandom(5)) + "@" + process.env.DOMAIN;
      const pass = (await Passwd(10)) + (await GenerateRandom(2)) + "!";
      browser = await puppeteer.launch({
        ignoreDefaultArgs: ["--enable-automation"],
        userDataDir: "./" + name,
        headless: false,
        devtools: false,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-infobars",
          "--window-position=0,0",
          "--ignore-certifcate-errors",
          "--ignore-certifcate-errors-spki-list",
          "--disable-blink-features=AutomationControlled",
          "--disable-extensions",
          "--disable-background-networking",
          "--disable-background-timer-throttling",
          "--disable-backgrounding-occluded-windows",
          "--disable-breakpad",
          "--disable-client-side-phishing-detection",
          "--disable-default-apps",
          "--disable-dev-shm-usage",
          "--disable-features=site-per-process",
          "--disable-hang-monitor",
          "--disable-ipc-flooding-protection",
          "--disable-popup-blocking",
          "--disable-prompt-on-repost",
          "--disable-renderer-backgrounding",
          "--disable-sync",
          "--disable-translate",
          "--enable-automation",
          "--metrics-recording-only",
          "--mute-audio",
          "--no-first-run",
          "--password-store=basic",
          "--use-mock-keychain",
          "--disable-gpu",
          "--incognito",
          `--proxy-server=${process.env.PROXY_URL}`,
        ],
      });

      //   geo.iproyal.com:12321:oreotwistt:bebasdong123_country-id
      const time = { visible: true, timeout: 0 };
      const pages = await browser.pages();
      const page = pages[0];

      //   await page.setViewport({ width: 350, height: 700 });
      // await page.setUserAgent(uagent);
      await page.authenticate({
        username:
          process.env.PROXYUSERNAME +
          `-session-${(1000000 * Math.random()) | 0}`,
        password: process.env.PASSWORD,
      });
      // await page.authenticate({
      //   username: `brd-customer-hl_7da2a2da-zone-zone6-country-us`,
      //   password: "5omkljmze92i",
      // });
      await page.goto(
        "https://www.hm.com/register?utm_source=invite_a_friend&utm_medium=desktop&rcr=MzIyMTAwMDg1MA&rm=es_mx",
        {
          timeout: 0,
          waitUntil: "load",
        }
      );
      await page.reload();

      console.log(
        chalk.yellowBright(`[ INFO ] `) +
          chalk.greenBright("Waiting Load Website..")
      );

      await page.waitForSelector("#onetrust-accept-btn-handler", {
        visible: true,
        timeout: 15000,
      });
      await page.click("#onetrust-accept-btn-handler");
      await delay(3000);
      await page.reload();
      await delay(1000);
      await page.waitForSelector("#email", { visible: true, timeout: 15000 });
      await page.type("#email", email);
      await delay(1000);
      await page.waitForSelector("#password");
      await page.type("#password", pass);
      await delay(1000);
      await page.waitForSelector("input[name=day]");
      await page.type("input[name=day]", "1" + (await GenerateRandom(1)));
      await page.waitForSelector("input[name=month]");
      await page.type("input[name=month]", "0" + (await GenerateRandom(1)));
      await page.waitForSelector("input[name=year]");
      await page.type("input[name=year]", "19" + (await GenerateRandom(2)));
      await delay(1000);
      await page.waitForSelector("#hmNewsSubscription");
      await page.click("#hmNewsSubscription");
      await delay(1000);
      await page.waitForSelector("#app > main > form > button");
      await page.click("#app > main > form > button");
      console.log(
        chalk.yellowBright(`[ INFO ] `) +
          chalk.greenBright("Mencoba Register..")
      );

      await page.waitForSelector("#main-content > div > section > a", {
        visible: true,
        timeout: 15000,
      });
      await page.click("#main-content > div > section > a");
      console.log(
        chalk.yellowBright(`[ INFO ] `) +
          chalk.greenBright("Succesfuly Register..")
      );
      try {
        await page.waitForSelector(
          "#main-content > div.FadeInOut-module--container__1IyAW.FadeInOut-module--entered__eHaKQ > div > div.slick-slider.Carousel-module--slider__3Tuz6.Carousel-module--arrowSlider__UkEMD.slick-initialized > div > div > div:nth-child(5)",
          {
            visible: true,
            timeout: 10000,
          }
        );
        await page.click(
          "#main-content > div.FadeInOut-module--container__1IyAW.FadeInOut-module--entered__eHaKQ > div > div.slick-slider.Carousel-module--slider__3Tuz6.Carousel-module--arrowSlider__UkEMD.slick-initialized > div > div > div:nth-child(5)"
        );
      } catch (error) {
        await page.waitForSelector(
          "#main-content > div.FadeInOut-module--container__1IyAW.FadeInOut-module--entered__eHaKQ > div > div > div > div > div:nth-child(5) > div > div"
        );
        await page.click(
          "#main-content > div.FadeInOut-module--container__1IyAW.FadeInOut-module--entered__eHaKQ > div > div > div > div > div:nth-child(5) > div > div"
        );
      }
      await delay(1000);
      await page.waitForSelector("#main-content > article > button");
      await page.click("#main-content > article > button");
      await delay(1000);
      console.log(
        chalk.yellowBright(`[ INFO ] `) +
          chalk.greenBright("Mencoba Get Code Spotify..")
      );
      await page.waitForSelector(
        "#main-content > article > div > section > span"
      );
      const coderedem = await page.evaluate(
        () =>
          document.querySelectorAll(
            "#main-content > article > div > section > span"
          )[0].innerText
      );
      //   console.log(coderedem);
      fs.appendFileSync("datacode.txt", coderedem + "\n");
      console.log(
        chalk.yellowBright(`[ INFO ] `) +
          chalk.greenBright(
            "Code Berhasil Tersimpan di datacode.txt " + "[ " + coderedem + " ]"
          )
      );

      browser.close();
      await delay(1000);
      fs.removeSync("./" + name);
      succesfully++;
      //   readline.question("");
    } catch (error) {
      browser.close();
      await delay(1000);
      fs.removeSync("./" + name);
      console.log(chalk.redBright(`[ DEBUG ] `) + chalk.greenBright(error));
      gagal++;
    }
  }
  console.log("");
  console.log(
    chalk.magentaBright(`[ PROCESS TOTAL ] `) +
      chalk.magentaBright(`[ ${jumlah} ] `)
  );
  console.log(
    chalk.redBright(`[ PROCESS GAGAL ] `) + chalk.redBright(`[ ${gagal} ] `)
  );
  console.log(
    chalk.greenBright(`[ PROCESS SUCCESS ] `) +
      chalk.greenBright(`[ ${succesfully} ] `)
  );
})();
