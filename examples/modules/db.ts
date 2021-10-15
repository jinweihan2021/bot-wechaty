const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./user_history.db');

db.run('CREATE TABLE IF NOT EXISTS user_history_table(wechat_id text, ask_type text, ask_text text, ask_timestamp integer)')
db.run('CREATE TABLE IF NOT EXISTS shining_words_table(wechat_id text, speaker_id text, words text, ask_timestamp integer)')

export function addRecord(wechatId: string, askType: string, askText: string) {
  const sql = `INSERT INTO user_history_table(wechat_id, ask_type, ask_text, ask_timestamp) VALUES(?,?,?,?)`
  const timestamp: number = new Date().valueOf()
  db.run(sql, [wechatId, askType, askText, timestamp],
    function (err: Error | null) {
      if (err) {
        return console.log('insert data error: ', err.message)
      }
    })
}

export function addShiningWords(wechatId: string, speaker_id: string, words: string) {
  const sql = `INSERT INTO shining_words_table(wechat_id, speaker_id, words, ask_timestamp) VALUES(?,?,?,?)`
  const timestamp: number = new Date().valueOf()

  db.run(sql, [wechatId, speaker_id, words, timestamp],
         function (err: Error | null) {
           if (err) {
             return console.log('insert data error: ', err.message)
           }
         })
}

export function resetRecord(wechatId: string) {
  const sql = `DELETE FROM user_history_table WHERE wechat_id=?`
  db.run(sql, [wechatId])
}

export function resetRecordShiningWords(wechatId: string) {
  const sql = `DELETE FROM shining_words_table WHERE wechat_id=?`
  db.run(sql, [wechatId])
}

export function getAskRecordIn24Hours(wechatId: string, askType: string, callback: OnQueried) {
  const timestamp: number = new Date().valueOf() - 24 * 60 * 60 * 1000

  db.all(`SELECT * FROM user_history_table WHERE wechat_id=? AND ask_type=? AND ask_timestamp>?`,
    [wechatId, askType, timestamp],
    function (err: Error | null, rows: any[]) {
      if (err) {
        return console.log('find error: ', err.message)
      }
      callback(rows)
    })
}

export function getAllShiningWords(wechatId: string, callback: OnQueried) {
  db.all(`SELECT * FROM shining_words_table WHERE wechat_id=? LIMIT 100`,
    [wechatId],
    function (err: Error | null, rows: any[]) {
      if (err) {
        return console.log('find error: ', err.message)
      }
      callback(rows)
    })
}
export function getShiningWordsBySpeaker(wechatId: string, speakerId: string, callback: OnQueried) {
  db.all(`SELECT * FROM shining_words_table WHERE wechat_id=? AND speaker_id=? LIMIT 100`,
    [wechatId, speakerId],
    function (err: Error | null, rows: any[]) {
      if (err) {
        return console.log('find error: ', err.message)
      }
      callback(rows)
    })
}

export type OnQueried = (rows: any[]) => void;
