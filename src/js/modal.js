function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
  };
  return text.replace(/[&<>]/g, (m) => map[m]);
}

function openModal(data, title, eqData) {
  let modalText = escapeHtml(data.join("\n"));

  modalText = modalText.replace(/【\/equipset】\s*(\d+)/g, (match, number) => {
    return `<a href="#" class="equipset-link" data-equipset-number="${number}">【/equipset】 ${number}</a>`;
  });
  modalText = modalText.replace(/【\/lockstyleset】\s*(\d+)/g, (match, number) => {
    return `<a href="#" class="equipset-link" data-equipset-number="${number}">【/lockstyleset】 ${number}</a>`;
  });

  modalText = modalText.replace(/【/g, '<span style="color:green;">【</span>');
  modalText = modalText.replace(/】/g, '<span style="color:red;">】</span>');

  const $modalContent = $('#modal-content');
  $modalContent.html(`<h2>${escapeHtml(title)}</h2><pre>${modalText}</pre>`);

  $modalContent.find('.equipset-link').on('click', (event) => {
    const equipsetNumber = $(event.currentTarget).data('equipset-number');
    openEqModal(event, equipsetNumber, eqData);
  });

  $('#modal, #overlay').show();
}

function openEqModal(event, equipsetNumber, eqData) {
  event.preventDefault();
  const eqItem = eqData.find(item => item.index === parseInt(equipsetNumber));
  if (eqItem) {
    const itemList = eqItem.items.map(entry => `${entry.index}: ${escapeHtml(entry.item || '(空)')}`).join('\n');
    $('#modal-content').html(`<h2>equipset ${eqItem.index} - ${escapeHtml(eqItem.title || '')}</h2><pre>${itemList}</pre>`);
    $('#modal, #overlay').show();
  } else {
    alert(`装備セット ${equipsetNumber} は見つかりませんでした。`);
  }
}

function closeModal() {
  $('#modal, #overlay').hide();
}