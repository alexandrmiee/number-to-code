export type ConverterOptions = {
    alphabet?: string;
    variant?: "upper" | "lower" | "full";
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
