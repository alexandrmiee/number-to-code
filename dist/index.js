const MODULO_SHORT = 26;
const MODULO_FULL = MODULO_SHORT * 2;
const UPPER_OFFSET = "A".charCodeAt(0);
const LOWER_OFFSET = "a".charCodeAt(0);
const RESULT_LENGTH = 6;
class NumberToCode {
    encode(value, options = {}) {
        this.validateInput(value, options);
        let rest = value;
        const modulo = this.getModulo(options);
        let result = "";
        while (rest >= modulo) {
            result = this.getSymbol(rest % modulo, options) + result;
            rest = Math.floor(rest / modulo);
        }
        result = this.getSymbol(rest % modulo, options) + result;
        return result.padStart(RESULT_LENGTH, this.getSymbol(0, options));
    }
    decode(string, options = {}) {
        const modulo = this.getModulo(options);
        return Number(string.split("").reduce((result, symbol, index) => {
            result =
                result +
                    this.getNumber(symbol, options) *
                        Math.pow(modulo, string.length - index - 1);
            return result;
        }, 0));
    }
    getModulo(options = {}) {
        if (options.alphabet) {
            return options.alphabet.length;
        }
        if (options.variant === "full") {
            return MODULO_FULL;
        }
        return MODULO_SHORT;
    }
    getSymbol(value, options = {}) {
        if (options.alphabet) {
            return options.alphabet[value];
        }
        let offset = UPPER_OFFSET;
        let index = value;
        if (options.variant === "full" && value > MODULO_SHORT) {
            offset = LOWER_OFFSET;
            index = value - MODULO_SHORT;
        }
        if (options.variant === "lower") {
            offset = LOWER_OFFSET;
        }
        return String.fromCharCode(index + offset);
    }
    getNumber(symbol, options = {}) {
        if (options.alphabet) {
            return options.alphabet.indexOf(symbol);
        }
        let charCode = symbol.charCodeAt(0);
        let offset = UPPER_OFFSET;
        if (options.variant === "full" && charCode > UPPER_OFFSET + MODULO_SHORT) {
            offset = LOWER_OFFSET;
            charCode = charCode + MODULO_SHORT;
        }
        if (options.variant === "lower") {
            offset = LOWER_OFFSET;
        }
        return charCode - offset;
    }
    validateInput(value, options = {}) {
        var _a;
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
        if ((_a = options.alphabet) === null || _a === void 0 ? void 0 : _a.length) {
            base = options.alphabet.length;
        }
        if (options.variant === "full") {
            base = MODULO_FULL;
        }
        const maxValue = Math.pow(base, RESULT_LENGTH + 1) - 1;
        if (value > maxValue) {
            throw new Error("NumberToCode error. Value should be less than " + maxValue);
        }
    }
}
const numberToCode = new NumberToCode();
export default numberToCode;
