import { PartsOfSpeech, LanguageCode, EnglishCategories, FrenchCategories } from "./words";
interface FixedLengthArray<T extends any, L extends number> extends Array<T> {
    0: T;
    length: L;
}
declare type Case = "kebab" | "camel" | "title" | "lower" | "sentence";
declare type EnglishOptions<T, L extends number> = {
    partsOfSpeech: FixedLengthArray<T, L>;
    categories: Partial<{
        [K in PartsOfSpeech]: EnglishCategories[K][];
    }>;
    format: Case;
};
declare type FrenchOptions<T, L extends number> = {
    partsOfSpeech: FixedLengthArray<T, L>;
    categories: Partial<{
        [K in PartsOfSpeech]: FrenchCategories[K][];
    }>;
    format: Case;
};
export declare type EnglishRandomWordOptions<N extends number> = Partial<EnglishOptions<PartsOfSpeech, N>>;
export declare type FrenchRandomWordOptions<N extends number> = Partial<FrenchOptions<PartsOfSpeech, N>>;
export declare function generateSlug<N extends number>(language: LanguageCode, numberOfWords?: N, options?: Partial<EnglishOptions<PartsOfSpeech, N>> | Partial<FrenchOptions<PartsOfSpeech, N>>): string;
export declare function totalUniqueSlugs<N extends number>(language: LanguageCode, numberOfWords?: N, options?: EnglishRandomWordOptions<N> | FrenchRandomWordOptions<N>): number;
export {};
