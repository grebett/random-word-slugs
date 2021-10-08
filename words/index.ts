import { EnglishPartsOfSpeech, EnglishCategories, EnglishWordList, wordListEn } from './en/words';
import { FrenchPartsOfSpeech, FrenchCategories, FrenchWordList, wordListFr } from './fr/words';

type PartsOfSpeech = FrenchPartsOfSpeech | EnglishPartsOfSpeech;
type Categories = FrenchCategories | EnglishCategories;
type WordList = FrenchWordList | EnglishWordList;
type LanguageCode = 'fr' | 'en';

export function getWordsByCategory<P extends PartsOfSpeech>(
  language: LanguageCode,
  partOfSpeech: P,
  categories: Categories[P][] = [],
) {
  const selectedCategoried = new Set(categories);
  const selectedWords: WordList[P][number]["word"][] = [];

  const wordList = language === 'fr' ? wordListFr : wordListEn;
  for (let word of wordList[partOfSpeech]) {
    if (
      categories.length === 0 ||
      word.categories.some((cat: any) => selectedCategoried.has(cat))
    ) {
      selectedWords.push(word.word);
    }
  }

  return selectedWords;
}

export {
  PartsOfSpeech,
  EnglishCategories,
  FrenchCategories,
  LanguageCode,
};