function escapeHtml(text) {
  return text.replace(/&/g, '&amp;')
             .replace(/</g, '&lt;')
             .replace(/>/g, '&gt;');
}

function openModal(data, title) {
  const modal = document.getElementById('modal');
  const overlay = document.getElementById('overlay');
  const modalContent = document.getElementById('modal-content');
  let modalText = data.join("\n");
  modalText = escapeHtml(modalText);
  modalText = modalText.replace(/【\/equipset】\s*(\d+)/g, (match, number) => {
    return `<a href="#" onclick="openEqModal(event, ${number})">【/equipset】 ${number}</a>`;
  });
  modalText = modalText.replace(/【\/lockstyleset】\s*(\d+)/g, (match, number) => {
    return `<a href="#" onclick="openEqModal(event, ${number})">【/lockstyleset】 ${number}</a>`;
  });
  modalText = modalText.replace(/【/g, '<span style="color:green;">【</span>');
  modalText = modalText.replace(/】/g, '<span style="color:red;">】</span>');
  modalContent.innerHTML = `<h2>${escapeHtml(title)}</h2><pre>${modalText}</pre>`;
  modal.style.display = 'block';
  overlay.style.display = 'block';
}

function openEqModal(event, equipsetNumber) {
  event.preventDefault();
  const modal = document.getElementById('modal');
  const overlay = document.getElementById('overlay');
  const modalContent = document.getElementById('modal-content');
  const eqItem = eqData.find(item => item.index === parseInt(equipsetNumber));
  if (eqItem) {
    let itemList = '';
    eqItem.items.forEach(entry => {
      const name = entry.item || '(空)';
      itemList += `${entry.index}: ${escapeHtml(name)}\n`;
    });
    modalContent.innerHTML = `<h2>equipset ${eqItem.index} - ${escapeHtml(eqItem.title || '')}</h2><pre>${itemList}</pre>`;
    modal.style.display = 'block';
    overlay.style.display = 'block';
  } else {
    alert(`装備セット ${equipsetNumber} は見つかりませんでした。`);
  }
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

document.getElementById('overlay').addEventListener('click', closeModal);
