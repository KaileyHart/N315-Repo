var JUNGLE_SERVICE = (function () {
  var _db;

  //Creates Recipe
  var _addData = function () {
    _db
      .collection("recipes")
      .add({
        recipeName: $("#addRecipeName").val(),
        recipeDescription: $("#addRecipeDescription").val(),
        recipeTime: $("#addRecipeTime").val(),
        recipeSize:  $("#addRecipeSize").val(),
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);

        alert("New recipe added! Click 'Browse' to check it out!");
        //Reloads the page 
        location.reload();
        return false;
      })
      .catch(function (error) {
        console.log("Error adding document: ", error);
      });
  };

  //Retrieve Data to display
  var _getData = function (callback) {
    _db
      .collection("recipes")
      .get()
      .then(function (querySnapshot) {
        callback(querySnapshot);
        //querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
      });
  };

  //Update Data
  var _updateData = function (id,callback, newRecipeName) {
    _db
      .collection("recipes")
      .doc(id)
      .update({
        recipeName: newRecipeName,
        recipeDescription: $("#editRecipeDescription").val(),
        recipeTime: $("#editRecipeTime").val(),
        recipeSize: $("#editRecipeSize").val()
      })
      .then(function () {
       _getData(callback);

       alert("The recipe was updated! Go back to 'Browse' to check out the changes you made");

       //Reloads the page
       location.reload();
       return false;
      });
  };

  // //Delete Recipe
  var _deleteData = function (id) {
    _db
      .collection("recipes")
      .doc(id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");

        alert("Recipe Deleted!");

        //Reloads the page
        location.reload();
        return false;
      });
  };


  //Firebase Initialization
  var _initFirebase = function () {
    firebase
      .auth()
      .signInAnonymously()
      .then(function (result) {
        console.log("connected");
        _db = firebase.firestore();
      });
  };

  return {
    initFirebase: _initFirebase,
    addData: _addData,
    getData: _getData,
    deleteData: _deleteData,
    updateData: _updateData
  };
})();
