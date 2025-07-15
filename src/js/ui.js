function buildTableOfContents(container, mcData) {
  const tocList = document.createElement('ul');
  mcData.forEach((section, index) => {
    const sectionTitle = section.name || `【${index + 1}】`;
    const tocItem = document.createElement('li');
    const tocLink = document.createElement('a');
    tocLink.href = `#section-${(section.name || index + 1).toString().replace(/\s/g, '_')}`;
    tocLink.textContent = sectionTitle;
    tocItem.appendChild(tocLink);
    tocList.appendChild(tocItem);
  });
  container.appendChild(tocList);
}

function buildMacroSections(container, mcData, eqData) {
  const fragment = document.createDocumentFragment();
  let buttonCount = 0;

  const isMobile = window.innerWidth <= 600;
  const breakAfter = isMobile ? 5 : 10;

  mcData.forEach((section, index) => {
    const sectionTitle = section.name || `【${index + 1}】`;
    const heading = document.createElement('h2');
    heading.textContent = sectionTitle;
    heading.id = `section-${(section.name || index + 1).toString().replace(/\s/g, '_')}`;
    fragment.appendChild(heading);

    let buttonsContainer = createButtonContainer();
    section.palettes.forEach((palette) => {
      palette.macros.forEach((macro) => {
        const button = createMacroButton(macro, buttonCount, eqData);
        buttonsContainer.appendChild(button);
        buttonCount++;

        if (buttonCount % 20 === 0) {
          fragment.appendChild(buttonsContainer);
          fragment.appendChild(document.createElement('hr'));
          buttonsContainer = createButtonContainer();
        } else if (buttonCount % breakAfter === 0) {
          fragment.appendChild(buttonsContainer);
          buttonsContainer = createButtonContainer();
        }
      });
    });

    if (buttonsContainer.children.length > 0) {
      fragment.appendChild(buttonsContainer);
    }
  });
  container.appendChild(fragment);
}

function createButtonContainer() {
  const container = document.createElement('div');
  container.className = 'button-container';
  return container;
}

function createMacroButton(macro, buttonCount, eqData) {
  const button = document.createElement('button');
  button.classList.add('macro-button');
  const titleText = macro.title;
  button.textContent = titleText;

  if (Math.floor(buttonCount / 10) % 2 === 0) {
    button.classList.add('color-set-1');
  } else {
    button.classList.add('color-set-2');
  }

  const isDataEmpty = !macro.lines || macro.lines.length === 0;
  const isTitleEmpty = !titleText.trim();

  if (isDataEmpty || isTitleEmpty) {
    button.classList.add('disabled');
    button.disabled = true;
  } else {
    button.addEventListener('click', () => {
      openModal(macro.lines, titleText, eqData);
    });
  }
  return button;
}