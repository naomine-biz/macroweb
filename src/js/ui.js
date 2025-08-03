function buildIndexPage(container, mcData) {
  const $fragment = $(document.createDocumentFragment());
  
  // タイトル
  const $title = $('<h1>').text('FFXI Macro & Equipment Set Viewer');
  $fragment.append($title);
  
  // 説明
  const $description = $('<ul>');
  $description.append($('<li>').text('Final Fantasy XI のマクロと装備セットを表示するWebアプリケーションです。'));
  $description.append($('<li>').text('マクロ内容と関連する装備セットを統合して表示します。'));
  $description.append($('<li>').text('オーグメント情報は元データに含まれていないため表示されません。'));
  $description.append($('<li>').text('モバイル表示時は一部レイアウトが調整されます。'));
  $fragment.append($description);
  
  // セクション一覧
  const $sectionList = $('<div>').addClass('section-list');
  mcData.forEach((section) => {
    const sectionTitle = section.name || `【${section.index}】`;
    const $sectionLink = $('<a>')
      .attr('href', `?section=${section.index}`)
      .addClass('section-link')
      .text(sectionTitle);
    $sectionList.append($sectionLink);
  });
  $fragment.append($sectionList);
  
  $(container).html($fragment);
}

function buildSectionPage(container, section, eqData, mcData) {
  const $fragment = $(document.createDocumentFragment());
  
  // ナビゲーション
  const $nav = $('<div>').addClass('navigation');
  const $backLink = $('<a>').attr('href', 'index.html').text('← 一覧に戻る');
  $nav.append($backLink);
  
  // 前後のセクションへのリンク
  const currentIndex = section.index;
  const prevSection = mcData.find(s => s.index === currentIndex - 1);
  const nextSection = mcData.find(s => s.index === currentIndex + 1);
  
  if (prevSection) {
    const $prevLink = $('<a>')
      .attr('href', `?section=${prevSection.index}`)
      .text(`← ${prevSection.name || `【${prevSection.index}】`}`);
    $nav.append(' | ').append($prevLink);
  }
  
  if (nextSection) {
    const $nextLink = $('<a>')
      .attr('href', `?section=${nextSection.index}`)
      .text(`${nextSection.name || `【${nextSection.index}】`} →`);
    $nav.append(' | ').append($nextLink);
  }
  
  $fragment.append($nav);
  
  // セクションタイトル
  const sectionTitle = section.name || `【${section.index}】`;
  const $heading = $('<h1>').text(sectionTitle);
  $fragment.append($heading);
  
  // マクロ表示
  buildMacroDisplay($fragment, section, eqData);
  
  $(container).html($fragment);
}

function buildMacroDisplay($container, section, eqData) {
  section.palettes.forEach((palette) => {
    palette.macros.forEach((macro) => {
      if (!macro.title.trim() || !macro.lines || macro.lines.length === 0) {
        return; // 空のマクロはスキップ
      }
      
      const $macroCard = $('<div>').addClass('macro-card');
      
      // マクロタイトル
      const $title = $('<h3>').addClass('macro-title').text(macro.title);
      $macroCard.append($title);
      
      // マクロ内容
      const $content = $('<div>').addClass('macro-content');
      macro.lines.forEach((line, index) => {
        if (line.trim()) {
          const $line = $('<div>').addClass('macro-line');
          
          // HTMLエスケープ
          let escapedLine = escapeHtml(line);
          
          // 【】の色付け
          escapedLine = escapedLine.replace(/【/g, '<span style="color:green;">【</span>');
          escapedLine = escapedLine.replace(/】/g, '<span style="color:red;">】</span>');
          
          $line.html(`${index + 1}: ${escapedLine}`);
          $content.append($line);
        }
      });
      $macroCard.append($content);
      
      // 装備セット情報を追加
      const equipsetInfo = extractEquipsetInfo(macro.lines, eqData);
      if (equipsetInfo.length > 0) {
        const $equipsetSection = $('<div>').addClass('equipset-section');
        const $equipsetTitle = $('<h4>').text('参照装備セット:');
        $equipsetSection.append($equipsetTitle);
        
        equipsetInfo.forEach(info => {
          const $equipsetCard = $('<div>').addClass('equipset-card');
          const $equipsetHeader = $('<div>').addClass('equipset-header')
            .text(`装備セット ${info.index}: ${info.title || '(無題)'}`);
          $equipsetCard.append($equipsetHeader);
          
          const $equipsetGrid = $('<div>').addClass('equipset-grid');
          
          // 4x4グリッドの配置順序
          const gridOrder = [
            1, 2, 3, 4,    // メイン、サブ、遠隔、矢弾
            5, 10, 12, 13, // 頭、首、左耳、右耳
            6, 7, 14, 15,  // 胴、両手、左指、右指
            16, 11, 8, 9   // 背、腰、脚、足
          ];
          
          gridOrder.forEach(slotIndex => {
            const item = info.items.find(i => i.index === slotIndex);
            const $slot = $('<div>').addClass('equipset-slot');
            
            const slotName = getSlotName(slotIndex);
            const itemName = (item && item.item && item.item !== '0' && item.item.trim()) 
              ? item.item 
              : '(空)';
            
            $slot.html(`<div class="slot-name">${slotName}</div><div class="item-name">${itemName}</div>`);
            
            if (itemName === '(空)') {
              $slot.addClass('empty-slot');
            }
            
            $equipsetGrid.append($slot);
          });
          
          $equipsetCard.append($equipsetGrid);
          $equipsetSection.append($equipsetCard);
        });
        
        $macroCard.append($equipsetSection);
      }
      
      $container.append($macroCard);
    });
  });
}

function extractEquipsetInfo(lines, eqData) {
  const equipsetNumbers = [];
  const equipsetRegex = /\/equipset\s+(\d+)|\/lockstyleset\s+(\d+)/g;
  
  lines.forEach(line => {
    let match;
    while ((match = equipsetRegex.exec(line)) !== null) {
      const number = parseInt(match[1] || match[2]);
      if (!equipsetNumbers.includes(number)) {
        equipsetNumbers.push(number);
      }
    }
  });
  
  return equipsetNumbers.map(num => {
    return eqData.find(eq => eq.index === num);
  }).filter(eq => eq !== undefined);
}

function getSlotName(index) {
  const slotNames = {
    1: 'メイン', 2: 'サブ', 3: '遠隔', 4: '矢弾',
    5: '頭', 6: '胴', 7: '両手', 8: '脚',
    9: '足', 10: '首', 11: '腰', 12: '左耳',
    13: '右耳', 14: '左指', 15: '右指', 16: '背'
  };
  return slotNames[index] || `スロット${index}`;
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
  };
  return text.replace(/[&<>]/g, (m) => map[m]);
}
