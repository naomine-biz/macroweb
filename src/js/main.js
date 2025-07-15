async function main() {
  try {
    const [mcResponse, eqResponse] = await Promise.all([
      fetch('./data/mc.yaml.gz'),
      fetch('./data/eq.yaml.gz')
    ]);

    const [mcBuffer, eqBuffer] = await Promise.all([
      mcResponse.arrayBuffer(),
      eqResponse.arrayBuffer()
    ]);

    const [mcText, eqText] = await Promise.all([
      pako.ungzip(new Uint8Array(mcBuffer), { to: 'string' }),
      pako.ungzip(new Uint8Array(eqBuffer), { to: 'string' })
    ]);

    const [mcData, eqData] = await Promise.all([
      jsyaml.load(mcText),
      jsyaml.load(eqText)
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
}

function initializeUI(mcData, eqData) {
  const tocContainer = document.getElementById('toc');
  const macroContainer = document.getElementById('macroContent');
  
  const tocFragment = document.createDocumentFragment();
  const macroFragment = document.createDocumentFragment();

  buildTableOfContents(tocContainer, mcData);
  buildMacroSections(macroContainer, mcData, eqData);

  document.getElementById('overlay').addEventListener('click', closeModal);
  document.getElementById('tocToggleBtn').addEventListener('click', () => {
    const toc = document.getElementById('toc');
    toc.style.display = (toc.style.display === 'none' || toc.style.display === '') ? 'block' : 'none';
  });
}

main();