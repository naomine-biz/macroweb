$(async function() {
  try {
    const [mcData, eqData] = await Promise.all([
      fetchAndProcessYaml('./data/mc.yaml.gz'),
      fetchAndProcessYaml('./data/eq.yaml.gz')
    ]);

    if (!eqData || eqData.length === 0) {
      alert("eq.yamlのデータが読み込まれていません！");
      return;
    }

    initializeUI(mcData, eqData);

  } catch (error) {
    console.error('データの読み込みに失敗しました:', error);
    alert('データの読み込みに失敗しました: ' + error);
  }
});

async function fetchAndProcessYaml(url) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const yamlText = pako.ungzip(new Uint8Array(buffer), { to: 'string' });
  return jsyaml.load(yamlText);
}

function initializeUI(mcData, eqData) {
  buildTableOfContents('#toc', mcData);
  buildMacroSections('#macroContent', mcData, eqData);

  $('#overlay').on('click', closeModal);
  $('#tocToggleBtn').on('click', () => $('#toc').toggle());
}