import { generateSlug, FrenchRandomWordOptions, totalUniqueSlugs } from "../index";
import { FrenchCategories, PartsOfSpeech } from "../words";
import { wordListFr } from '../words/fr/words';

const allAdjectives = [...wordListFr.adjective.map(({ word }) => word) as string[], ...wordListFr.adjective.map(({ feminized }) => feminized) as string[]];
const allNouns = wordListFr.noun.map(({ word }) => word) as string[];
const numAdjectives = allAdjectives.length / 2;
const numNouns = allNouns.length;

function checkWordInCategories<P extends PartsOfSpeech>(
  partOfSpeech: P,
  word: string,
  categories: FrenchCategories[P][]
) {
  const cats = new Set(categories);
  const wordCategories = (() => {
    for (let w of wordListFr[partOfSpeech]) {
      if (w.word === word || 'feminized' in w && w.feminized === word) {
        return w.categories;
      }
    }
  })();

  return wordCategories!.some((cat: any) => cats.has(cat));
}

function test(name: string, fn: () => void) {
  it(name, () => {
    for (let i = 0; i < 1000; i++) {
      fn();
    }
  });
}

describe("generateSlug", () => {
  test("generates three random kebab-cased words by default", () => {
    const slug = generateSlug("fr");
    const parts = slug.split("-");
    expect(parts.length).toBeGreaterThanOrEqual(3); // French words are sometimes joined by - TODO: choose between getting rid of them or another symbol maybe?
    expect(allAdjectives.includes(parts[0])).toBe(true);
    expect(allAdjectives.includes(parts[1])).toBe(true);
    const rest = parts.slice(2).join('-');
    expect(allNouns.includes(rest)).toBe(true);
  });
  test("generates four random kebab-cased words if requested", () => {
    const slug = generateSlug("fr", 4);
    const parts = slug.split("-");
    expect(parts.length).toBeGreaterThanOrEqual(4);  // French words are sometimes joined by - TODO: choose between getting rid of them or another symbol maybe?
    expect(allAdjectives.includes(parts[0])).toBe(true);
    expect(allAdjectives.includes(parts[1])).toBe(true);
    expect(allAdjectives.includes(parts[2])).toBe(true);
    const rest = parts.slice(3).join('-');
    expect(allNouns.includes(rest)).toBe(true);
  });
  test("allows user to specify word categories", () => {
    const options: FrenchRandomWordOptions<3> = {
      categories: {
        noun: ["animaux", "education"],
        adjective: ["couleur", "apparence"],
      },
    };
    const slug = generateSlug("fr", 3, options);
    const parts = slug.split("-");
    expect(
      checkWordInCategories(
        "adjective",
        parts[0],
        options!.categories!.adjective!
      )
    ).toBe(true);
    expect(
      checkWordInCategories(
        "adjective",
        parts[1],
        options!.categories!.adjective!
      )
    ).toBe(true);
    expect(
      checkWordInCategories("noun", parts[2], options!.categories!.noun!)
    ).toBe(true);
  });
  test("should format as camelCase", () => {
    const slug = generateSlug("fr", 3, { format: "camel" });
    const second = slug.match(/[A-Z].+?(?=[A-Z])/)![0];
    const splitRegex = new RegExp(second + "(.+)");
    const [first, third] = slug.split(splitRegex);
    expect(first[0]).toBe(first[0].toLowerCase());
    expect(allAdjectives.includes(first)).toBe(true);
    expect(second[0]).toBe(second[0].toUpperCase());
    expect(allAdjectives.includes(second.toLowerCase())).toBe(true);
    expect(third[0]).toBe(third[0].toUpperCase());
    expect(allNouns.includes(third.toLowerCase())).toBe(true);
  });
  test("should format as Title Case", () => {
    const slug = generateSlug("fr", 3, { format: "title" });
    const [first, second, third] = slug.split(" ");
    expect(first[0]).toBe(first[0].toUpperCase());
    expect(allAdjectives.includes(first.toLowerCase())).toBe(true);
    expect(second[0]).toBe(second[0].toUpperCase());
    expect(allAdjectives.includes(second.toLowerCase())).toBe(true);
    expect(third[0]).toBe(third[0].toUpperCase());
    expect(allNouns.includes(third.toLowerCase())).toBe(true);
  });
  test("should format as lower case", () => {
    const slug = generateSlug("fr", 3, { format: "lower" });
    const [first, second, third] = slug.split(" ");
    expect(first[0]).toBe(first[0].toLowerCase());
    expect(allAdjectives.includes(first)).toBe(true);
    expect(second[0]).toBe(second[0].toLowerCase());
    expect(allAdjectives.includes(second)).toBe(true);
    expect(third[0]).toBe(third[0].toLowerCase());
    expect(allNouns.includes(third)).toBe(true);
  });
  test("should format as Sentence case", () => {
    const slug = generateSlug("fr", 3, { format: "sentence" });
    const [first, second, third] = slug.split(" ");
    expect(first[0]).toBe(first[0].toUpperCase());
    expect(allAdjectives.includes(first.toLowerCase())).toBe(true);
    expect(second[0]).toBe(second[0].toLowerCase());
    expect(allAdjectives.includes(second)).toBe(true);
    expect(third[0]).toBe(third[0].toLowerCase());
    expect(allNouns.includes(third)).toBe(true);
  });
});

describe("totalUniqueSlugs", () => {
  it("should tally up total slugs", () => {
    const num = totalUniqueSlugs("fr");
    const actualTotal = numAdjectives * numAdjectives * numNouns;
    expect(num).toBe(actualTotal);
  });
  it("should tally slugs in subset of categories", () => {
    const num = totalUniqueSlugs("fr", 4, {
      categories: {
        noun: ["animaux", "personnes"],
        adjective: ["couleur", "apparence"],
      },
    });
    const numAdjectives = wordListFr.adjective.filter(({ categories }) => {
      for (let category of categories) {
        if (category === "couleur" || category === "apparence") {
          return true;
        }
      }
      return false;
    }).length;
    const numNouns = wordListFr.noun.filter(({ categories }) => {
      for (let category of categories) {
        if (category === "animaux" || category === "personnes") {
          return true;
        }
      }
      return false;
    }).length;
    const actualTotal = numAdjectives ** 3 * numNouns;
    expect(num).toBe(actualTotal);
  });
});

// TODO: add more tests for French specific case (feminine, word order, etc.)