export declare enum ConverterVariants {
    Upper = "upper",
    Lower = "lower",
    Full = "full"
}
export type ConverterOptions = {
    alphabet?: string;
    variant?: ConverterVariants;
};
declare class NumberToCode {
    encode(value: number, options?: ConverterOptions): string;
    decode(string: string, options?: ConverterOptions): number;
    private getModulo;
    private getSymbol;
    private getNumber;
    private validateInput;
}
declare const numberToCode: NumberToCode;
export default numberToCode;
