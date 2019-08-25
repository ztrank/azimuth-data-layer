interface Converter {
    convert: ConverterFunction;
}

type ConverterFunction = (input: string) => string;
export type ProcedureNameConverter = ConverterFunction | Converter;