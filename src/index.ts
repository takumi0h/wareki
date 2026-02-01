type Options = { unit?: boolean };

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

export default function (
  value: string | number | undefined = Date.now(),
  opts: Options = {},
): string | number {
  const dateObj = new Date(value);
  const year = dateObj.getFullYear();
  if (isNaN(year)) {
    return year;
  }
  let wareki = `${year}`;

  for (const eraData of eraDataList) {
    const { firstDate } = eraData;
    const { name } = eraData;
    const eraFirstDateObj = new Date(firstDate);
    if (dateObj.getTime() - eraFirstDateObj.getTime() >= 0) {
      let eraYear = `${year - eraFirstDateObj.getFullYear() + 1}`;
      if (eraYear === "1") {
        eraYear = "元";
      }
      wareki = `${name}${eraYear}`;
      break;
    }
  }
  if (opts.unit) {
    wareki += "年";
  }

  if (!isNaN(Number(wareki))) {
    return Number(wareki);
  }
  return wareki;
}
