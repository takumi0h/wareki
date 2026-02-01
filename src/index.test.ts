import wareki, { type Options, type WarekiResult, type DateInput } from "./index";
import { test, expect, describe } from "vitest";

describe("wareki", () => {
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

  describe("edge cases", () => {
    test("undefined input uses current date", () => {
      const result = wareki(undefined);
      expect(typeof result).toBe("string");
      expect(result).toMatch(/^令和\d+$/);
    });

    test("no argument uses current date", () => {
      const result = wareki();
      expect(typeof result).toBe("string");
      expect(result).toMatch(/^令和\d+$/);
    });

    test("empty string returns NaN", () => {
      expect(wareki("")).toBe(NaN);
    });

    test("Date object input", () => {
      expect(wareki(new Date("2019-05-01"))).toBe("令和元");
      expect(wareki(new Date("2018-01-01"))).toBe("平成30");
      expect(wareki(new Date(1514764800000))).toBe("平成30");
    });

    test("future dates", () => {
      expect(wareki("2030-01-01")).toBe("令和12");
      expect(wareki("2100-01-01")).toBe("令和82");
    });

    test("ancient dates before Meiji", () => {
      expect(wareki("1800-01-01")).toBe(1800);
      expect(wareki("1000-01-01")).toBe(1000);
    });

    test("empty options object", () => {
      expect(wareki("2018-01-01", {})).toBe("平成30");
    });

    test("options with undefined unit", () => {
      expect(wareki("2018-01-01", { unit: undefined })).toBe("平成30");
    });
  });

  describe("type exports", () => {
    test("Options type is exported", () => {
      const opts: Options = { unit: true };
      expect(wareki("2018-01-01", opts)).toBe("平成30年");
    });

    test("WarekiResult type is exported", () => {
      const result: WarekiResult = wareki("2018-01-01");
      expect(result).toBe("平成30");
    });

    test("DateInput type is exported", () => {
      const input: DateInput = "2018-01-01";
      expect(wareki(input)).toBe("平成30");
    });
  });
});
