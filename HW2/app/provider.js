var PROVIDER = (function() {
  var _allData = {};
  var _currentPage = {};

  var _getData = function(callback) {
    $.getJSON("../data/data.json", function(data) {
      //this is when it is complete
      //console.log("success", data);
    })
      .fail(function(error) {
        //console.log("err", error.status + " " + error.statustText);
      })
      .done(function(data) {
        console.log("done", data.MainNav);
        _allData = data;
        callback();
        //populateNav(data.MainNav);
      });
  };

  var _getMainNav = function() {
    return _allData.MainNav;
  };

  var _getPageContent = function(nameOfPage) {
    if (_currentPage != nameOfPage) {
      //console.log("_getPageContent" + nameOfPage);

      var content = "";

      $.each(_allData.Pages, function(idx, page) {
        if (nameOfPage === page.pageName) {
          //console.log("gPC match" + page.pageName);
          //console.log("gPC match " + page.content);

          content = page.content;

          _currentPage = page.pageName;
          //don't keep loading stuff when you don't need to
        }
      });
      return content;
    } else {
      //console.log("same");
    }
  };

  var _getCurrentPageName = function() {
    return _currentPage;
  };

  return {
    getData: _getData,
    _getMainNav: _getMainNav,
    _getPageContent: _getPageContent,
    _getCurrentPageName: _getCurrentPageName
  };
})();
