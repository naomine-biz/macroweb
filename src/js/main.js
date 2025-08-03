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

    // URLパラメータから表示するセクションを取得
    const urlParams = new URLSearchParams(window.location.search);
    const sectionIndex = urlParams.get('section');
    
    if (sectionIndex) {
      // 特定のセクションを表示
      const section = mcData.find(s => s.index == sectionIndex);
      if (section) {
        initializeSectionUI(section, eqData, mcData);
      } else {
        alert('指定されたセクションが見つかりません');
        window.location.href = 'index.html';
      }
    } else {
      // インデックスページを表示
      initializeIndexUI(mcData);
    }

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

function initializeIndexUI(mcData) {
  buildIndexPage('#content', mcData);
}

function initializeSectionUI(section, eqData, mcData) {
  buildSectionPage('#content', section, eqData, mcData);
  $('#overlay').on('click', closeModal);
}
