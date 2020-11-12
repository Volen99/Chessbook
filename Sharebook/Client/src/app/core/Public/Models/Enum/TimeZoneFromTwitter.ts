import {TimeZoneFromTwitterAttribute} from "../../../Core/Attributes/TimeZoneFromTwitterAttribute";
import Regex from "typescript-dotnet-commonjs/System/Text/RegularExpressions";
import {format} from "typescript-dotnet-commonjs/System/Text/Utility";

// As described on http://api.rubyonrails.org/classes/ActiveSupport/TimeZone.html
export abstract class TimeZoneFromTwitter {
  public static readonly International_Date_Line_West: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Pacific/Midway", "International Date Line West");
  public static readonly Midway_Island: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Pacific/Midway", "Midway Island");
  public static readonly American_Samoa: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Pacific/Pago_Pago", "American Samoa");
  public static readonly Hawaii: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Pacific/Honolulu", "Hawaii");
  public static readonly Alaska: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("America/Juneau", "Alaska");
  public static readonly Tijuana: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("America/Tijuana", "Tijuana");
  public static readonly Arizona: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("America/Phoenix", "Arizona");
  public static readonly Chihuahua: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("America/Chihuahua", "Chihuahua");
  public static readonly Mazatlan: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("America/Mazatlan", "Mazatlan");
  public static readonly Saskatchewan: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("America/Regina", "Saskatchewan");
  public static readonly Guadalajara: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("America/Mexico_City", "Guadalajara");
  public static readonly Mexico_City: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("America/Mexico_City", "Mexico City");
  public static readonly Monterrey: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("America/Monterrey", "Monterrey");
  public static readonly Central_America: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("America/Guatemala", "Central America");
  public static readonly Bogota: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("America/Bogota", "Bogota");
  public static readonly Lima: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("America/Lima", "Lima");
  public static readonly Quito: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("America/Lima", "Quito");
  public static readonly Caracas: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("America/Caracas", "Caracas");
  public static readonly La_Paz: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("America/La_Paz", "La Paz");
  public static readonly Santiago: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("America/Santiago", "Santiago");
  public static readonly Newfoundland: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("America/St_Johns", "Newfoundland");
  public static readonly Brasilia: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("America/Sao_Paulo", "Brasilia");
  public static readonly Buenos_Aires: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("America/Argentina/Buenos_Aires", "Buenos Aires");
  public static readonly Montevideo: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("America/Montevideo", "Montevideo");
  public static readonly Georgetown: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("America/Guyana", "Georgetown");
  public static readonly Greenland: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("America/Godthab", "Greenland");
  public static readonly Mid_Atlantic: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Atlantic/South_Georgia", "Mid-Atlantic");
  public static readonly Azores: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Atlantic/Azores", "Azores");
  public static readonly Cape_Verde_Island: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Atlantic/Cape_Verde", "Cape Verde Is.");
  public static readonly Dublin: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Dublin", "Dublin");
  public static readonly Edinburgh: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/London", "Edinburgh");
  public static readonly Lisbon: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Lisbon", "Lisbon");
  public static readonly London: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/London", "London");
  public static readonly Casablanca: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Africa/Casablanca", "Casablanca");
  public static readonly Monrovia: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Africa/Monrovia", "Monrovia");
  public static readonly UTC: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Etc/UTC", "UTC");
  public static readonly Belgrade: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Belgrade", "Belgrade");
  public static readonly Bratislava: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Bratislava", "Bratislava");
  public static readonly Budapest: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Budapest", "Budapest");
  public static readonly Ljubljana: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Ljubljana", "Ljubljana");
  public static readonly Prague: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Prague", "Prague");
  public static readonly Sarajevo: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Sarajevo", "Sarajevo");
  public static readonly Skopje: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Skopje", "Skopje");
  public static readonly Warsaw: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Warsaw", "Warsaw");
  public static readonly Zagreb: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Zagreb", "Zagreb");
  public static readonly Brussels: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Brussels", "Brussels");
  public static readonly Copenhagen: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Copenhagen", "Copenhagen");
  public static readonly Madrid: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Madrid", "Madrid");
  public static readonly Paris: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Paris", "Paris");
  public static readonly Amsterdam: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Amsterdam", "Amsterdam");
  public static readonly Berlin: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Berlin", "Berlin");
  public static readonly Bern: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Berlin", "Bern");
  public static readonly Rome: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Rome", "Rome");
  public static readonly Stockholm: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Stockholm", "Stockholm");
  public static readonly Vienna: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Vienna", "Vienna");
  public static readonly West_Central_Africa: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Africa/Algiers", "West Central Africa");
  public static readonly Bucharest: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Bucharest", "Bucharest");
  public static readonly Cairo: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Africa/Cairo", "Cairo");
  public static readonly Helsinki: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Helsinki", "Helsinki");
  public static readonly Kyiv: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Kiev", "Kyiv");
  public static readonly Riga: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Riga", "Riga");
  public static readonly Sofia: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Sofia", "Sofia"); // ;D 03.11.2020, Tuesday, 20:51 | Леша Свик - Дым (2018)
  public static readonly Tallinn: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Tallinn", "Tallinn");
  public static readonly Vilnius: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Vilnius", "Vilnius");
  public static readonly Athens: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Athens", "Athens");
  public static readonly Istanbul: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Istanbul", "Istanbul");
  public static readonly Minsk: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Minsk", "Minsk");
  public static readonly Jerusalem: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Jerusalem", "Jerusalem");
  public static readonly Harare: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Africa/Harare", "Harare");
  public static readonly Pretoria: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Africa/Johannesburg", "Pretoria");
  public static readonly Kaliningrad: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Kaliningrad", "Kaliningrad");
  public static readonly Moscow: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Moscow", "Moscow");
  public static readonly St_Petersburg: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Moscow", "St. Petersburg");
  public static readonly Volgograd: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Volgograd", "Volgograd");
  public static readonly Samara: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Europe/Samara", "Samara");
  public static readonly Kuwait: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Kuwait", "Kuwait");
  public static readonly Riyadh: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Riyadh", "Riyadh");
  public static readonly Nairobi: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Africa/Nairobi", "Nairobi");
  public static readonly Baghdad: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Baghdad", "Baghdad");
  public static readonly Tehran: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Tehran", "Tehran");
  public static readonly Abu_Dhabi: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Muscat", "Abu Dhabi");
  public static readonly Muscat: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Muscat", "Muscat");
  public static readonly Baku: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Baku", "Baku");
  public static readonly Tbilisi: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Tbilisi", "Tbilisi");
  public static readonly Yerevan: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Yerevan", "Yerevan");
  public static readonly Kabul: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Kabul", "Kabul");
  public static readonly Ekaterinburg: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Yekaterinburg", "Ekaterinburg");
  public static readonly Islamabad: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Karachi", "Islamabad");
  public static readonly Karachi: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Karachi", "Karachi");
  public static readonly Tashkent: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Tashkent", "Tashkent");
  public static readonly Chennai: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Kolkata", "Chennai");
  public static readonly Kolkata: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Kolkata", "Kolkata");
  public static readonly Mumbai: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Kolkata", "Mumbai");
  public static readonly New_Delhi: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Kolkata", "New Delhi");
  public static readonly Kathmandu: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Kathmandu", "Kathmandu");
  public static readonly Astana: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Dhaka", "Astana");
  public static readonly Dhaka: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Dhaka", "Dhaka");
  public static readonly Sri_Jayawardenepura: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Colombo", "Sri Jayawardenepura");
  public static readonly Almaty: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Almaty", "Almaty");
  public static readonly Novosibirsk: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Novosibirsk", "Novosibirsk");
  public static readonly Rangoon: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Rangoon", "Rangoon");
  public static readonly Bangkok: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Bangkok", "Bangkok");
  public static readonly Hanoi: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Bangkok", "Hanoi");
  public static readonly Jakarta: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Jakarta", "Jakarta");
  public static readonly Krasnoyarsk: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Krasnoyarsk", "Krasnoyarsk");
  public static readonly Beijing: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Shanghai", "Beijing");
  public static readonly Chongqing: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Chongqing", "Chongqing");
  public static readonly Hong_Kong: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Hong_Kong", "Hong Kong");
  public static readonly Urumqi: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Urumqi", "Urumqi");
  public static readonly Kuala_Lumpur: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Kuala_Lumpur", "Kuala Lumpur");
  public static readonly Singapore: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Singapore", "Singapore");
  public static readonly Taipei: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Taipei", "Taipei");
  public static readonly Perth: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Australia/Perth", "Perth");
  public static readonly Irkutsk: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Irkutsk", "Irkutsk");
  public static readonly Ulaanbaatar: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Ulaanbaatar", "Ulaanbaatar");
  public static readonly Seoul: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Seoul", "Seoul");
  public static readonly Osaka: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Tokyo", "Osaka");
  public static readonly Sapporo: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Tokyo", "Sapporo");
  public static readonly Tokyo: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Tokyo", "Tokyo");
  public static readonly Yakutsk: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Yakutsk", "Yakutsk");
  public static readonly Darwin: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Australia/Darwin", "Darwin");
  public static readonly Adelaide: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Australia/Adelaide", "Adelaide");
  public static readonly Canberra: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Australia/Melbourne", "Canberra");
  public static readonly Melbourne: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Australia/Melbourne", "Melbourne");
  public static readonly Sydney: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Australia/Sydney", "Sydney");
  public static readonly Brisbane: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Australia/Brisbane", "Brisbane");
  public static readonly Hobart: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Australia/Hobart", "Hobart");
  public static readonly Vladivostok: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Vladivostok", "Vladivostok");
  public static readonly Guam: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Pacific/Guam", "Guam");
  public static readonly Port_Moresby: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Pacific/Port_Moresby", "Port Moresby");
  public static readonly Magadan: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Magadan", "Magadan");
  public static readonly Srednekolymsk: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Srednekolymsk", "Srednekolymsk");
  public static readonly Solomon_Island: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Pacific/Guadalcanal", "Solomon Is.");
  public static readonly New_Caledonia: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Pacific/Noumea", "New Caledonia");
  public static readonly Fiji: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Pacific/Fiji", "Fiji");
  public static readonly Kamchatka: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Asia/Kamchatka", "Kamchatka");
  public static readonly Marshall_Island: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Pacific/Majuro", "Marshall Is.");
  public static readonly Auckland: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Pacific/Auckland", "Auckland");
  public static readonly Wellington: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Pacific/Auckland", "Wellington");
  public static readonly Nuku_alofa: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Pacific/Tongatapu", "Nuku'alofa");
  public static readonly Tokelau_Island: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Pacific/Fakaofo", "Tokelau Is.");
  public static readonly Chatham_Island: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Pacific/Chatham", "Chatham Is.");
  public static readonly Samoa: TimeZoneFromTwitterAttribute = new TimeZoneFromTwitterAttribute("Pacific/Apia", "Samoa");

  public static toTZinfo(this: TimeZoneFromTwitterAttribute): string {
    // let field = this.GetType().GetField(this.toString());
    // let descriptionAttribute = <TimeZoneFromTwitterAttribute>CustomAttributeExtensions.GetCustomAttribute(field, typeof(TimeZoneFromTwitterAttribute));

    return this != null ? this.TZinfo : this.toString(); // plz notice: abstract class Enum { public override string ToString(); }
  }
}

// GENERATED FROM
/*internal*/
export class TimeZoneFromTwitterGenerator {
  /*internal*/
  public static PrintTwitterTimeZone(): void {
    // ReSharper disable once ConvertToConstant.Local
    let rubyOnRailsDocumentation: string = "{\"International Date Line West\"=>\"Pacific/Midway\",\"Midway Island\"=>\"Pacific/Midway\",\"American Samoa\"=>\"Pacific/Pago_Pago\",\"Hawaii\"=>\"Pacific/Honolulu\",\"Alaska\"=>\"America/Juneau\",\"Pacific Time (US & Canada)\"=>\"America/Los_Angeles\",\"Tijuana\"=>\"America/Tijuana\",\"Mountain Time (US & Canada)\"=>\"America/Denver\",\"Arizona\"=>\"America/Phoenix\",\"Chihuahua\"=>\"America/Chihuahua\",\"Mazatlan\"=>\"America/Mazatlan\",\"Central Time (US & Canada)\"=>\"America/Chicago\",\"Saskatchewan\"=>\"America/Regina\",\"Guadalajara\"=>\"America/Mexico_City\",\"Mexico City\"=>\"America/Mexico_City\",\"Monterrey\"=>\"America/Monterrey\",\"Central America\"=>\"America/Guatemala\",\"Eastern Time (US & Canada)\"=>\"America/New_York\",\"Indiana (East)\"=>\"America/Indiana/Indianapolis\",\"Bogota\"=>\"America/Bogota\",\"Lima\"=>\"America/Lima\",\"Quito\"=>\"America/Lima\",\"Atlantic Time (Canada)\"=>\"America/Halifax\",\"Caracas\"=>\"America/Caracas\",\"La Paz\"=>\"America/La_Paz\",\"Santiago\"=>\"America/Santiago\",\"Newfoundland\"=>\"America/St_Johns\",\"Brasilia\"=>\"America/Sao_Paulo\",\"Buenos Aires\"=>\"America/Argentina/Buenos_Aires\",\"Montevideo\"=>\"America/Montevideo\",\"Georgetown\"=>\"America/Guyana\",\"Greenland\"=>\"America/Godthab\",\"Mid-Atlantic\"=>\"Atlantic/South_Georgia\",\"Azores\"=>\"Atlantic/Azores\",\"Cape Verde Is.\"=>\"Atlantic/Cape_Verde\",\"Dublin\"=>\"Europe/Dublin\",\"Edinburgh\"=>\"Europe/London\",\"Lisbon\"=>\"Europe/Lisbon\",\"London\"=>\"Europe/London\",\"Casablanca\"=>\"Africa/Casablanca\",\"Monrovia\"=>\"Africa/Monrovia\",\"UTC\"=>\"Etc/UTC\",\"Belgrade\"=>\"Europe/Belgrade\",\"Bratislava\"=>\"Europe/Bratislava\",\"Budapest\"=>\"Europe/Budapest\",\"Ljubljana\"=>\"Europe/Ljubljana\",\"Prague\"=>\"Europe/Prague\",\"Sarajevo\"=>\"Europe/Sarajevo\",\"Skopje\"=>\"Europe/Skopje\",\"Warsaw\"=>\"Europe/Warsaw\",\"Zagreb\"=>\"Europe/Zagreb\",\"Brussels\"=>\"Europe/Brussels\",\"Copenhagen\"=>\"Europe/Copenhagen\",\"Madrid\"=>\"Europe/Madrid\",\"Paris\"=>\"Europe/Paris\",\"Amsterdam\"=>\"Europe/Amsterdam\",\"Berlin\"=>\"Europe/Berlin\",\"Bern\"=>\"Europe/Berlin\",\"Rome\"=>\"Europe/Rome\",\"Stockholm\"=>\"Europe/Stockholm\",\"Vienna\"=>\"Europe/Vienna\",\"West Central Africa\"=>\"Africa/Algiers\",\"Bucharest\"=>\"Europe/Bucharest\",\"Cairo\"=>\"Africa/Cairo\",\"Helsinki\"=>\"Europe/Helsinki\",\"Kyiv\"=>\"Europe/Kiev\",\"Riga\"=>\"Europe/Riga\",\"Sofia\"=>\"Europe/Sofia\",\"Tallinn\"=>\"Europe/Tallinn\",\"Vilnius\"=>\"Europe/Vilnius\",\"Athens\"=>\"Europe/Athens\",\"Istanbul\"=>\"Europe/Istanbul\",\"Minsk\"=>\"Europe/Minsk\",\"Jerusalem\"=>\"Asia/Jerusalem\",\"Harare\"=>\"Africa/Harare\",\"Pretoria\"=>\"Africa/Johannesburg\",\"Kaliningrad\"=>\"Europe/Kaliningrad\",\"Moscow\"=>\"Europe/Moscow\",\"St. Petersburg\"=>\"Europe/Moscow\",\"Volgograd\"=>\"Europe/Volgograd\",\"Samara\"=>\"Europe/Samara\",\"Kuwait\"=>\"Asia/Kuwait\",\"Riyadh\"=>\"Asia/Riyadh\",\"Nairobi\"=>\"Africa/Nairobi\",\"Baghdad\"=>\"Asia/Baghdad\",\"Tehran\"=>\"Asia/Tehran\",\"Abu Dhabi\"=>\"Asia/Muscat\",\"Muscat\"=>\"Asia/Muscat\",\"Baku\"=>\"Asia/Baku\",\"Tbilisi\"=>\"Asia/Tbilisi\",\"Yerevan\"=>\"Asia/Yerevan\",\"Kabul\"=>\"Asia/Kabul\",\"Ekaterinburg\"=>\"Asia/Yekaterinburg\",\"Islamabad\"=>\"Asia/Karachi\",\"Karachi\"=>\"Asia/Karachi\",\"Tashkent\"=>\"Asia/Tashkent\",\"Chennai\"=>\"Asia/Kolkata\",\"Kolkata\"=>\"Asia/Kolkata\",\"Mumbai\"=>\"Asia/Kolkata\",\"New Delhi\"=>\"Asia/Kolkata\",\"Kathmandu\"=>\"Asia/Kathmandu\",\"Astana\"=>\"Asia/Dhaka\",\"Dhaka\"=>\"Asia/Dhaka\",\"Sri Jayawardenepura\"=>\"Asia/Colombo\",\"Almaty\"=>\"Asia/Almaty\",\"Novosibirsk\"=>\"Asia/Novosibirsk\",\"Rangoon\"=>\"Asia/Rangoon\",\"Bangkok\"=>\"Asia/Bangkok\",\"Hanoi\"=>\"Asia/Bangkok\",\"Jakarta\"=>\"Asia/Jakarta\",\"Krasnoyarsk\"=>\"Asia/Krasnoyarsk\",\"Beijing\"=>\"Asia/Shanghai\",\"Chongqing\"=>\"Asia/Chongqing\",\"Hong Kong\"=>\"Asia/Hong_Kong\",\"Urumqi\"=>\"Asia/Urumqi\",\"Kuala Lumpur\"=>\"Asia/Kuala_Lumpur\",\"Singapore\"=>\"Asia/Singapore\",\"Taipei\"=>\"Asia/Taipei\",\"Perth\"=>\"Australia/Perth\",\"Irkutsk\"=>\"Asia/Irkutsk\",\"Ulaanbaatar\"=>\"Asia/Ulaanbaatar\",\"Seoul\"=>\"Asia/Seoul\",\"Osaka\"=>\"Asia/Tokyo\",\"Sapporo\"=>\"Asia/Tokyo\",\"Tokyo\"=>\"Asia/Tokyo\",\"Yakutsk\"=>\"Asia/Yakutsk\",\"Darwin\"=>\"Australia/Darwin\",\"Adelaide\"=>\"Australia/Adelaide\",\"Canberra\"=>\"Australia/Melbourne\",\"Melbourne\"=>\"Australia/Melbourne\",\"Sydney\"=>\"Australia/Sydney\",\"Brisbane\"=>\"Australia/Brisbane\",\"Hobart\"=>\"Australia/Hobart\",\"Vladivostok\"=>\"Asia/Vladivostok\",\"Guam\"=>\"Pacific/Guam\",\"Port Moresby\"=>\"Pacific/Port_Moresby\",\"Magadan\"=>\"Asia/Magadan\",\"Srednekolymsk\"=>\"Asia/Srednekolymsk\",\"Solomon Is.\"=>\"Pacific/Guadalcanal\",\"New Caledonia\"=>\"Pacific/Noumea\",\"Fiji\"=>\"Pacific/Fiji\",\"Kamchatka\"=>\"Asia/Kamchatka\",\"Marshall Is.\"=>\"Pacific/Majuro\",\"Auckland\"=>\"Pacific/Auckland\",\"Wellington\"=>\"Pacific/Auckland\",\"Nuku'alofa\"=>\"Pacific/Tongatapu\",\"Tokelau Is.\"=>\"Pacific/Fakaofo\",\"Chatham Is.\"=>\"Pacific/Chatham\",\"Samoa\"=>\"Pacific/Apia\"}";

    let getInfoRegex = new Regex("\"(?<description>\\w(?:\\w|\\-|\\s|\\.|\\')*)\"=>\"(?<tzinfo>\\w+(?:/\\w+)+)\"");
    let results = getInfoRegex.matches(rubyOnRailsDocumentation);

    for (let timeZoneInfos of results/*.OfType<Match>()*/) {
      let initialDescription: string = timeZoneInfos.groups[`description`].value;
      let description: string = initialDescription.replace(" ", "_");
      description = description.replace("'", "_");
      description = description.replace("-", "_");
      description = description.replace("Is.", "Island");

      let tzinfo: string = timeZoneInfos.groups[`tzinfo`]; // .Value;

      let flags: string = format("[TwitterTimeZone(\"{0}\", \"{1}\")]\r\n", tzinfo, initialDescription);
      let name: string = format("{0},\r\n", description);

      // Debug.WriteLine("{0}{1}", flags, name);
    }
  }
}
