var Fontmin = require('fontmin');

var fontmin = new Fontmin()
  .src('../page/home/font/*.ttf')
  .dest('build/fonts')
  .use(
    Fontmin.glyph({
      text: '新年新气象恭祝邵珊公主所期皆所念所念皆所愿所愿皆所得所行化坦途所爱之人皆相随相伴平安喜乐顺遂无忧学有所成优秀毕业胃口好吃饭香不失眠有活力第天很荣幸在这个宇宙中与您结识1234567890',
      hinting: false, // keep ttf hint info (fpgm, prep, cvt). default = true
    })
  );

fontmin.run(function (err, files) {
  if (err) {
    throw err;
  }

  console.log(files[0]);
  // => { contents: <Buffer 00 01 00 ...> }
});
