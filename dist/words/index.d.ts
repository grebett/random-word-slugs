import { EnglishPartsOfSpeech, EnglishCategories } from "./en/words";
import { FrenchPartsOfSpeech, FrenchCategories } from "./fr/words";
declare type PartsOfSpeech = FrenchPartsOfSpeech | EnglishPartsOfSpeech;
declare type Categories = FrenchCategories | EnglishCategories;
declare type LanguageCode = "fr" | "en";
export declare function getWordsByCategory<P extends PartsOfSpeech>(language: LanguageCode, partOfSpeech: P, categories?: Categories[P][]): {
    word: string;
    genre?: string | undefined;
    feminized?: string | undefined;
}[];
export { PartsOfSpeech, EnglishCategories, FrenchCategories, LanguageCode, };
