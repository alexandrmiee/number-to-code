export enum ConverterVariants {
  Upper = "upper",
  Lower = "lower",
  Full = "full",
}
export type ConverterOptions = {
  alphabet?: string;
  variant?: ConverterVariants;
};

const MODULO_SHORT = 26;
const MODULO_FULL = MODULO_SHORT * 2;
const UPPER_OFFSET = "A".charCodeAt(0);
const LOWER_OFFSET = "a".charCodeAt(0);
const RESULT_LENGTH = 6;

class NumberToCode {
  encode(value: number, options: ConverterOptions = {}) {
    this.validateInput(value, options);

    let rest = value;
    const modulo = this.getModulo(options);
    let result = "";
    while (rest > modulo) {
      result = this.getSymbol(rest % modulo, options) + result;
      rest = Math.floor(rest / modulo);
    }
    result = this.getSymbol(rest % modulo, options) + result;

    return result.padStart(RESULT_LENGTH, this.getSymbol(0, options));
  }

  decode(string: string, options: ConverterOptions = {}) {
    const modulo = this.getModulo(options);
    return Number(
      string.split("").reduce((result, symbol, index) => {
        result =
          result +
          this.getNumber(symbol, options) *
            Math.pow(modulo, string.length - index - 1);
        return result;
      }, 0)
    );
  }

  private getModulo(options: ConverterOptions = {}) {
    if (options.alphabet) {
      return options.alphabet.length;
    }

    if (options.variant === ConverterVariants.Full) {
      return MODULO_FULL;
    }

    return MODULO_SHORT;
  }

  private getSymbol(value: number, options: ConverterOptions = {}) {
    if (options.alphabet) {
      return options.alphabet[value];
    }

    let offset = UPPER_OFFSET;
    let index = value;

    if (options.variant === ConverterVariants.Full && value > MODULO_SHORT) {
      offset = LOWER_OFFSET;
      index = value - MODULO_SHORT;
    }

    if (options.variant === ConverterVariants.Lower) {
      offset = LOWER_OFFSET;
    }

    return String.fromCharCode(index + offset);
  }

  private getNumber(symbol: string, options: ConverterOptions = {}) {
    if (options.alphabet) {
      return options.alphabet.indexOf(symbol);
    }

    let charCode = symbol.charCodeAt(0);

    let offset = UPPER_OFFSET;

    if (
      options.variant === ConverterVariants.Full &&
      charCode > UPPER_OFFSET + MODULO_SHORT
    ) {
      offset = LOWER_OFFSET;
      charCode = charCode + MODULO_SHORT;
    }

    if (options.variant === ConverterVariants.Lower) {
      offset = LOWER_OFFSET;
    }

    return charCode - offset;
  }

  private validateInput(value: number, options: ConverterOptions = {}) {
    if (isNaN(value)) {
      throw new Error("NumberToCode error. Value should be a number");
    }
    if (value < 0) {
      throw new Error("NumberToCode error. Value should be more than zero");
    }
    if (!Number.isInteger(value)) {
      throw new Error("NumberToCode error. Value should be integer");
    }

    let base = MODULO_SHORT;
    if (options.alphabet?.length) {
      base = options.alphabet.length;
    }
    if (options.variant === ConverterVariants.Full) {
      base = MODULO_FULL;
    }

    const maxValue = Math.pow(base, RESULT_LENGTH + 1) - 1;

    if (value > maxValue) {
      throw new Error(
        "NumberToCode error. Value should be less than " + maxValue
      );
    }
  }
}

const numberToCode = new NumberToCode();

export default numberToCode;
