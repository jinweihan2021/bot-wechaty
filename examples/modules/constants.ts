import path from "path";
import fs from "fs";
import assert from "assert";
import {
  ZiweiTwelvePhase,
  ZiweiMain,
  ZiweiSub,
  ZodiacHouse,
  ZodiacPlanet,
  ZodiacSigns,
  AllGua,
  ZodiacPlanetDetail,
  ZodiacSignsDetail,
  ZodiacHouseDetail, ZodiacPlanetWatchHouse
} from "./values";

import {DateUtil} from '../utils/DateUtil'
import {Lunar} from '../utils/Lunar'
import {Bazi} from '../utils/Bazi'
import {tarot} from "../models/tarot";

// @ts-ignore
function initTarotData(): model.TarotRepo {
  const models = require('../models/tarot');
  const filePath = path.resolve(__dirname, '../data/tarot.json')
  if (fs.existsSync(filePath)) {
    const tarot = JSON.parse(fs.readFileSync(filePath).toString())
    return models.tarot.TarotRepo.fromObject(tarot);
  }
}

const tarotData = initTarotData()
assert(tarotData != null)

function flyHouseDetails(planetIndex: string, houseIndex: string, signIndex: string): string {
  if (parseInt(planetIndex) === 11 || parseInt(planetIndex) === 10) {
    return '南北交不能飞星'
  } else {
    const signDiffToHouse = (parseInt(houseIndex) - parseInt(signIndex) + 12) % 12 //白羊2宫就是转一个，接下来金牛就要在三宫
    // @ts-ignore
    const patronOfPlants = ZodiacPlanetWatchHouse[ZodiacPlanet[planetIndex]]
    let incomeHouseNames = []
    for (const sign of patronOfPlants) {
      let index = ZodiacSigns.indexOf(sign)
      index = (index + signDiffToHouse + 12) % 12
      incomeHouseNames.push(ZodiacHouse[index])
    }

    // @ts-ignore
    const housePatron = '[飞宫]\n用来解释、补足、具象事件产生的原因和背景\n\n' + ZodiacPlanet[planetIndex] + '是第' + incomeHouseNames.join(', ') + '飞入第' + ZodiacHouse[houseIndex] + '\n\n'
    let houseSourceDetail = ''
    for (const incomeHouseName of incomeHouseNames) {
      // @ts-ignore
      houseSourceDetail += (incomeHouseName + ': ' + ZodiacHouseDetail[incomeHouseName] + '\n')
    }
    return housePatron + houseSourceDetail
  }
}

export function getDiceString() {
  const planetIndex = Math.floor(Math.random() * 12).toString()
  const signIndex = Math.floor(Math.random() * 12).toString()
  const houseIndex = Math.floor(Math.random() * 12).toString()

  const key =
    '[占星骰子]\n' +
    '[What]  行星代表"对象", 代表当前对你有用的基本能量类型\n' +
    '[How]   星座代表"形式", 意味着行星能量是如何表现出来的\n' +
    '[Where] 宫位代表"地点/领域", 意味着受影响的生活领域\n\n' +
    '掷出的是:\n'

  // @ts-ignore
  const detail = '\n\n' + ZodiacPlanet[planetIndex] + ': ' + ZodiacPlanetDetail[ZodiacPlanet[planetIndex]] + '\n' +
    // @ts-ignore
    ZodiacSigns[signIndex] + ': ' + ZodiacSignsDetail[ZodiacSigns[signIndex]] + '\n' +
    // @ts-ignore
    ZodiacHouse[houseIndex] + ': ' + ZodiacHouseDetail[ZodiacHouse[houseIndex]]
  const flyDetail = flyHouseDetails(planetIndex, houseIndex, signIndex);
  // @ts-ignore
  return key + ZodiacPlanet[planetIndex].concat(ZodiacSigns[signIndex]).concat(ZodiacHouse[houseIndex]) + detail + '\n\n' + flyDetail
}

export function getRandomSixGuaString(): string {
  function getNumber(): number {
    return Math.random() > 0.5 ? 1 : 0;
  }

  function boolToString(boolVal: Boolean): string {
    return boolVal ? '1' : '0';
  }

  function boolToYao(boolVal: Boolean, isDong: Boolean): string {
    return boolVal ? '▅▅▅▅▅▅'.concat(boolToDong(isDong)) : '▅▅        ▅▅'.concat(boolToDong(isDong));
  }

  function boolToDong(boolVal: Boolean): string {
    return boolVal ? '\t#\n' : '\n';
  }

  let dong = ''
  let key = ''
  let graph = ''
  for (let i = 0; i < 6; i++) {
    const coinOne = getNumber();
    const coinTwo = getNumber();
    const coinThree = getNumber()
    const total = coinOne + coinTwo + coinThree
    if (total == 0) {
      key = boolToString(true).concat(key)
      graph = boolToYao(true, true).concat(graph)
      dong = dong.concat((i + 1).toString()).concat(' ')
    } else if (total == 1) {
      key = boolToString(false).concat(key)
      graph = boolToYao(false, false).concat(graph)
    } else if (total == 2) {
      key = boolToString(true).concat(key)
      graph = boolToYao(true, false).concat(graph)
    } else if (total == 3) {
      key = boolToString(false).concat(key)
      graph = boolToYao(false, true).concat(graph)
      dong = dong.concat((i + 1).toString()).concat(' ')
    }
  }

  if (dong.trim().length > 0) {
    return graph + AllGua.get(key) + '\n\n' + "动爻是第" + dong + "爻"
  } else {
    return graph + AllGua.get(key) + '\n\n' + "没有动爻"
  }
}

export function getZiWeiCard(): string {
  const mainCardIndex = Math.floor(Math.random() * ZiweiMain.length).toString()
  // @ts-ignore
  const mainCard = ZiweiMain[mainCardIndex] + getPosition()
  const subCardIndex = Math.floor(Math.random() * ZiweiSub.length).toString()
  // @ts-ignore
  const subCard = ZiweiSub[subCardIndex] + getPosition()
  const twelvePhaseIndex = Math.floor(Math.random() * ZiweiTwelvePhase.length).toString()
  // @ts-ignore
  const twelvePhaseCard = ZiweiTwelvePhase[twelvePhaseIndex] + getPosition()
  return "主牌:" + mainCard + "\n副牌:" + subCard + "\n长生牌:" + twelvePhaseCard
}

function getPosition(): string {
  return Math.random() > 0.5 ? " 正位" : " 逆位";
}

export function getTarotCard(): string {
  function getIndex(existingCard: number[]): number {
    while (true) {
      const number = Math.floor(Math.random() * (max - min + 1) + min);
      if (!existingCard.includes(number)) {
        return number
      }
    }
  }

  function getGroupDetail(index: number): string {
    if (index < 22) {
      // @ts-ignore
      return ""
    } else {
      const minorType = Math.floor((index - 22) / 14)
      // @ts-ignore
      return tarotData.minors[minorType].groupMeaning
    }
  }

  function getCard(index: number): tarot.ICard {
    if (index < 22) {
      console.log('major:', index)
      // @ts-ignore
      return tarotData.majors[index]
    } else {
      const minorType = Math.floor((index - 22) / 14)
      const minorIndex = (index - 22) % 14
      console.log('minor:', index, minorType, minorIndex)
      // @ts-ignore
      return tarotData.minors[minorType].cards[minorIndex]
    }
  }

  const max = 77
  const min = 0

  const firstCardIndex = getIndex([]);
  const secondCardIndex = getIndex([firstCardIndex]);
  const thirdCardIndex = getIndex([firstCardIndex, secondCardIndex]);

  const position1 = getPosition();
  const position2 = getPosition();
  const position3 = getPosition();

  const card1 = getCard(firstCardIndex)
  const card2 = getCard(secondCardIndex)
  const card3 = getCard(thirdCardIndex)

  const name1 = card1.name + position1
  const name2 = card2.name + position2
  const name3 = card3.name + position3

  const title = "[维特塔罗牌 圣三角占卜] \n解读原则: 按抽牌顺序, (1)是过去的经验, (2)是问题的现状, (3)是对问题将来的预测结果.\n" +
    "[抽牌结果]\n" +
    "(1)" + name1 + "\n(2)" + name2 + "\n(3)" + name3

  const explain = "\n[解读]" +
    "\n(1) " + name1 + "\n组内牌序: " + card1.index + "\n" + getGroupDetail(firstCardIndex) + card1.meaning +
    "\n(2) " + name2 + "\n组内牌序: " + card2.index + "\n" + getGroupDetail(secondCardIndex) + card2.meaning +
    "\n(3) " + name3 + "\n组内牌序: " + card3.index + "\n" + getGroupDetail(thirdCardIndex) + card3.meaning
  return title + explain
}

function getBaziDetail(date: Date): string {
  console.log(date)
  let solar = DateUtil.format(date, "yyyy年MM月dd日hh时");
  let answer = solar;
  //23时之后算次日
  let h = date.getHours();
  if (h >= 23) {
    date.setDate(date.getDate() + 1);
  }

  let lunar = Lunar.calc(date);
  answer += '\n'
  answer += lunar.str
  let scbz = Bazi.calc(date);
  answer += '\n\n'
  answer += scbz.shishen

  answer += '\n'
  answer += '---------------------------'
  answer += '\n'
  answer += scbz.bz

  console.log(solar);
  console.log(lunar);
  console.log(scbz)
  return answer
}

const birthDateTime = /^[1-2][0-9]{3}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])(20|21|22|23|[0-1]\d)[[0-5][0-9]]?$/;
const errorFormatPromotation = (name: string) => {
  return "[请按格式重新输入]\n如出生于阳历1999年1月1日16时30分(北京时间，不输分钟按零分)，请输入:\n" + name + "199901011630"
}

export function isBaziRequestFormat(input: string): boolean {
  const dt = input.replace('八字', '')
  return birthDateTime.test(dt)
}

export function getBazi(input: string): string {
  const datetime = input.replace('八字', '')

  if (birthDateTime.test(datetime)) {
    const year = parseInt(datetime.substr(0, 4))
    const month = parseInt(datetime.substr(4, 2))
    const day = parseInt(datetime.substr(6, 2))
    const hour = parseInt(datetime.substr(8, 2))
    if (year < 1901) {
      return "[暂时不支持1901年以前的日期]..."
    } else if (month < 1 || month > 12) {
      return "[月份要合理]..."
    } else if (day > 31 || day < 1) {
      return "[日期要合理]..."
    } else if (month == 2 && day > 28) {
      return "[闰月可能还算不准]..."
    } else {
      let date = new Date(year, month - 1, day, hour);
      return getBaziDetail(date)
    }
  } else {
    return errorFormatPromotation('八字')
  }
}
