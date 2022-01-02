export function getSanitizeOptions() {
  return {
    allowedTags: ['a', 'p', 'span', 'br', 'strong', 'em', 'ul', 'ol', 'li'],
    allowedSchemes: ['http', 'https'],
    allowedAttributes: {
      'a': ['href', 'class', 'target', 'rel', 'title'],
      'span': ['class'],                                 // by mi 12/22/2021, 17:35 | Ollie - Maybe This Was Supposed To Happen (Full Album Stream)
      '*': ['data-*']
    },
    transformTags: {
      a: (tagName: string, attribs: any) => {
        let rel = 'noopener noreferrer';
        if (attribs.rel === 'me') rel += ' me';

        return {
          tagName,
          attribs: Object.assign(attribs, {
            target: '_blank',
            rel
          })
        };
      }
    }
  };
}

export function getCustomMarkupSanitizeOptions(additionalAllowedTags: string[] = []) {
  const base = getSanitizeOptions();

  return {
    allowedTags: [
      ...base.allowedTags,
      ...additionalAllowedTags,
      'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img'
    ],
    allowedSchemes: base.allowedSchemes,
    allowedAttributes: {
      ...base.allowedAttributes,
      'img': [ 'src', 'alt' ],
      '*': ['data-*', 'style']
    }
  };
}

// Thanks: https://stackoverflow.com/a/12034334 ♥
export function escapeHTML (stringParam: string) {
  if (!stringParam) {
    return '';
  }

  const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  return String(stringParam).replace(/[&<>"'`=/]/g, s => entityMap[s]);
}
