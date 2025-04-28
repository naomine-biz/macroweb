let eqData = [];
let sectionTitles = {};

// タイトル一覧読み込みとデータロード
fetch('./data/titles.json')
  .then(response => response.json())
  .then(titles => {
    sectionTitles = titles.reduce((acc, item) => {
      acc[item.section] = item.title;
      return acc;
    }, {});
    return Promise.all([
      fetch('./data/mc.json.gz').then(response => response.arrayBuffer()).then(buffer => pako.ungzip(new Uint8Array(buffer), { to: 'string' })),
      fetch('./data/eq.json.gz').then(response => response.arrayBuffer()).then(buffer => pako.ungzip(new Uint8Array(buffer), { to: 'string' }))
    ]);
  })
  .then(([mcData, eqDataJson]) => {
    eqData = JSON.parse(eqDataJson);
    if (!eqData || eqData.length === 0) {
      alert("eq.jsonのデータが読み込まれていません！");
      return;
    }
    displayButtons(JSON.parse(mcData), eqData);
  })
  .catch(error => {
    console.error('データの読み込みに失敗しました:', error);
    alert('データの読み込みに失敗しました: ' + error);
  });
