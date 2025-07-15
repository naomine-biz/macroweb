function buildTableOfContents(container, mcData) {
  const $tocList = $('<ul>');
  mcData.forEach((section, index) => {
    const sectionTitle = section.name || `【${index + 1}】`;
    const sectionId = `section-${(section.name || index + 1).toString().replace(/\s/g, '_')}`;
    const $tocItem = $('<li>');
    const $tocLink = $('<a>').attr('href', `#${sectionId}`).text(sectionTitle);
    $tocItem.append($tocLink).appendTo($tocList);
  });
  $(container).append($tocList);
}

function buildMacroSections(container, mcData, eqData) {
  const $fragment = $(document.createDocumentFragment());
  let buttonCount = 0;

  const isMobile = window.innerWidth <= 600;
  const breakAfter = isMobile ? 5 : 10;

  mcData.forEach((section, index) => {
    const sectionTitle = section.name || `【${index + 1}】`;
    const sectionId = `section-${(section.name || index + 1).toString().replace(/\s/g, '_')}`;
    const $heading = $('<h2>').text(sectionTitle).attr('id', sectionId);
    $fragment.append($heading);

    let $buttonsContainer = createButtonContainer();
    section.palettes.forEach((palette) => {
      palette.macros.forEach((macro) => {
        const $button = createMacroButton(macro, buttonCount, eqData);
        $buttonsContainer.append($button);
        buttonCount++;

        if (buttonCount % 20 === 0) {
          $fragment.append($buttonsContainer).append('<hr>');
          $buttonsContainer = createButtonContainer();
        } else if (buttonCount % breakAfter === 0) {
          $fragment.append($buttonsContainer);
          $buttonsContainer = createButtonContainer();
        }
      });
    });

    if ($buttonsContainer.children().length > 0) {
      $fragment.append($buttonsContainer);
    }
  });
  $(container).append($fragment);
}

function createButtonContainer() {
  return $('<div>').addClass('button-container');
}

function createMacroButton(macro, buttonCount, eqData) {
  const $button = $('<button>').addClass('macro-button').text(macro.title);

  $button.addClass((Math.floor(buttonCount / 10) % 2 === 0) ? 'color-set-1' : 'color-set-2');

  const isDataEmpty = !macro.lines || macro.lines.length === 0;
  const isTitleEmpty = !macro.title.trim();

  if (isDataEmpty || isTitleEmpty) {
    $button.addClass('disabled').prop('disabled', true);
  } else {
    $button.on('click', () => openModal(macro.lines, macro.title, eqData));
  }
  return $button;
}