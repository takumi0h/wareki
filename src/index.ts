/**
 * 和暦変換オプション
 */
export type Options = {
  /** 「年」を付加するかどうか */
  unit?: boolean;
};

/**
 * 和暦変換の結果型
 */
export type WarekiResult = string | number;

/**
 * 日付入力型
 */
export type DateInput = string | number | Date | undefined;

const eraDataList = [
  {
    code: "reiwa",
    firstDate: "2019-05-01",
    name: "令和",
  },
  {
    code: "heisei",
    firstDate: "1989-01-08",
    name: "平成",
  },
  {
    code: "showa",
    firstDate: "1926-12-25",
    name: "昭和",
  },
  {
    code: "taisho",
    firstDate: "1912-07-30",
    name: "大正",
  },
  {
    code: "meiji",
    firstDate: "1868-01-25",
    name: "明治",
  },
];

/**
 * 西暦を日本の年号（和暦）に変換する
 *
 * @param value - 変換する日付（ISO文字列、タイムスタンプ、Dateオブジェクト）
 * @param opts - オプション設定
 * @returns 和暦表記の文字列、または西暦の数値。無効な日付の場合はNaN
 *
 * @example
 * ```ts
 * wareki("2019-05-01")      // "令和元"
 * wareki("2018-01-01")      // "平成30"
 * wareki("1868-01-24")      // 1868
 * wareki("2018-01-01", { unit: true })  // "平成30年"
 * ```
 */
export function wareki(value: DateInput = Date.now(), opts: Options = {}): WarekiResult {
  const dateObj = value instanceof Date ? value : new Date(value as string | number);
  const year = dateObj.getFullYear();
  if (isNaN(year)) {
    return year;
  }
  let result = `${year}`;

  for (const eraData of eraDataList) {
    const { firstDate } = eraData;
    const { name } = eraData;
    const eraFirstDateObj = new Date(firstDate);
    if (dateObj.getTime() - eraFirstDateObj.getTime() >= 0) {
      let eraYear = `${year - eraFirstDateObj.getFullYear() + 1}`;
      if (eraYear === "1") {
        eraYear = "元";
      }
      result = `${name}${eraYear}`;
      break;
    }
  }
  if (opts.unit) {
    result += "年";
  }

  if (!isNaN(Number(result))) {
    return Number(result);
  }
  return result;
}

export default wareki;
