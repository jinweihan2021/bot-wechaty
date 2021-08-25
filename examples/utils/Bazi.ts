/**
 * Created by mawei on 2017/5/29.
 */



const Gan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const Zhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const Wx = ["木", "火", "土", "金", "水"];
const Fw = ["东", "南", "中", "西", "北"];
const Shishen = ["比肩", "劫财", "偏印", "正印", "七杀", "正官", "偏财", "正财", "食神", "伤官"];
//const Animals = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
//const solarTerm = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"];
const solarMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const sTermInfo = [0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758];

export interface WxFw {
  fw: string;
  wx: string;
}

export class Bazi {

  /**
   * 传入 offset 返回干支, 0=甲子
   * @param num
   * @returns {*}
   */
  static cyclical(num: number) {
    // @ts-ignore
    return (Gan[num % 10] + Zhi[num % 12]);
  }

  /**
   * 返回公历 y年某m+1月的天数
   * @param y
   * @param m
   * @returns {*}
   */
  static solarDays(y: number, m: number) {
    if (m === 1) {
      return ((y % 4 === 0) && (y % 100 !== 0) || (y % 400 === 0)) ? 29 : 28;
    } else {
      return solarMonth[m];
    }
  }

  /**
   * 某年的第n个节气为几日(从0小寒起算)
   * @param y
   * @param n
   * @returns {number}
   */
  static sTerm(y: number, n: number) {
    // @ts-ignore
    const offDate = new Date((31556925974.7 * (y - 1900) + sTermInfo[n] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
    return (offDate.getUTCDate());
  }

  /**
   *
   * @constructor
   * @param objDate
   */
  static calc(objDate: Date) {
    let y = objDate.getFullYear(),
      m = objDate.getMonth(),
      d = objDate.getDate(),
      h = objDate.getHours();

    let cY, cM, cD; //年柱,月柱,日柱

    ////////年柱 1900年立春后为庚子年(60进制36)
    if (m < 2) {
      cY = this.cyclical(y - 1900 + 36 - 1);
    } else {
      cY = this.cyclical(y - 1900 + 36);
    }
    const term2 = this.sTerm(y, 2); //立春日期
    //依节气调整二月分的年柱, 以立春为界
    if (m === 1 && d >= term2) cY = this.cyclical(y - 1900 + 36);

    ////////月柱 1900年1月小寒以前为 丙子月(60进制12)
    const firstNode = this.sTerm(y, m * 2); //返回当月「节」为几日开始
    cM = this.cyclical((y - 1900) * 12 + m + 12);
    //依节气月柱, 以「节」为界
    if (d >= firstNode) cM = this.cyclical((y - 1900) * 12 + m + 13);


    //当月一日与 1900/1/1 相差天数
    //1900/1/1与 1970/1/1 相差25567日, 1900/1/1 日柱为甲戌日(60进制10)
    var dayCyclical = Date.UTC(y, m, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
    //日柱
    cD = this.cyclical(dayCyclical + d - 1);

    const sZ = this.calcSz(cD, h);

    return {
      nz: cY,
      yz: cM,
      rz: cD,
      sz: sZ,
      bz: cY + "\t" + cM + "\t" + cD + "\t" + this.calcSz(cD, h),
      wx: this.calcWxFw(cY).wx + "\t" + this.calcWxFw(cM).wx + "\t" + this.calcWxFw(cD).wx + "\t" + this.calcWxFw(sZ).wx,
      fw: this.calcWxFw(cY).fw + "\t" + this.calcWxFw(cM).fw + "\t" + this.calcWxFw(cD).fw + "\t" + this.calcWxFw(sZ).fw,
      shishen: this.calcShiShen(cD, cY) + "\t" + this.calcShiShen(cD, cM) + "\t日主\t" + this.calcShiShen(cD, sZ),
    };
  }


  /**
   * 计算时柱 （论日上起时）
   * 甲己还加甲，
   * 乙庚丙作初，
   * 丙辛从戊起，
   * 丁壬庚子居，
   * 戊癸何方发，
   * 壬子是真途
   * @param rz
   * @param hour
   */
  static calcSz(rz: string, hour: number) {
    let rg = rz.substr(0, 1);
    let st = 0;
    let x = Math.ceil(hour / 2) % 12; //计算出时辰是第几位
    if (rg === "甲" || rg === "己") {
      st = 1; //"甲";
    } else if (rg === "乙" || rg === "庚") {
      st = 3; //"丙";
    } else if (rg === "丙" || rg === "辛") {
      st = 5;//"戊";
    } else if (rg === "丁" || rg === "壬") {
      st = 7;//"庚";
    } else if (rg === "戊" || rg === "癸") {
      st = 9;//"壬";
    }
    // @ts-ignore
    return Gan[(x + st - 1) % 10] + Zhi[x];
  }

  /**
   * 计算时辰
   * @param hour
   * @returns {string}
   */
  static cHour(hour: number) {
    let x = Math.ceil(hour / 2) % 12;
    return Zhi[x];
  }

  /**
   * 金：天干的庚\t辛 地支金：申\t酉
   * 木：天干的甲\t乙 地支木：寅\t卯
   * 水：天干的壬\t癸 地支水：子\t亥
   * 火：天干的丙\t丁 地支火：巳\t午
   * 土：天干的戊\t己 地支土：丑\t辰\t未\t戌
   * 计算五行方位
   */
  static calcWxFw(gz: string) {
    let tg = gz.substr(0, 1);
    let tgi = Gan.indexOf(tg);
    let json: WxFw = {
      // @ts-ignore
      fw: Fw[((tgi / 2) | 0) % 5],
      // @ts-ignore
      wx: Wx[((tgi / 2) | 0) % 5]
    };

    let dz = gz.substr(1, 1);
    switch (dz) {
      case "申" :
      case "酉" :
        json.wx += "金";
        json.fw += "西";
        break;
      case "寅" :
      case "卯" :
        json.wx += "木";
        json.fw += "东";
        break;
      case "子" :
      case "亥" :
        json.wx += "水";
        json.fw += "北";
        break;
      case "巳" :
      case "午" :
        json.wx += "火";
        json.fw += "南";
        break;
      default :
        json.wx += "土";
        json.fw += "中";
    }
    return json;
  }

  /**
   * 计算十神
   * 十神最简算法 神=日干-它干+1或3，+3当且仅当日干奇它干偶时，神数比肩１，劫财２，偏印３，正印４，偏官５，正官６，偏财７，正财８，食神９，伤官10．
   * @param rz
   * @param tz
   */
  static calcShiShen(rz: string, tz: string) {
    // 日干
    let rg = rz.substr(0, 1);
    let rgi = Gan.indexOf(rg) + 1;
    // 它干
    let tg = tz.substr(0, 1);
    let tgi = Gan.indexOf(tg) + 1;
    let x = 1;
    if (rgi % 2 === 1 && tgi % 2 === 0) {
      x = 3;
    }
    let index = rgi - tgi + x - 1;
    if (index < 0) {
      index += 10;
    } else {
      index %= 10;
    }
    return Shishen[index]
  }
}

module.exports.Bazi = Bazi;
