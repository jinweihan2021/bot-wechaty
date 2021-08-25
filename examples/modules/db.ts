const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./user_history.db');

db.run('CREATE TABLE IF NOT EXISTS user_history_table(wechat_id text, ask_type text, ask_text text, ask_timestamp integer)')

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

export function resetRecord(wechatId: string) {
  const sql = `DELETE FROM user_history_table WHERE wechat_id=?`
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

export type OnQueried = (rows: any[]) => void;
