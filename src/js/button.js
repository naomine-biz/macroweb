function displayButtons(mcData, eqData) {
  const container = document.getElementById('macroContent');
  const toc = document.getElementById('toc');
  container.innerHTML = '';
  toc.innerHTML = '';
  let buttonCount = 0;
  let sectionCount = 1;
  let buttonsContainer = createButtonContainer();
  const tocList = document.createElement('ul');
  toc.appendChild(tocList);

  const isMobile = window.innerWidth <= 600;
  const breakAfter = isMobile ? 5 : 10;

  addSectionHeading(container, tocList, sectionCount);
  sectionCount++;

  mcData.forEach((item) => {
    if (buttonCount > 0 && buttonCount % 200 === 0) {
      container.appendChild(buttonsContainer);
      container.appendChild(document.createElement('hr'));
      addSectionHeading(container, tocList, sectionCount);
      buttonsContainer = createButtonContainer();
      sectionCount++;
    }

    const button = document.createElement('button');
    button.classList.add('macro-button');
    const titleText = item.title.join(", ");
    button.textContent = titleText;

    if (Math.floor(buttonCount / 10) % 2 === 0) {
      button.classList.add('green');
    } else {
      button.classList.add('blue');
    }

    const isDataEmpty = !item.data || item.data.length === 0;
    const isTitleEmpty = !titleText.trim();

    if (isDataEmpty || isTitleEmpty) {
      button.classList.add('disabled');
      button.disabled = true;
    } else {
      button.addEventListener('click', () => {
        openModal(item.data, titleText);
      });
    }

    buttonsContainer.appendChild(button);
    buttonCount++;

    if (buttonCount % 20 === 0) {
      container.appendChild(buttonsContainer);
      container.appendChild(document.createElement('hr'));
      buttonsContainer = createButtonContainer();
    } else if (buttonCount % breakAfter === 0) {
      container.appendChild(buttonsContainer);
      buttonsContainer = createButtonContainer();
    }
  });

  if (buttonsContainer.children.length > 0) {
    container.appendChild(buttonsContainer);
  }
}

function createButtonContainer() {
  const container = document.createElement('div');
  container.className = 'button-container';
  return container;
}
