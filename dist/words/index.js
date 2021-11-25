"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWordsByCategory = void 0;
var words_1 = require("./en/words");
var words_2 = require("./fr/words");
function getWordsByCategory(language, partOfSpeech, categories) {
    var e_1, _a;
    if (categories === void 0) { categories = []; }
    var selectedCategoried = new Set(categories);
    var selectedWords = [];
    var wordList = language === "fr" ? words_2.wordListFr : words_1.wordListEn;
    try {
        for (var _b = __values(wordList[partOfSpeech]), _c = _b.next(); !_c.done; _c = _b.next()) {
            var word = _c.value;
            if (categories.length === 0 ||
                word.categories.some(function (cat) { return selectedCategoried.has(cat); })) {
                selectedWords.push({
                    word: word.word,
                    genre: "genre" in word ? word.genre : undefined,
                    feminized: "feminized" in word ? word.feminized : undefined,
                });
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return selectedWords;
}
exports.getWordsByCategory = getWordsByCategory;
