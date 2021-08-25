const astrochart = require("astrochart-modified");
const puppeteer = require("puppeteer");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><p></p>`);
window = dom.window;
document = window.document;

const horoscopeRegExp = /^[1-2][0-9]{3}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])(20|21|22|23|[0-1]\d)([0-5][0-9])?$/;

function isHoroscopeRequestFormat(input) {
  const dt = input.replace('星盘', '')
  return horoscopeRegExp.test(dt)
}

function getHoroscope(input) {
  const horo = require('circular-natal-horoscope-js')

  const datetime = input.replace('星盘', '')

  if (horoscopeRegExp.test(datetime)) {
    const year = parseInt(datetime.substr(0, 4))
    const month = parseInt(datetime.substr(4, 2))
    const day = parseInt(datetime.substr(6, 2))
    const hour = parseInt(datetime.substr(8, 2))
    let minute = 0
    if (datetime.length === 12) {
      minute = parseInt(datetime.substr(10, 2))
    }

    const origin = new horo.Origin({
      year: year,
      month: month - 1, // 0 = January, 11 = December!
      date: day,
      hour: hour,
      minute: minute,
      latitude: 39.9042, // Beijing
      longitude: 116.4074
    });
    const horoscope = new horo.Horoscope({
      origin: origin,
      houseSystem: "placidus",
      zodiac: "tropical",
      aspectPoints: ['bodies', 'points', 'angles'],
      aspectWithPoints: ['bodies', 'points', 'angles'],
      aspectTypes: ["major", "minor"],
      customOrbs: {},
      language: 'en'
    });

    console.log(year, month, day, hour, minute)

    const cusps = []
    for (const house of horoscope.Houses) {
      const start = house.ChartPosition.StartPosition.Ecliptic.DecimalDegrees
      cusps.push(start)
    }

    const planets = {}
    for (const planet of horoscope.CelestialBodies.all) {
      planets[planet.label] = [planet.ChartPosition.Ecliptic.DecimalDegrees]
    }

    const data = {
      cusps, planets
    }
    console.log(data)
    console.log()

    const chart = new astrochart.Chart('paper', 800, 800, null);
    const radix = chart.radix(data)
    radix.addPointsOfInterest( {"As":[data.cusps[0]],"Ic":[data.cusps[3]],"Ds":[data.cusps[6]],"Mc":[data.cusps[9]]})
    radix.aspects()

    const filepath = __dirname + '/../astrochart/' + datetime + ".jpg";

    (async (filepath) => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(document.body.innerHTML);
      await page.screenshot({path: filepath, fullPage: true});
      await browser.close();
    })(filepath);

    return filepath
  } else {
    return "[请按格式重新输入]\n如想知道出生于阳历1999年1月1日16时30分(只支持北京时间)的星盘，请输入:\n星盘1999010116"
  }
}

module.exports = {isHoroscopeRequestFormat, getHoroscope}
