"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.totalUniqueSlugs = exports.generateSlug = void 0;
var words_1 = require("./words");
var DEFAULT_NUMBER_OF_WORDS = 3;
function generateSlug(language, numberOfWords, options) {
    var numWords = numberOfWords || DEFAULT_NUMBER_OF_WORDS;
    var defaultOptions = {
        partsOfSpeech: getDefaultPartsOfSpeech(numWords),
        categories: {},
        format: "kebab",
    };
    var opts = __assign(__assign({}, defaultOptions), options);
    var words = [];
    for (var i = 0; i < numWords; i++) {
        var partOfSpeech = opts.partsOfSpeech[i];
        var candidates = (0, words_1.getWordsByCategory)(language, opts.partsOfSpeech[i], opts.categories[partOfSpeech]);
        var rand = __assign(__assign({}, candidates[Math.floor(Math.random() * candidates.length)]), { partOfSpeech: partOfSpeech });
        words.push(rand);
    }
    var genre = words.reduce(function (genre, word) {
        if (word.genre) {
            return word.genre;
        }
        return genre;
    }, "N");
    var feminizedWords = words.map(function (word) { return genre === "F" && word.partOfSpeech === "adjective" ? word.feminized : word.word; });
    return formatter(feminizedWords, opts.format);
}
exports.generateSlug = generateSlug;
function getDefaultPartsOfSpeech(length) {
    var partsOfSpeech = [];
    for (var i = 0; i < length - 1; i++) {
        partsOfSpeech.push("adjective");
    }
    partsOfSpeech.push("noun");
    return partsOfSpeech;
}
function formatter(arr, format) {
    if (format === "kebab") {
        return arr.join("-").toLowerCase();
    }
    if (format === "camel") {
        return arr
            .map(function (el, i) {
            if (i === 0)
                return el.toLowerCase();
            return el[0].toUpperCase() + el.slice(1).toLowerCase();
        })
            .join("");
    }
    if (format === "lower") {
        return arr.join(" ").toLowerCase();
    }
    if (format === "sentence") {
        return arr
            .map(function (el, i) {
            if (i === 0) {
                return el[0].toUpperCase() + el.slice(1).toLowerCase();
            }
            return el;
        })
            .join(" ");
    }
    return arr
        .map(function (el) {
        return el[0].toUpperCase() + el.slice(1).toLowerCase();
    })
        .join(" ");
}
function totalUniqueSlugs(language, numberOfWords, options) {
    var _a, _b;
    var numAdjectives = (0, words_1.getWordsByCategory)(language, "adjective", (_a = options === null || options === void 0 ? void 0 : options.categories) === null || _a === void 0 ? void 0 : _a.adjective).length;
    var numNouns = (0, words_1.getWordsByCategory)(language, "noun", (_b = options === null || options === void 0 ? void 0 : options.categories) === null || _b === void 0 ? void 0 : _b.noun).length;
    var nums = {
        adjective: numAdjectives,
        noun: numNouns,
    };
    var numWords = numberOfWords || DEFAULT_NUMBER_OF_WORDS;
    var partsOfSpeech = (options === null || options === void 0 ? void 0 : options.partsOfSpeech) || getDefaultPartsOfSpeech(numWords);
    var combos = 1;
    for (var i = 0; i < numWords; i++) {
        combos *= nums[partsOfSpeech[i]];
    }
    return combos;
}
exports.totalUniqueSlugs = totalUniqueSlugs;
