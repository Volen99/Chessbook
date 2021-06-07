// // The output of this module is designed to mimic emoji-mart's
// // "data" object, such that we can use it for a light version of emoji-mart's
// // emojiIndex.search functionality.
// import {unicodeToUnifiedName} from "./unicode_to_unified_name";
// //const [ shortCodesToEmojiData, skins, categories, short_names] = import ( "./emoji_compressed");
//
// import * as q from "./emoji_compressed";
//
// //const { shortCodesToEmojiData, skins, categories, short_names } = require('./emoji_compressed');
//
// const emojis = {};
//
// // decompress
// Object.keys(q.default.shortCodesToEmojiData).forEach((shortCode) => {
//   let [
//     filenameData, // eslint-disable-line no-unused-vars
//     searchData,
//   ] = q.default.shortCodesToEmojiData[shortCode];
//   let [
//     native,
//     short_names,
//     search,
//     unified,
//   ] = searchData;
//
//   if (!unified) {
//     // unified name can be derived from unicodeToUnifiedName
//     unified = unicodeToUnifiedName(native);
//   }
//
//   short_names = [shortCode].concat(short_names);
//   emojis[shortCode] = {
//     native,
//     search,
//     short_names,
//     unified,
//   };
// });
//
// // module.exports = {
// //   emojis,
// //   skins,
// //   categories,
// //   short_names,
// // };
//
// export default  {
//   emojis,
//   skins: q.default.skins,
//   categories: q.default.categories,
//   // @ts-ignore
//   short_names: q.default.short_names,
// }