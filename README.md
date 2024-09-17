## Description

Library for converting numbers to short codes and back

```ts
NumberToCode.encode(123_456); //AAHAQI
NumberToCode.decode("AAHAQI"); //123456
```

## Install

add to `package.json` file in `dependencies` section

```json
"number-to-code": "git+https://github.com/alexandrmiee/number-to-code.git",
```

## Usage

```ts
import NumberToCode from "number-to-code";
//...
NumberToCode.encode(123456); //AAHAQI
NumberToCode.decode("AAHAQI"); //123456
//...
```

### ConverterOptions

#### variant

Converter can use different variants of symbols fo conversion:

- `upper` (default) English alphabetical symbols in upper case [A-Z]
- `lower` English alphabetical symbols in lower case [a-z]
- `full` English alphabetical symbols in lower and upper case [A-Z-a-z]

```ts
import NumberToCode, { ConverterVariants } from "number-to-code";
//...
NumberToCode.encode(123456); //AAHAQI
NumberToCode.decode("AAHAQI"); //123456
//...
NumberToCode.encode(123456, { variant: ConverterVariants.Upper }); //AAHAQI
NumberToCode.decode("AAHAQI", { variant: ConverterVariants.Upper }); //123456
//...
NumberToCode.encode(123456, { variant: ConverterVariants.Lower }); //aahaqi
NumberToCode.decode("aahaqi", { variant: ConverterVariants.Lower }); //123456
//...
NumberToCode.encode(123456, { variant: ConverterVariants.Full }); //AAAtiI
NumberToCode.decode("AAAtiI", { variant: ConverterVariants.Full }); //123456
```

#### alphabet

Converter will use custom alphabet for conversion. Variant will be ignored.

```ts
import NumberToCode from "number-to-code";
//...
const alphabet = "ASdfHTlOP";
const encoded = NumberToCode.encode(123_456, { alphabet }); //dAOfSf
const decoded = NumberToCode.decode(encoded, { alphabet }); //123456
```

### Restrictions

The converter works on the principle of converting from the decimal number system to the base N system. Where N is the length of the alphabet. Therefore, obtaining a 6-character code is limited to N.

`MaxNumber = Math.pow(N, 6 + 1) - 1`

## Test

```bash
npm run test
```
