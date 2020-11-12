export class WindowsTimeZoneAttribute /*: Attribute*/ {
  constructor(windowsId: string, tzinfo: string) {
    this.windowsId = windowsId;
    this.TZinfo = tzinfo;
  }

  public windowsId: string;
  public TZinfo: string;
}

export abstract class WindowsTimeZone {
  // (UTC-12:00) International Date Line West
  public static readonly International_Date_Line_West: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Dateline Standard Time", "Pacific/Midway");

  // (UTC-11:00) Coordinated Universal Time-11
  public static readonly Coordinated_Universal_Time_11: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("UTC-11", null);

  // (UTC-10:00) Hawaii
  public static readonly Hawaii: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Hawaiian Standard Time", "Pacific/Honolulu");

  // (UTC-09:00) Alaska
  public static readonly Alaska: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Alaskan Standard Time", "America/Juneau");

  // (UTC-08:00) Baja California
  public static readonly Baja_California: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Pacific Standard Time (Mexico)", null);

  // (UTC-08:00) Pacific Time (US &amp; Canada)
  public static readonly Pacific_Time_US_Canada: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Pacific Standard Time", "America/Los_Angeles");

  // (UTC-07:00) Arizona
  public static readonly Arizona: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("US Mountain Standard Time", "America/Phoenix");

  // (UTC-07:00) Chihuahua, La Paz, Mazatlan
  public static readonly Chihuahua_La_Paz_Mazatlan: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Mountain Standard Time (Mexico)", "America/Chihuahua");

  // (UTC-07:00) Mountain Time (US &amp; Canada)
  public static readonly Mountain_Time_US_Canada: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Mountain Standard Time", null);

  // (UTC-06:00) Central America
  public static readonly Central_America: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Central America Standard Time", null);

  // (UTC-06:00) Central Time (US &amp; Canada)
  public static readonly Central_Time_US_Canada: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Central Standard Time", null);

  // (UTC-06:00) Guadalajara, Mexico City, Monterrey
  public static readonly Guadalajara_Mexico_City_Monterrey: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Central Standard Time (Mexico)", null);

  // (UTC-06:00) Saskatchewan
  public static readonly Saskatchewan: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Canada Central Standard Time", null);

  // (UTC-05:00) Bogota, Lima, Quito, Rio Branco
  public static readonly Bogota_Lima_Quito_Rio_Branco: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("SA Pacific Standard Time", null);

  // (UTC-05:00) Eastern Time (US &amp; Canada)
  public static readonly Eastern_Time_US_Canada: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Eastern Standard Time", null);

  // (UTC-05:00) Indiana (East)
  public static readonly Indiana_East: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("US Eastern Standard Time", null);

  // (UTC-04:30) Caracas
  public static readonly Caracas: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Venezuela Standard Time", null);

  // (UTC-04:00) Asuncion
  public static readonly Asuncion: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Paraguay Standard Time", null);

  // (UTC-04:00) Atlantic Time (Canada)
  public static readonly Atlantic_Time_Canada: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Atlantic Standard Time", null);

  // (UTC-04:00) Cuiaba
  public static readonly Cuiaba: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Central Brazilian Standard Time", null);

  // (UTC-04:00) Georgetown, La Paz, Manaus, San Juan
  public static readonly Georgetown_La_Paz_Manaus_San_Juan: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("SA Western Standard Time", "America/La_Paz");

  // (UTC-04:00) Santiago
  public static readonly Santiago: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Pacific SA Standard Time", null);

  // (UTC-03:30) Newfoundland
  public static readonly Newfoundland: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Newfoundland Standard Time", null);

  // (UTC-03:00) Brasilia
  public static readonly Brasilia: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("E. South America Standard Time", null);

  // (UTC-03:00) Buenos Aires
  public static readonly Buenos_Aires: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Argentina Standard Time", null);

  // (UTC-03:00) Cayenne, Fortaleza
  public static readonly Cayenne_Fortaleza: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("SA Eastern Standard Time", null);

  // (UTC-03:00) Greenland
  public static readonly Greenland: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Greenland Standard Time", null);

  // (UTC-03:00) Montevideo
  public static readonly Montevideo: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Montevideo Standard Time", null);

  // (UTC-03:00) Salvador
  public static readonly Salvador: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Bahia Standard Time", null);

  // (UTC-02:00) Coordinated Universal Time-02
  public static readonly Coordinated_Universal_Time_02: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("UTC-02", null);

  // (UTC-02:00) Mid-Atlantic - Old
  public static readonly Mid_Atlantic_Old: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Mid-Atlantic Standard Time", null);

  // (UTC-01:00) Azores
  public static readonly Azores: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Azores Standard Time", null);

  // (UTC-01:00) Cape Verde Is.
  public static readonly Cape_Verde_Is_: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Cape Verde Standard Time", null);

  // (UTC) Casablanca
  public static readonly Casablanca: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Morocco Standard Time", null);

  // (UTC) Coordinated Universal Time
  public static readonly Coordinated_Universal_Time: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("UTC", null);

  // (UTC) Dublin, Edinburgh, Lisbon, London
  public static readonly Dublin_Edinburgh_Lisbon_London: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("GMT Standard Time", null);

  // (UTC) Monrovia, Reykjavik
  public static readonly Monrovia_Reykjavik: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Greenwich Standard Time", null);

  // (UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna
  public static readonly Amsterdam_Berlin_Bern_Rome_Stockholm_Vienna: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("W. Europe Standard Time", null);

  // (UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague
  public static readonly Belgrade_Bratislava_Budapest_Ljubljana_Prague: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Central Europe Standard Time", null);

  // (UTC+01:00) Brussels, Copenhagen, Madrid, Paris
  public static readonly Brussels_Copenhagen_Madrid_Paris: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Romance Standard Time", null);

  // (UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb
  public static readonly Sarajevo_Skopje_Warsaw_Zagreb: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Central European Standard Time", null);

  // (UTC+01:00) West Central Africa
  public static readonly West_Central_Africa: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("W. Central Africa Standard Time", null);

  // (UTC+01:00) Windhoek
  public static readonly Windhoek: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Namibia Standard Time", null);

  // (UTC+02:00) Amman
  public static readonly Amman: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Jordan Standard Time", null);

  // (UTC+02:00) Athens, Bucharest
  public static readonly Athens_Bucharest: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("GTB Standard Time", null);

  // (UTC+02:00) Beirut
  public static readonly Beirut: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Middle East Standard Time", null);

  // (UTC+02:00) Cairo
  public static readonly Cairo: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Egypt Standard Time", null);

  // (UTC+02:00) Damascus
  public static readonly Damascus: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Syria Standard Time", null);

  // (UTC+02:00) E. Europe
  public static readonly E__Europe: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("E. Europe Standard Time", null);

  // (UTC+02:00) Harare, Pretoria
  public static readonly Harare_Pretoria: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("South Africa Standard Time", null);

  // (UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius
  public static readonly Helsinki_Kyiv_Riga_Sofia_Tallinn_Vilnius: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("FLE Standard Time", null);

  // (UTC+02:00) Istanbul
  public static readonly Istanbul: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Turkey Standard Time", null);

  // (UTC+02:00) Jerusalem
  public static readonly Jerusalem: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Israel Standard Time", null);

  // (UTC+02:00) Kaliningrad (RTZ 1)
  public static readonly Kaliningrad_RTZ_1: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Kaliningrad Standard Time", null);

  // (UTC+02:00) Tripoli
  public static readonly Tripoli: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Libya Standard Time", null);

  // (UTC+03:00) Baghdad
  public static readonly Baghdad: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Arabic Standard Time", null);

  // (UTC+03:00) Kuwait, Riyadh
  public static readonly Kuwait_Riyadh: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Arab Standard Time", null);

  // (UTC+03:00) Minsk
  public static readonly Minsk: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Belarus Standard Time", null);

  // (UTC+03:00) Moscow, St. Petersburg, Volgograd (RTZ 2)
  public static readonly Moscow_St__Petersburg_Volgograd_RTZ_2: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Russian Standard Time", null);

  // (UTC+03:00) Nairobi
  public static readonly Nairobi: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("E. Africa Standard Time", null);

  // (UTC+03:30) Tehran
  public static readonly Tehran: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Iran Standard Time", null);

  // (UTC+04:00) Abu Dhabi, Muscat
  public static readonly Abu_Dhabi_Muscat: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Arabian Standard Time", null);

  // (UTC+04:00) Baku
  public static readonly Baku: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Azerbaijan Standard Time", null);

  // (UTC+04:00) Izhevsk, Samara (RTZ 3)
  public static readonly Izhevsk_Samara_RTZ_3: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Russia Time Zone 3", null);

  // (UTC+04:00) Port Louis
  public static readonly Port_Louis: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Mauritius Standard Time", null);

  // (UTC+04:00) Tbilisi
  public static readonly Tbilisi: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Georgian Standard Time", null);

  // (UTC+04:00) Yerevan
  public static readonly Yerevan: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Caucasus Standard Time", null);

  // (UTC+04:30) Kabul
  public static readonly Kabul: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Afghanistan Standard Time", null);

  // (UTC+05:00) Ashgabat, Tashkent
  public static readonly Ashgabat_Tashkent: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("West Asia Standard Time", null);

  // (UTC+05:00) Ekaterinburg (RTZ 4)
  public static readonly Ekaterinburg_RTZ_4: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Ekaterinburg Standard Time", null);

  // (UTC+05:00) Islamabad, Karachi
  public static readonly Islamabad_Karachi: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Pakistan Standard Time", null);

  // (UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi
  public static readonly Chennai_Kolkata_Mumbai_New_Delhi: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("India Standard Time", null);

  // (UTC+05:30) Sri Jayawardenepura
  public static readonly Sri_Jayawardenepura: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Sri Lanka Standard Time", null);

  // (UTC+05:45) Kathmandu
  public static readonly Kathmandu: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Nepal Standard Time", null);

  // (UTC+06:00) Astana
  public static readonly Astana: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Central Asia Standard Time", null);

  // (UTC+06:00) Dhaka
  public static readonly Dhaka: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Bangladesh Standard Time", null);

  // (UTC+06:00) Novosibirsk (RTZ 5)
  public static readonly Novosibirsk_RTZ_5: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("N. Central Asia Standard Time", null);

  // (UTC+06:30) Yangon (Rangoon)
  public static readonly Yangon_Rangoon: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Myanmar Standard Time", null);

  // (UTC+07:00) Bangkok, Hanoi, Jakarta
  public static readonly Bangkok_Hanoi_Jakarta: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("SE Asia Standard Time", null);

  // (UTC+07:00) Krasnoyarsk (RTZ 6)
  public static readonly Krasnoyarsk_RTZ_6: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("North Asia Standard Time", null);

  // (UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi
  public static readonly Beijing_Chongqing_Hong_Kong_Urumqi: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("China Standard Time", null);

  // (UTC+08:00) Irkutsk (RTZ 7)
  public static readonly Irkutsk_RTZ_7: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("North Asia East Standard Time", null);

  // (UTC+08:00) Kuala Lumpur, Singapore
  public static readonly Kuala_Lumpur_Singapore: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Singapore Standard Time", null);

  // (UTC+08:00) Perth
  public static readonly Perth: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("W. Australia Standard Time", null);

  // (UTC+08:00) Taipei
  public static readonly Taipei: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Taipei Standard Time", null);

  // (UTC+08:00) Ulaanbaatar
  public static readonly Ulaanbaatar: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Ulaanbaatar Standard Time", null);

  // (UTC+09:00) Osaka, Sapporo, Tokyo
  public static readonly Osaka_Sapporo_Tokyo: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Tokyo Standard Time", null);

  // (UTC+09:00) Seoul
  public static readonly Seoul: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Korea Standard Time", null);

  // (UTC+09:00) Yakutsk (RTZ 8)
  public static readonly Yakutsk_RTZ_8: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Yakutsk Standard Time", null);

  // (UTC+09:30) Adelaide
  public static readonly Adelaide: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Cen. Australia Standard Time", null);

  // (UTC+09:30) Darwin
  public static readonly Darwin: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("AUS Central Standard Time", null);

  // (UTC+10:00) Brisbane
  public static readonly Brisbane: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("E. Australia Standard Time", null);

  // (UTC+10:00) Canberra, Melbourne, Sydney
  public static readonly Canberra_Melbourne_Sydney: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("AUS Eastern Standard Time", null);

  // (UTC+10:00) Guam, Port Moresby
  public static readonly Guam_Port_Moresby: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("West Pacific Standard Time", null);

  /// (UTC+10:00) Hobart
  public static readonly Hobart: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Tasmania Standard Time", null);

  // (UTC+10:00) Magadan
  public static readonly Magadan: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Magadan Standard Time", null);

  // (UTC+10:00) Vladivostok, Magadan (RTZ 9)
  public static readonly Vladivostok_Magadan_RTZ_9: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Vladivostok Standard Time", null);

  // (UTC+11:00) Chokurdakh (RTZ 10)
  public static readonly Chokurdakh_RTZ_10: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Russia Time Zone 10", null);

  // (UTC+11:00) Solomon Is., New Caledonia
  public static readonly Solomon_Is__New_Caledonia: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Central Pacific Standard Time", null);

  // (UTC+12:00) Anadyr, Petropavlovsk-Kamchatsky (RTZ 11)
  public static readonly Anadyr_Petropavlovsk_Kamchatsky_RTZ_11: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Russia Time Zone 11", null);

  // (UTC+12:00) Auckland, Wellington
  public static readonly Auckland_Wellington: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("New Zealand Standard Time", null);

  // (UTC+12:00) Coordinated Universal Time+12
  public static readonly Coordinated_Universal_Time_12: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("UTC+12", null);

  // (UTC+12:00) Fiji
  public static readonly Fiji: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Fiji Standard Time", null);

  // (UTC+12:00) Petropavlovsk-Kamchatsky - Old
  public static readonly Petropavlovsk_Kamchatsky_Old: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Kamchatka Standard Time", null);

  // (UTC+13:00) Nuku'alofa
  public static readonly Nuku_alofa: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Tonga Standard Time", null);

  // (UTC+13:00) Samoa
  public static readonly Samoa: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Samoa Standard Time", "Pacific/Pago_Pago");

  // (UTC+14:00) Kiritimati Island
  public static readonly Kiritimati_Island: WindowsTimeZoneAttribute = new WindowsTimeZoneAttribute("Line Islands Standard Time", null);
}

/*internal*/
export class WindowsTimeZoneGenerator {
  /*internal*/
  public PrintWindowTimeZone(): void {
    // This code needs to be executed from .NET 4.0 (non portable)

    // foreach (var t in TimeZoneInfo.GetSystemTimeZones())
    // {
    //    var name = t.DisplayName;
    //    var regex = new Regex(@"\(UTC([\+\-]\d\d:\d\d)?\) ");
    //    var result = regex.Replace(name, string.Empty);
    //    result = result.Replace("(", string.Empty);
    //    result = result.Replace(")", string.Empty);

    //    var regex2 = new Regex(@"(, | - | & | +|[ ,\+\-'\.])");
    //    result = regex2.Replace(result, "_");

    //    var summary = "/// <summary>\r\n/// {0}\r\n/// </summary>\r\n";
    //    var flags = "[TwitterTimeZoneDescription(\"{1}\", null)]\r\n";
    //    var enumName = "{2},\r\n";

    //    var enumEntry = string.Format("{0}{1}{2}", summary, flags, enumName);
    //    Debug.WriteLine(string.Format(enumEntry, t.DisplayName, t.Id, result));
    // }
  }
}
