import wareki from "./index";
import { test, expect } from "vitest";

test("returns era year", () => {
  expect(wareki("2018-01-01")).toBe("平成30");
  expect(wareki("2018/01/01")).toBe("平成30");
  expect(wareki("2018-1-1")).toBe("平成30");
  expect(wareki("2018/01/1")).toBe("平成30");
  expect(wareki(1514764800000)).toBe("平成30");

  expect(wareki("1868-01-24")).toBe(1868);
  expect(wareki("1868-01-25")).toBe("明治元");
  expect(wareki("1912-07-29")).toBe("明治45");
  expect(wareki("1912-07-30")).toBe("大正元");
  expect(wareki("1926-12-24")).toBe("大正15");
  expect(wareki("1926-12-25")).toBe("昭和元");
  expect(wareki("1989-01-07")).toBe("昭和64");
  expect(wareki("1989-01-08")).toBe("平成元");
  expect(wareki("2019-04-30")).toBe("平成31");
  expect(wareki("2019-05-01")).toBe("令和元");
  expect(wareki("2020-01-01")).toBe("令和2");
  expect(wareki(0)).toBe("昭和45");
  expect(wareki(10000)).toBe("昭和45");
  expect(wareki(1000000)).toBe("昭和45");
});

test("invalid date returns NaN", () => {
  expect(wareki("invalid")).toBe(NaN);
  expect(wareki("20180101")).toBe(NaN);
  expect(wareki("2018年1月1日")).toBe(NaN);
});

test("with unit option", () => {
  expect(wareki("1868-01-24", { unit: true })).toBe("1868年");
  expect(wareki("1868-01-24", { unit: false })).toBe(1868);
  expect(wareki("2018-01-01", { unit: true })).toBe("平成30年");
  expect(wareki("2018-01-01", { unit: false })).toBe("平成30");
});
