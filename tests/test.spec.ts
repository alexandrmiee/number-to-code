import { test, expect } from "@jest/globals";
import NumberToCode from "../index";

test("convert to/from upper", () => {
  const encoded = NumberToCode.encode(123_456);
  expect(encoded).toEqual("AAHAQI");
  const decoded = NumberToCode.decode(encoded);
  expect(decoded).toEqual(123456);
});

test("convert to/from lower", () => {
  const encoded = NumberToCode.encode(123_456, { variant: "lower" });
  expect(encoded).toEqual("aahaqi");
  const decoded = NumberToCode.decode(encoded, { variant: "lower" });
  expect(decoded).toEqual(123456);
});

test("convert to/from full", () => {
  const encoded = NumberToCode.encode(123_456, { variant: "full" });
  expect(encoded).toEqual("AAAtiI");
  const decoded = NumberToCode.decode(encoded, { variant: "full" });
  expect(decoded).toEqual(123456);
});

test("convert to/from alphabet", () => {
  const alphabet = "ASdfHTlOP";
  const encoded = NumberToCode.encode(123_456, { alphabet });
  expect(encoded).toEqual("dAOfSf");
  const decoded = NumberToCode.decode(encoded, { alphabet });
  expect(decoded).toEqual(123456);
});

test("encoded too big", () => {
  try {
    NumberToCode.encode(Number.MAX_SAFE_INTEGER);
  } catch (e) {
    expect(e.message).toEqual(
      "NumberToCode error. Value should be less than 8031810175"
    );
  }
});

test("encoded too big with alphabet", () => {
  try {
    const alphabet = "ASdfHTlOP";
    NumberToCode.encode(Number.MAX_SAFE_INTEGER, { alphabet });
  } catch (e) {
    expect(e.message).toEqual(
      "NumberToCode error. Value should be less than 4782968"
    );
  }
});

test("encoded is NaN", () => {
  try {
    NumberToCode.encode("error" as any);
  } catch (e) {
    expect(e.message).toEqual("NumberToCode error. Value should be a number");
  }
});

test("encoded is not an integer", () => {
  try {
    NumberToCode.encode(1.252);
  } catch (e) {
    expect(e.message).toEqual("NumberToCode error. Value should be integer");
  }
});

test("encoded is less than 0", () => {
  try {
    NumberToCode.encode(-1);
  } catch (e) {
    expect(e.message).toEqual(
      "NumberToCode error. Value should be more than zero"
    );
  }
});
