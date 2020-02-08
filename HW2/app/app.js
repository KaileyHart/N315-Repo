function trace(fName, arg) {
  // console.log(fName, arg);
}

function initNav() {
  $("a").click(function(e) {
    var cp = PROVIDER._getCurrentPageName();
    trace("initNav ", cp);
    var btnID = e.currentTarget.id;
    if (cp != btnID) {
      loadContent(btnID);
    }
  });
}

function loadContent(pageName) {
  // console.log("loadContent" + pageName);

  var pageContent = PROVIDER._getPageContent(pageName);

  //console.log("loadContent " + pageContent);

  $(".content").html(pageContent);

  initNav();
}

function populateNav(navArray) {
  var nav = PROVIDER._getMainNav();

  $.each(nav, function(idx, link) {
    // The bottom way is easier  $("nav").append('<a href="' + link.path + '">' + link.linkName + "</a>");
    $("nav").append(`<a id="${link.path}" href="#"> ${link.linkName}</a>`);
  });

  loadContent("home");
}

function dataIsLoaded() {
  //console.log("loaded");
  populateNav();
}

$(document).ready(function() {
  PROVIDER.getData(dataIsLoaded);
});
