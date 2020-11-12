import {Language} from "../../../Core/Attributes/Language";

// Languages available as filters for Search and Streams.
export abstract class LanguageFilter {
  public static readonly Amharic: Language = new Language("Amharic", "am");
  public static readonly Arabic: Language = new Language("Arabic", "ar");
  public static readonly Armenian: Language = new Language("Armenian", "hy");
  public static readonly Bengali: Language = new Language(["Bengali", "Bangla"], "bn");
  public static readonly Bosnian: Language = new Language("Bosnian", "bs");
  public static readonly Bulgarian: Language = new Language("Bulgarian", "bg");
  public static readonly Burmese: Language = new Language("Burmese", "my");
  public static readonly CentralKurdish: Language = new Language("Central Kurdish", "ckb");
  public static readonly Chinese: Language = new Language("Chinese", "zh");
  public static readonly Croatian: Language = new Language("Croatian", "hr");
  public static readonly Danish: Language = new Language("Danish", "da");
  public static readonly Dutch: Language = new Language("Dutch", "nl");
  public static readonly English: Language = new Language("English", "en");
  public static readonly Estonian: Language = new Language("Estonian", "et");
  public static readonly Finnish: Language = new Language("Finnish", "fi");
  public static readonly French: Language = new Language("French", "fr");
  public static readonly Georgian: Language = new Language("Georgian", "ka");
  public static readonly German: Language = new Language("German", "de");
  public static readonly Greek: Language = new Language(["Greek", "Modern Greek"], "el");
  public static readonly Gujarati: Language = new Language("Gujarati", "gu");
  public static readonly Hebrew: Language = new Language(["Hebrew", "Ivrit"], "he", "iw");
  public static readonly Hindi: Language = new Language("Hindi", "hi");
  public static readonly Hungarian: Language = new Language("Hungarian", "hu");
  public static readonly Icelandic: Language = new Language("Icelandic", "is");
  public static readonly Indonesian: Language = new Language("Indonesian", "id", "in");
  public static readonly Italian: Language = new Language("Italian", "it");
  public static readonly Japanese: Language = new Language("Japanese", "ja", "jp");
  public static readonly Kannada: Language = new Language("Kannada", "kn");
  public static readonly Khmer: Language = new Language("Khmer", "km");
  public static readonly Korean: Language = new Language("Korean", "ko");
  public static readonly Lao: Language = new Language("Lao", "lo");
  public static readonly Latvian: Language = new Language("Latvian", "lv");
  public static readonly Lithuanian: Language = new Language("Lithuanian", "lt");
  public static readonly Malayalam: Language = new Language("Malayalam", "ml");
  public static readonly Marathi: Language = new Language("Marathi", "mr");
  public static readonly Nepali: Language = new Language("Nepali", "ne");
  public static readonly Norwegian: Language = new Language("Norwegian", "no");
  public static readonly Oriya: Language = new Language(["Oriya", "Odia"], "or");
  public static readonly Pashto: Language = new Language(["Pashto", "Pushto"], "ps");
  public static readonly Persian: Language = new Language(["Persian", "Farsi"], "fa");
  public static readonly Polish: Language = new Language("Polish", "pl");
  public static readonly Portuguese: Language = new Language("Portuguese", "pt");
  public static readonly Punjabi: Language = new Language(["Punjabi", "Panjabi"], "pa");
  public static readonly Romanian: Language = new Language("Romanian", "ro");
  public static readonly Russian: Language = new Language("Russian", "ru");
  public static readonly Sindhi: Language = new Language("Sindhi", "sd");
  public static readonly Sinhala: Language = new Language(["Sinhala", "Sinhalese"], "si");
  public static readonly Slovak: Language = new Language("Slovak", "sk");
  public static readonly Slovenian: Language = new Language("Slovenian", "sl");
  public static readonly Spanish: Language = new Language(["Spanish", "Castilian"], "es");
  public static readonly Swedish: Language = new Language("Swedish", "sv");
  public static readonly Tagalog: Language = new Language("Tagalog", "tl");
  public static readonly Tamil: Language = new Language("Tamil", "ta");
  public static readonly Telugu: Language = new Language("Telugu", "te");
  public static readonly Thai: Language = new Language("Thai", "th");
  public static readonly Turkish: Language = new Language("Turkish", "tr");
  public static readonly Urdu: Language = new Language("Urdu", "ur");
  public static readonly Uyghur: Language = new Language(["Uyghur", "Uighur"], "ug");
  public static readonly Vietnamese: Language = new Language("Vietnamese", "vi");

  public getLanguageCode(this: LanguageFilter): string {
    if (this == null) {
      return null;
    }

    // @ts-ignore
    return this != null ? this.code : this.toString();
  }
}
