var app = {};

module.exports = {

  init: function(_app) {
    app = _app;

    app.addHook('parser-find-elements', parserFindPublicApis);

    app.parsers.apipublic = {
      parse     : parsePublic,
      path      : 'local',
      method    : 'insert'
    };
  }

};

function parserFindPublicApis(elements, element, block, filename) {
  if ( element.name === 'apipublic' ) {
    elements.pop();
    element.content = 'PUBLIC';
    elements.push(element);
  } else if ( element.name === 'apiversion' ) {
    elements.pop();
    element.content = app.packageInfos.version;
    elements.push(element);
  }
  return elements;
}

function parsePublic(content) {
  return {
    public: content
  };
}
