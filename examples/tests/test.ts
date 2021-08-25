
import {DateUtil} from '../utils/DateUtil'
import {Lunar} from '../utils/Lunar'
import {Bazi} from '../utils/Bazi'

const regex3 = /^[1-2][0-9]{3}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])(20|21|22|23|[0-1]\d)[0-5][0-9]$/;
console.log(regex3.test("201909050107"));  //true
console.log(regex3.test("201902300107"));  //true
console.log(regex3.test("199304052030"));  //true

const input = "199304052030"

console.log("199304052030".match(regex3));

if (regex3.test(input)) {
  const year = parseInt(input.substr(0, 4))
  const month = parseInt(input.substr(4, 2))
  const day = parseInt(input.substr(6, 2))
  const hour = parseInt(input.substr(8, 2))

  let date = new Date(year, month, day, hour);
  _calc(date)
}

function _calc(date:Date) {
  let solar = DateUtil.format(date, "yyyy年MM月dd日 hh时");
  console.log(solar);
  //23时之后算次日
  let h = date.getHours();
  if (h >= 23) {
    date.setDate(date.getDate() + 1);
  }

  let lunar = Lunar.calc(date);
  console.log(lunar);
  let sc =Bazi.cHour(date.getHours());
  console.log(sc)
  let scbz = Bazi.calc(date);
  console.log(scbz)
}

