import {FileBox, Message} from "wechaty";
import {addRecord, getAskRecordIn24Hours, OnQueried, resetRecord} from "./db";
import {
  getBazi,
  getRandomSixGuaString,
  getDiceString,
  getTarotCard,
  getZiWeiCard,
  isBaziRequestFormat
} from "./constants";
import * as fs from "fs";

const astro :any = require('./astro')

const dailyQuotaDice = 20
const dailyQuotaZiwei = 20
const dailyQuotaGua = 1
const dailyQuotaTarot = 50
const dailyQuotaBazi = 100
const dailyQuotaHoroscope = 100

async function onInstantMessageType(msg: Message, type: string, quota: number, callback: (msg: string) => string) {
  if (msg.text().includes(type)) {
    let onQueried: OnQueried = async function (rows: any[]) {
      const currentCount = rows.length
      const answer = callback(msg.text())

      const inWhiteList = false
      if (currentCount < quota || inWhiteList) {
        addRecord(msg.talker().id, type, msg.text())
        console.log(answer)
        console.log(process.cwd())
        console.log(fs.existsSync(answer))

        if (answer.startsWith(process.cwd()) &&  fs.existsSync(answer)) {
          // await msg.say('@' + msg.talker().name() + '\n[来自Bot]')
          try {
            // const filepath = __dirname + '/../astrochart/198402291937.jpg'
            const fileBox = FileBox.fromFile(answer)
            console.log(fileBox)
            await msg.say(fileBox.name)
          } catch (e) {
            console.log(e.message)
          }
        } else {
          await msg.say('@' + msg.talker().name() + '\n[来自Bot] \n' + answer)
        }
      } else {
        const word = `[来自Bot]\n 24小时内${type}次数${quota}/${quota}, 请先歇一歇吧(或回复 #重置 走后门)\n`
        await msg.say('@' + msg.talker().name() + '\n' + word)
      }

    }
    getAskRecordIn24Hours(msg.talker().id, type, onQueried)
  }
}

export async function onCoreMessage(msg: Message) {
  if (msg.text().includes('[来自Bot]') || msg.text().includes('- - - - - - - - - - - - - - -')) {
    return
  }

  if (msg.text().includes('#重置')) {
    resetRecord(msg.talker().id)
    return
  }

  await onInstantMessageType(msg, '骰子', dailyQuotaDice, function () {
    return getDiceString()
  })
  await onInstantMessageType(msg, '摇卦', dailyQuotaGua, function () {
    return getRandomSixGuaString()
  })
  await onInstantMessageType(msg, '紫微牌', dailyQuotaZiwei, function () {
    return getZiWeiCard()
  })
  await onInstantMessageType(msg, '塔罗', dailyQuotaTarot, function () {
    return getTarotCard()
  })

  if (isBaziRequestFormat(msg.text())) {
    await onInstantMessageType(msg, '八字', dailyQuotaBazi, function () {
      return getBazi(msg.text())
    })
  }
  if (astro.isHoroscopeRequestFormat(msg.text())) {
    await onInstantMessageType(msg, '星盘', dailyQuotaHoroscope, function () {
      return astro.getHoroscope(msg.text())
    })
  }
}
