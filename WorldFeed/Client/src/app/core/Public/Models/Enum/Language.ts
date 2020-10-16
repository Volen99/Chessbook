﻿
    // Languages available on Twitter. Some codes returned by Twitter are not documented and will return Undefined.
    // If a language code is not supported but you know which language it represents, please to open an issue.
    export enum Language
    {
        [Language("Undefined", "undefined", "xx")] Undefined = 0,
        [Language("Highland Popoluca", "poi")] HighlandPopoluca,
        [Language("Abkhaz", "ab")] Abkhaz,
        [Language("Afar", "aa")] Afar,
        [Language("Afrikaans", "af")] Afrikaans,
        [Language("Akan", "ak")] Akan,
        [Language("Albanian", "sq")] Albanian,
        [Language("Amharic", "am")] Amharic,
        [Language("Arabic", "ar")] Arabic,
        [Language("Aragonese", "an")] Aragonese,
        [Language("Armenian", "hy")] Armenian,
        [Language("Assamese", "as")] Assamese,
        [Language("Avar", "av")] Avaric,
        [Language("Avestan", "ae")] Avestan,
        [Language("Aymara", "ay")] Aymara,
        [Language("Azerbaijani", "az")] Azerbaijani,
        [Language("Bambara", "bm")] Bambara,
        [Language("Bashkir", "ba")] Bashkir,
        [Language("Basque", "eu")] Basque,
        [Language("Belarusian", "be")] Belarusian,
        [Language(new [] { "Bengali", "Bangla" }, "bn")] Bengali,
        [Language("Bihari", "bh")] Bihari,
        [Language("Bislama", "bi")] Bislama,
        [Language("Bosnian", "bs")] Bosnian,
        [Language("Breton", "br")] Breton,
        [Language("British", "en-gb")] British,
        [Language("Bulgarian", "bg")] Bulgarian,
        [Language("Burmese", "my")] Burmese,
        [Language(new [] { "Catalan", "Valencian" }, "ca")] Catalan,
        [Language("Central Kurdish", "ckb")] CentralKurdish,
        [Language("Chamorro", "ch")] Chamorro,
        [Language("Chechen", "ce")] Chechen,
        [Language("Chinese", "zh")] Chinese,
        [Language("Chinese", "zh-tw")] ChineseTraditional,
        [Language("Chinese", "zh-cn")] ChineseSimplified,
        [Language("Chuvash", "cv")] Chuvash,
        [Language("Cornish", "kw")] Cornish,
        [Language("Corsican", "co")] Corsican,
        [Language("Cree", "cr")] Cree,
        [Language("Croatian", "hr")] Croatian,
        [Language("Czech", "cs")] Czech,
        [Language("Danish", "da")] Danish,
        [Language(new [] { "Divehi", "Dhivehi", "Maldivian", }, "dv")] Divehi,
        [Language("Dutch", "nl")] Dutch,
        [Language("Dzongkha", "dz")] Dzongkha,
        [Language("English", "en")] English,
        [Language("Esperanto", "eo")] Esperanto,
        [Language("Estonian", "et")] Estonian,
        [Language("Ewe", "ee")] Ewe,
        [Language("Faroese", "fo")] Faroese,
        [Language("Fijian", "fj")] Fijian,
        [Language("Filipino", "fil")] Filipino,
        [Language("Finnish", "fi")] Finnish,
        [Language("French", "fr")] French,
        [Language(new[] { "Fula", "Fulah", "Pulaar", "Pular" }, "ff")] Fula,
        [Language(new[] { "Scottish Gaelic", "Gaelic" }, "gd")] ScottishGaelic,
        [Language("Galician", "gl")] Galician,
        [Language("Georgian", "ka")] Georgian,
        [Language("German", "de")] German,
        [Language(new [] { "Greek", "Modern Greek" }, "el")] Greek,
        [Language("Guarani", "gn")] Guarani,
        [Language("Gujarati", "gu")] Gujarati,
        [Language(new [] { "Haitian", "Haitian Creole" }, "ht")] Haitian,
        [Language("Hausa", "ha")] Hausa,
        [Language(new [] { "Hebrew", "Ivrit" }, "he", "iw")] Hebrew,
        [Language("Herero", "hz")] Herero,
        [Language("Hindi", "hi")] Hindi,
        [Language("Hiri Motu", "ho")] HiriMotu,
        [Language("Hungarian", "hu")] Hungarian,
        [Language("Interlingua", "ia")] Interlingua,
        [Language("Indonesian", "id", "in")] Indonesian,
        [Language("Interlingue", "ie")] Interlingue,
        [Language("Irish", "ga")] Irish,
        [Language("Igbo", "ig")] Igbo,
        [Language(new [] { "Inupiat", "Inupiaq" }, "ik")] Inupiat,
        [Language("Ido", "io")] Ido,
        [Language("Icelandic", "is")] Icelandic,
        [Language("Italian", "it")] Italian,
        [Language("Inuktitut", "iu")] Inuktitut,
        [Language("Japanese", "ja", "jp")] Japanese,
        [Language("Javanese", "jv")] Javanese,
        [Language(new [] { "Greenlandic", "Kalaallisut" }, "kl")] Greenlandic,
        [Language("Kannada", "kn")] Kannada,
        [Language("Kanuri", "kr")] Kanuri,
        [Language("Kashmiri", "ks")] Kashmiri,
        [Language("Kazakh", "kk")] Kazakh,
        [Language("Khmer", "km")] Khmer,
        [Language(new [] { "Kikuyu", "Gikuyu" }, "ki")] Kikuyu,
        [Language("Kinyarwanda", "rw")] Kinyarwanda,
        [Language("Kyrgyz", "ky")] Kyrgyz,
        [Language("Komi", "kv")] Komi,
        [Language("Kongo", "kg")] Kongo,
        [Language("Korean", "ko")] Korean,
        [Language("Kurdish", "ku")] Kurdish,
        [Language(new [] { "Kwanyama", "Kuanyama" }, "kj")] Kwanyama,
        [Language("Latin", "la")] Latin,
        [Language(new [] { "Luxembourgish", "Letzeburgesch" }, "lb")] Luxembourgish,
        [Language("Luganda", "lg")] Luganda,
        [Language(new [] { "Limburgish", "Limburgan", "Limburger" }, "li")] Limburgish,
        [Language("Lingala", "ln")] Lingala,
        [Language("Lao", "lo")] Lao,
        [Language("Latvian", "lv")] Latvian,
        [Language("Lithuanian", "lt")] Lithuanian,
        [Language("Luba-Katanga", "lu")] LubaKatanga,
        [Language("Manx", "gv")] Manx,
        [Language("Macedonian", "mk")] Macedonian,
        [Language("Malagasy", "mg")] Malagasy,
        [Language(new [] { "Malay", "Melayu" }, new [] { "msa", "ms" })] Malay,
        [Language("Malayalam", "ml")] Malayalam,
        [Language("Maltese", "mt")] Maltese,
        [Language("Māori", "mi")] Maori,
        [Language("Marathi", "mr")] Marathi,
        [Language("Marshallese", "mh")] Marshallese,
        [Language("Mongolian", "mn")] Mongolian,
        [Language("Nauruan", "na")] Nauruan,
        [Language(new [] { "Navajo", "Navaho" }, "nv")] Navajo,
        [Language("Norwegian Bokmål", "nb")] NorwegianBokmal,
        [Language("Zimbabwean Ndebele", "nd")] ZimbabweanNdebele,
        [Language("Nepali", "ne")] Nepali,
        [Language("Ndonga", "ng")] Ndonga,
        [Language("Norwegian Nynorsk", "nn")] NorwegianNynorsk,
        [Language("Norwegian", "no")] Norwegian,
        [Language("Nuosu", "ii")] Nuosu,
        [Language("Southern Ndebele", "nr")] SouthernNdebele,
        [Language(new[] { "Nyanja", "Chewa", "Chichewa" }, "ny")] Nyanja,
        [Language("Occitan", "oc")] Occitan,
        [Language(new [] { "Ojibwe", "Ojibwa" }, "oj")] Ojibwe,
        [Language(new [] { "Church Slavonic", "Church Slavic", "Old Bulgarian", "Old Slavonic" }, "cu")] ChurchSlavonic,
        [Language("Oromo", "om")] Oromo,
        [Language(new [] { "Oriya", "Odia"  }, "or")] Oriya,
        [Language(new [] { "Ossetian", "Ossetic" }, "os")] Ossetian,
        [Language("Pali", "pi")] Pali,
        [Language(new [] { "Pashto", "Pushto" }, "ps")] Pashto,
        [Language(new[] { "Persian", "Farsi" }, "fa")] Persian,
        [Language("Polish", "pl")] Polish,
        [Language("Portuguese", "pt")] Portuguese,
        [Language(new[] { "Punjabi", "Panjabi" }, "pa")] Punjabi,
        [Language("Quechua", "qu")] Quechua,
        [Language("Romansh", "rm")] Romansh,
        [Language("Kirundi", "rn")] Kirundi,
        [Language("Romanian", "ro")] Romanian,
        [Language("Russian", "ru")] Russian,
        [Language("Sanskrit", "sa")] Sanskrit,
        [Language("Sardinian", "sc")] Sardinian,
        [Language("Sindhi", "sd")] Sindhi,
        [Language("Northern Sami", "se")] NorthernSami,
        [Language("Samoan", "sm")] Samoan,
        [Language("Sango", "sg")] Sango,
        [Language("Serbian", "sr")] Serbian,
        [Language("Shona", "sn")] Shona,
        [Language(new [] { "Sinhala", "Sinhalese" }, "si")] Sinhala,
        [Language("Slovak", "sk")] Slovak,
        [Language("Slovenian", "sl")] Slovenian,
        [Language("Somali", "so")] Somali,
        [Language("Sotho", "st")] Sotho,
        [Language(new [] { "Spanish", "Castilian" }, "es")] Spanish,
        [Language("Sundanese", "su")] Sundanese,
        [Language("Swahili", "sw")] Swahili,
        [Language(new [] { "Swazi", "Swati" }, "ss")] Swazi,
        [Language("Swedish", "sv")] Swedish,
        [Language("Tagalog", "tl")] Tagalog,
        [Language("Tahitian", "ty")] Tahitian,
        [Language("Tajik", "tg")] Tajik,
        [Language("Tamil", "ta")] Tamil,
        [Language("Tatar", "tt")] Tatar,
        [Language("Telugu", "te")] Telugu,
        [Language("Thai", "th")] Thai,
        [Language("Tigrinya", "ti")] Tigrinya,
        [Language("Tibetan", "bo")] Tibetan,
        [Language("Tonga", "to")] Tonga,
        [Language("Tswana", "tn")] Tswana,
        [Language("Turkish", "tr")] Turkish,
        [Language("Turkmen", "tk")] Turkmen,
        [Language("Tsonga", "ts")] Tsonga,
        [Language("Twi", "tw")] Twi,
        [Language("Ukrainian", "uk")] Ukrainian,
        [Language("Urdu", "ur")] Urdu,
        [Language(new [] { "Uyghur", "Uighur" }, "ug")] Uyghur,
        [Language("Uzbek", "uz")] Uzbek,
        [Language("Venda", "ve")] Venda,
        [Language("Vietnamese", "vi")] Vietnamese,
        [Language("Volapük", "vo")] Volapuk,
        [Language("Walloon", "wa")] Walloon,
        [Language("Welsh", "cy")] Welsh,
        [Language("Wolof", "wo")] Wolof,
        [Language("Western Frisian", "fy")] WesternFrisian,
        [Language("Xhosa", "xh")] Xhosa,
        [Language("Yiddish", "yi")] Yiddish,
        [Language("Yoruba", "yo")] Yoruba,
        [Language(new [] { "Zhuang", "Chuang" }, "za")] Zhuang,
        [Language("Zulu", "zu")] Zulu,

        // ReSharper disable once InconsistentNaming
        [Language("Not Referenced", "un")] UN_NotReferenced
    }
