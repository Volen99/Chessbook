import Regex, {Match} from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/RegularExpressions";

export interface IHttpUtility {
  htmlEncode(unicodeText: string): string;

  htmlEncode(unicodeText: string, encodeTagsToo: boolean): string;

  htmlDecode(unicodeText: string): string;

  htmlDecode(unicodeText: string, encodeTagsToo: boolean): string;
}

export class HttpUtility implements IHttpUtility {
  private readonly _entityResolver: Regex = new Regex("([&][#](?'decimal'[0-9]+);)|([&][#][(x|X)](?'hex'[0-9a-fA-F]+);)|([&](?'html'\\w+);)");

  // public  HtmlEncode(unicodeText: string, encodeTagsToo?: boolean): string {
  //   return HtmlEncode(unicodeText, true);
  // }

  public htmlEncode(unicodeText: string, encodeTagsToo?: boolean): string {
    let str: string = "";
    for (let ch of unicodeText) {
      let num: number = ch.charCodeAt(0);

      switch (num) {
        case 38:
          if (encodeTagsToo) {
            str += "&amp;";
          }
          break;
        case 60:
          if (encodeTagsToo) {
            str += "&lt;";
          }
          break;
        case 62:
          if (encodeTagsToo) {
            str += "&gt;";
          }
          break;
        default:
          str = ch.charCodeAt(0) < 32 || ch.charCodeAt(0) > 126 ? `${str}&#${num.toString(/*NumberFormatInfo.InvariantInfo*/)};` : `${str}${ch}`;
          break;
      }
    }

    return str;
  }


  public htmlDecode(encodedText: string, encodeTagsToo?: boolean): string {
    if (encodeTagsToo == null) {
      return this._entityResolver.replace(encodedText, this.resolveEntityAngleAmp); // new MatchEvaluator
    }

    if (encodeTagsToo) {
      return this._entityResolver.replace(encodedText, this.resolveEntityAngleAmp); // new MatchEvaluator
    }

    return this._entityResolver.replace(encodedText, this.resolveEntityNotAngleAmp); // new MatchEvaluator
  }

  // ReSharper restore RedundantDelegateCreation

  private resolveEntityNotAngleAmp(matchToProcess: Match): string {
    let str: string;
    if (matchToProcess.groups["decimal"].Success) {
      str = String.fromCharCode(Number(matchToProcess.groups["decimal"].Value)).toString();
    } else if (matchToProcess.groups["hex"].Success) {
      str = String.fromCharCode(this.hexToInt(matchToProcess.groups["hex"].Value)).toString();
    } else if (matchToProcess.groups["html"].Success) {
      let entity: string = matchToProcess.groups["html"].Value;
      switch (entity.toLocaleLowerCase()) {
        case "lt":
        case "gt":
        case "amp":
          str = "&" + entity + ";";
          break;
        default:
          str = this.entityLookup(entity);
          break;
      }
    } else {
      str = "X";
    }

    return str;
  }

  private resolveEntityAngleAmp(matchToProcess: Match): string {
    return !matchToProcess.groups["decimal"].Success ? (!matchToProcess.groups["hex"].Success ? (!matchToProcess.groups["html"].Success ? "Y" : this.entityLookup(matchToProcess.groups["html"].Value)) : String.fromCharCode(this.hexToInt(matchToProcess.groups["hex"].Value)).toString()) : String.fromCharCode(Number(matchToProcess.groups["decimal"].Value)).toString();
  }

  private hexToInt(hexstr: string): number {
    let num: number = 0;
    hexstr = hexstr.toLocaleUpperCase();
    let charArray: string[] = hexstr.split('');
    for (let index = charArray.length - 1; index >= 0; --index) {
      let charCodeCurrent: number = charArray[index].charCodeAt(0);
      if (charCodeCurrent >= 48 && charCodeCurrent <= 57) {
        num += (charCodeCurrent - 48) * Math.pow(16, (charArray.length - 1 - index)) as number;
      } else if (charCodeCurrent >= 65 && charCodeCurrent <= 70) {
        num += (charCodeCurrent - 55) * Math.pow(16, (charArray.length - 1 - index)) as number;
      } else {
        num = 0;
        break;
      }
    }
    return num;
  }

  private entityLookup(entity: string): string {
    let str: string = "";
    switch (entity) {
      case "Aacute":
        str = String.fromCharCode(193).toString();
        break;
      case "aacute":
        str = String.fromCharCode(225).toString();
        break;
      case "acirc":
        str = String.fromCharCode(226).toString();
        break;
      case "Acirc":
        str = String.fromCharCode(194).toString();
        break;
      case "acute":
        str = String.fromCharCode(180).toString();
        break;
      case "AElig":
        str = String.fromCharCode(198).toString();
        break;
      case "aelig":
        str = String.fromCharCode(230).toString();
        break;
      case "Agrave":
        str = String.fromCharCode(192).toString();
        break;
      case "agrave":
        str = String.fromCharCode(224).toString();
        break;
      case "alefsym":
        str = String.fromCharCode(8501).toString();
        break;
      case "Alpha":
        str = String.fromCharCode(913).toString();
        break;
      case "alpha":
        str = String.fromCharCode(945).toString();
        break;
      case "amp":
        str = String.fromCharCode(38).toString();
        break;
      case "and":
        str = String.fromCharCode(8743).toString();
        break;
      case "ang":
        str = String.fromCharCode(8736).toString();
        break;
      case "aring":
        str = String.fromCharCode(229).toString();
        break;
      case "Aring":
        str = String.fromCharCode(197).toString();
        break;
      case "asymp":
        str = String.fromCharCode(8776).toString();
        break;
      case "Atilde":
        str = String.fromCharCode(195).toString();
        break;
      case "atilde":
        str = String.fromCharCode(227).toString();
        break;
      case "auml":
        str = String.fromCharCode(228).toString();
        break;
      case "Auml":
        str = String.fromCharCode(196).toString();
        break;
      case "bdquo":
        str = String.fromCharCode(8222).toString();
        break;
      case "Beta":
        str = String.fromCharCode(914).toString();
        break;
      case "beta":
        str = String.fromCharCode(946).toString();
        break;
      case "brvbar":
        str = String.fromCharCode(166).toString();
        break;
      case "bull":
        str = String.fromCharCode(8226).toString();
        break;
      case "cap":
        str = String.fromCharCode(8745).toString();
        break;
      case "Ccedil":
        str = String.fromCharCode(199).toString();
        break;
      case "ccedil":
        str = String.fromCharCode(231).toString();
        break;
      case "cedil":
        str = String.fromCharCode(184).toString();
        break;
      case "cent":
        str = String.fromCharCode(162).toString();
        break;
      case "chi":
        str = String.fromCharCode(967).toString();
        break;
      case "Chi":
        str = String.fromCharCode(935).toString();
        break;
      case "circ":
        str = String.fromCharCode(710).toString();
        break;
      case "clubs":
        str = String.fromCharCode(9827).toString();
        break;
      case "cong":
        str = String.fromCharCode(8773).toString();
        break;
      case "copy":
        str = String.fromCharCode(169).toString();
        break;
      case "crarr":
        str = String.fromCharCode(8629).toString();
        break;
      case "cup":
        str = String.fromCharCode(8746).toString();
        break;
      case "curren":
        str = String.fromCharCode(164).toString();
        break;
      case "dagger":
        str = String.fromCharCode(8224).toString();
        break;
      case "Dagger":
        str = String.fromCharCode(8225).toString();
        break;
      case "darr":
        str = String.fromCharCode(8595).toString();
        break;
      case "dArr":
        str = String.fromCharCode(8659).toString();
        break;
      case "deg":
        str = String.fromCharCode(176).toString();
        break;
      case "Delta":
        str = String.fromCharCode(916).toString();
        break;
      case "delta":
        str = String.fromCharCode(948).toString();
        break;
      case "diams":
        str = String.fromCharCode(9830).toString();
        break;
      case "divide":
        str = String.fromCharCode(247).toString();
        break;
      case "eacute":
        str = String.fromCharCode(233).toString();
        break;
      case "Eacute":
        str = String.fromCharCode(201).toString();
        break;
      case "Ecirc":
        str = String.fromCharCode(202).toString();
        break;
      case "ecirc":
        str = String.fromCharCode(234).toString();
        break;
      case "Egrave":
        str = String.fromCharCode(200).toString();
        break;
      case "egrave":
        str = String.fromCharCode(232).toString();
        break;
      case "empty":
        str = String.fromCharCode(8709).toString();
        break;
      case "emsp":
        str = String.fromCharCode(8195).toString();
        break;
      case "ensp":
        str = String.fromCharCode(8194).toString();
        break;
      case "epsilon":
        str = String.fromCharCode(949).toString();
        break;
      case "Epsilon":
        str = String.fromCharCode(917).toString();
        break;
      case "equiv":
        str = String.fromCharCode(8801).toString();
        break;
      case "Eta":
        str = String.fromCharCode(919).toString();
        break;
      case "eta":
        str = String.fromCharCode(951).toString();
        break;
      case "eth":
        str = String.fromCharCode(240).toString();
        break;
      case "ETH":
        str = String.fromCharCode(208).toString();
        break;
      case "Euml":
        str = String.fromCharCode(203).toString();
        break;
      case "euml":
        str = String.fromCharCode(235).toString();
        break;
      case "euro":
        str = String.fromCharCode(8364).toString();
        break;
      case "exist":
        str = String.fromCharCode(8707).toString();
        break;
      case "fnof":
        str = String.fromCharCode(402).toString();
        break;
      case "forall":
        str = String.fromCharCode(8704).toString();
        break;
      case "frac12":
        str = String.fromCharCode(189).toString();
        break;
      case "frac14":
        str = String.fromCharCode(188).toString();
        break;
      case "frac34":
        str = String.fromCharCode(190).toString();
        break;
      case "frasl":
        str = String.fromCharCode(8260).toString();
        break;
      case "gamma":
        str = String.fromCharCode(947).toString();
        break;
      case "Gamma":
        str = String.fromCharCode(915).toString();
        break;
      case "ge":
        str = String.fromCharCode(8805).toString();
        break;
      case "gt":
        str = String.fromCharCode(62).toString();
        break;
      case "hArr":
        str = String.fromCharCode(8660).toString();
        break;
      case "harr":
        str = String.fromCharCode(8596).toString();
        break;
      case "hearts":
        str = String.fromCharCode(9829).toString();
        break;
      case "hellip":
        str = String.fromCharCode(8230).toString();
        break;
      case "Iacute":
        str = String.fromCharCode(205).toString();
        break;
      case "iacute":
        str = String.fromCharCode(237).toString();
        break;
      case "icirc":
        str = String.fromCharCode(238).toString();
        break;
      case "Icirc":
        str = String.fromCharCode(206).toString();
        break;
      case "iexcl":
        str = String.fromCharCode(161).toString();
        break;
      case "Igrave":
        str = String.fromCharCode(204).toString();
        break;
      case "igrave":
        str = String.fromCharCode(236).toString();
        break;
      case "image":
        str = String.fromCharCode(8465).toString();
        break;
      case "infin":
        str = String.fromCharCode(8734).toString();
        break;
      case "int":
        str = String.fromCharCode(8747).toString();
        break;
      case "Iota":
        str = String.fromCharCode(921).toString();
        break;
      case "iota":
        str = String.fromCharCode(953).toString();
        break;
      case "iquest":
        str = String.fromCharCode(191).toString();
        break;
      case "isin":
        str = String.fromCharCode(8712).toString();
        break;
      case "iuml":
        str = String.fromCharCode(239).toString();
        break;
      case "Iuml":
        str = String.fromCharCode(207).toString();
        break;
      case "kappa":
        str = String.fromCharCode(954).toString();
        break;
      case "Kappa":
        str = String.fromCharCode(922).toString();
        break;
      case "Lambda":
        str = String.fromCharCode(923).toString();
        break;
      case "lambda":
        str = String.fromCharCode(955).toString();
        break;
      case "lang":
        str = String.fromCharCode(9001).toString();
        break;
      case "laquo":
        str = String.fromCharCode(171).toString();
        break;
      case "larr":
        str = String.fromCharCode(8592).toString();
        break;
      case "lArr":
        str = String.fromCharCode(8656).toString();
        break;
      case "lceil":
        str = String.fromCharCode(8968).toString();
        break;
      case "ldquo":
        str = String.fromCharCode(8220).toString();
        break;
      case "le":
        str = String.fromCharCode(8804).toString();
        break;
      case "lfloor":
        str = String.fromCharCode(8970).toString();
        break;
      case "lowast":
        str = String.fromCharCode(8727).toString();
        break;
      case "loz":
        str = String.fromCharCode(9674).toString();
        break;
      case "lrm":
        str = String.fromCharCode(8206).toString();
        break;
      case "lsaquo":
        str = String.fromCharCode(8249).toString();
        break;
      case "lsquo":
        str = String.fromCharCode(8216).toString();
        break;
      case "lt":
        str = String.fromCharCode(60).toString();
        break;
      case "macr":
        str = String.fromCharCode(175).toString();
        break;
      case "mdash":
        str = String.fromCharCode(8212).toString();
        break;
      case "micro":
        str = String.fromCharCode(181).toString();
        break;
      case "middot":
        str = String.fromCharCode(183).toString();
        break;
      case "minus":
        str = String.fromCharCode(8722).toString();
        break;
      case "Mu":
        str = String.fromCharCode(924).toString();
        break;
      case "mu":
        str = String.fromCharCode(956).toString();
        break;
      case "nabla":
        str = String.fromCharCode(8711).toString();
        break;
      case "nbsp":
        str = String.fromCharCode(160).toString();
        break;
      case "ndash":
        str = String.fromCharCode(8211).toString();
        break;
      case "ne":
        str = String.fromCharCode(8800).toString();
        break;
      case "ni":
        str = String.fromCharCode(8715).toString();
        break;
      case "not":
        str = String.fromCharCode(172).toString();
        break;
      case "notin":
        str = String.fromCharCode(8713).toString();
        break;
      case "nsub":
        str = String.fromCharCode(8836).toString();
        break;
      case "ntilde":
        str = String.fromCharCode(241).toString();
        break;
      case "Ntilde":
        str = String.fromCharCode(209).toString();
        break;
      case "Nu":
        str = String.fromCharCode(925).toString();
        break;
      case "nu":
        str = String.fromCharCode(957).toString();
        break;
      case "oacute":
        str = String.fromCharCode(243).toString();
        break;
      case "Oacute":
        str = String.fromCharCode(211).toString();
        break;
      case "Ocirc":
        str = String.fromCharCode(212).toString();
        break;
      case "ocirc":
        str = String.fromCharCode(244).toString();
        break;
      case "OElig":
        str = String.fromCharCode(338).toString();
        break;
      case "oelig":
        str = String.fromCharCode(339).toString();
        break;
      case "ograve":
        str = String.fromCharCode(242).toString();
        break;
      case "Ograve":
        str = String.fromCharCode(210).toString();
        break;
      case "oline":
        str = String.fromCharCode(8254).toString();
        break;
      case "Omega":
        str = String.fromCharCode(937).toString();
        break;
      case "omega":
        str = String.fromCharCode(969).toString();
        break;
      case "Omicron":
        str = String.fromCharCode(927).toString();
        break;
      case "omicron":
        str = String.fromCharCode(959).toString();
        break;
      case "oplus":
        str = String.fromCharCode(8853).toString();
        break;
      case "or":
        str = String.fromCharCode(8744).toString();
        break;
      case "ordf":
        str = String.fromCharCode(170).toString();
        break;
      case "ordm":
        str = String.fromCharCode(186).toString();
        break;
      case "Oslash":
        str = String.fromCharCode(216).toString();
        break;
      case "oslash":
        str = String.fromCharCode(248).toString();
        break;
      case "otilde":
        str = String.fromCharCode(245).toString();
        break;
      case "Otilde":
        str = String.fromCharCode(213).toString();
        break;
      case "otimes":
        str = String.fromCharCode(8855).toString();
        break;
      case "Ouml":
        str = String.fromCharCode(214).toString();
        break;
      case "ouml":
        str = String.fromCharCode(246).toString();
        break;
      case "para":
        str = String.fromCharCode(182).toString();
        break;
      case "part":
        str = String.fromCharCode(8706).toString();
        break;
      case "permil":
        str = String.fromCharCode(8240).toString();
        break;
      case "perp":
        str = String.fromCharCode(8869).toString();
        break;
      case "Phi":
        str = String.fromCharCode(934).toString();
        break;
      case "phi":
        str = String.fromCharCode(966).toString();
        break;
      case "Pi":
        str = String.fromCharCode(928).toString();
        break;
      case "pi":
        str = String.fromCharCode(960).toString();
        break;
      case "piv":
        str = String.fromCharCode(982).toString();
        break;
      case "plusmn":
        str = String.fromCharCode(177).toString();
        break;
      case "pound":
        str = String.fromCharCode(163).toString();
        break;
      case "Prime":
        str = String.fromCharCode(8243).toString();
        break;
      case "prime":
        str = String.fromCharCode(8242).toString();
        break;
      case "prod":
        str = String.fromCharCode(8719).toString();
        break;
      case "prop":
        str = String.fromCharCode(8733).toString();
        break;
      case "psi":
        str = String.fromCharCode(968).toString();
        break;
      case "Psi":
        str = String.fromCharCode(936).toString();
        break;
      case "quot":
        str = String.fromCharCode(34).toString();
        break;
      case "radic":
        str = String.fromCharCode(8730).toString();
        break;
      case "rang":
        str = String.fromCharCode(9002).toString();
        break;
      case "raquo":
        str = String.fromCharCode(187).toString();
        break;
      case "rarr":
        str = String.fromCharCode(8594).toString();
        break;
      case "rArr":
        str = String.fromCharCode(8658).toString();
        break;
      case "rceil":
        str = String.fromCharCode(8969).toString();
        break;
      case "rdquo":
        str = String.fromCharCode(8221).toString();
        break;
      case "real":
        str = String.fromCharCode(8476).toString();
        break;
      case "reg":
        str = String.fromCharCode(174).toString();
        break;
      case "rfloor":
        str = String.fromCharCode(8971).toString();
        break;
      case "rho":
        str = String.fromCharCode(961).toString();
        break;
      case "Rho":
        str = String.fromCharCode(929).toString();
        break;
      case "rlm":
        str = String.fromCharCode(8207).toString();
        break;
      case "rsaquo":
        str = String.fromCharCode(8250).toString();
        break;
      case "rsquo":
        str = String.fromCharCode(8217).toString();
        break;
      case "sbquo":
        str = String.fromCharCode(8218).toString();
        break;
      case "Scaron":
        str = String.fromCharCode(352).toString();
        break;
      case "scaron":
        str = String.fromCharCode(353).toString();
        break;
      case "sdot":
        str = String.fromCharCode(8901).toString();
        break;
      case "sect":
        str = String.fromCharCode(167).toString();
        break;
      case "shy":
        str = String.fromCharCode(173).toString();
        break;
      case "sigma":
        str = String.fromCharCode(963).toString();
        break;
      case "Sigma":
        str = String.fromCharCode(931).toString();
        break;
      case "sigmaf":
        str = String.fromCharCode(962).toString();
        break;
      case "sim":
        str = String.fromCharCode(8764).toString();
        break;
      case "spades":
        str = String.fromCharCode(9824).toString();
        break;
      case "sub":
        str = String.fromCharCode(8834).toString();
        break;
      case "sube":
        str = String.fromCharCode(8838).toString();
        break;
      case "sum":
        str = String.fromCharCode(8721).toString();
        break;
      case "sup":
        str = String.fromCharCode(8835).toString();
        break;
      case "sup1":
        str = String.fromCharCode(185).toString();
        break;
      case "sup2":
        str = String.fromCharCode(178).toString();
        break;
      case "sup3":
        str = String.fromCharCode(179).toString();
        break;
      case "supe":
        str = String.fromCharCode(8839).toString();
        break;
      case "szlig":
        str = String.fromCharCode(223).toString();
        break;
      case "Tau":
        str = String.fromCharCode(932).toString();
        break;
      case "tau":
        str = String.fromCharCode(964).toString();
        break;
      case "there4":
        str = String.fromCharCode(8756).toString();
        break;
      case "theta":
        str = String.fromCharCode(952).toString();
        break;
      case "Theta":
        str = String.fromCharCode(920).toString();
        break;
      case "thetasym":
        str = String.fromCharCode(977).toString();
        break;
      case "thinsp":
        str = String.fromCharCode(8201).toString();
        break;
      case "thorn":
        str = String.fromCharCode(254).toString();
        break;
      case "THORN":
        str = String.fromCharCode(222).toString();
        break;
      case "tilde":
        str = String.fromCharCode(732).toString();
        break;
      case "times":
        str = String.fromCharCode(215).toString();
        break;
      case "trade":
        str = String.fromCharCode(8482).toString();
        break;
      case "Uacute":
        str = String.fromCharCode(218).toString();
        break;
      case "uacute":
        str = String.fromCharCode(250).toString();
        break;
      case "uarr":
        str = String.fromCharCode(8593).toString();
        break;
      case "uArr":
        str = String.fromCharCode(8657).toString();
        break;
      case "Ucirc":
        str = String.fromCharCode(219).toString();
        break;
      case "ucirc":
        str = String.fromCharCode(251).toString();
        break;
      case "Ugrave":
        str = String.fromCharCode(217).toString();
        break;
      case "ugrave":
        str = String.fromCharCode(249).toString();
        break;
      case "uml":
        str = String.fromCharCode(168).toString();
        break;
      case "upsih":
        str = String.fromCharCode(978).toString();
        break;
      case "Upsilon":
        str = String.fromCharCode(933).toString();
        break;
      case "upsilon":
        str = String.fromCharCode(965).toString();
        break;
      case "Uuml":
        str = String.fromCharCode(220).toString();
        break;
      case "uuml":
        str = String.fromCharCode(252).toString();
        break;
      case "weierp":
        str = String.fromCharCode(8472).toString();
        break;
      case "Xi":
        str = String.fromCharCode(926).toString();
        break;
      case "xi":
        str = String.fromCharCode(958).toString();
        break;
      case "yacute":
        str = String.fromCharCode(253).toString();
        break;
      case "Yacute":
        str = String.fromCharCode(221).toString();
        break;
      case "yen":
        str = String.fromCharCode(165).toString();
        break;
      case "Yuml":
        str = String.fromCharCode(376).toString();
        break;
      case "yuml":
        str = String.fromCharCode(255).toString();
        break;
      case "zeta":
        str = String.fromCharCode(950).toString();
        break;
      case "Zeta":
        str = String.fromCharCode(918).toString();
        break;
      case "zwj":
        str = String.fromCharCode(8205).toString();
        break;
      case "zwnj":
        str = String.fromCharCode(8204).toString();
        break;
    }

    return str;
  }
}

// CopyRight : Extracted from PCLWebUtility
