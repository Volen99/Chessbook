export function validURL(str: string) {
  try{
    return new URL(str) && regexVerifyUrl(str);
  } catch {
    return false;
  }
}

function regexVerifyUrl(str: string) {
  const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

export function getPopupWindowCenteredFeatures(width: number, height: number) {
  const left = Math.round(window.screen.width / 2 - width / 2);
  const top = Math.round(window.screen.height / 2 - height / 2);
  return `location=no,toolbar=no,width=${width},height=${height},top=${top},left=${left},dependent=yes`;
}

export function checkBrackets(str: string) {
  let depth = 0;
  // @ts-ignore
  for (const ch of str) {
    if (ch === '(') {
      depth++;
    } else if (ch === ')') {
      depth--;
    }
  }
  return depth === 0;
}
