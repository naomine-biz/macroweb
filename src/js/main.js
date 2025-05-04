let eqData = [];

fetch('./data/mc.yaml.gz')
  .then(response => response.arrayBuffer())
  .then(buffer => pako.ungzip(new Uint8Array(buffer), { to: 'string' }))
  .then(yamlText => {
    const mcYaml = jsyaml.load(yamlText);
    return Promise.all([
      mcYaml,
      fetch('./data/eq.yaml.gz')
        .then(response => response.arrayBuffer())
        .then(buffer => pako.ungzip(new Uint8Array(buffer), { to: 'string' }))
        .then(yamlText => jsyaml.load(yamlText))
    ]);
  })
  .then(([mcYaml, eqYaml]) => {
    eqData = eqYaml;
    if (!eqData || eqData.length === 0) {
      alert("eq.yamlのデータが読み込まれていません！");
      return;
    }

    displayButtons(mcYaml, eqData);
  })
  .catch(error => {
    console.error('データの読み込みに失敗しました:', error);
    alert('データの読み込みに失敗しました: ' + error);
  });
