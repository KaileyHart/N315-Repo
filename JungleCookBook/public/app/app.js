function deleteRecipe() {
  $(".deleteRecipe").click(function (e) {
    var id = e.currentTarget.id;

    JUNGLE_SERVICE.deleteData(id);
  });
}

function editRecipe() {
  $(".editRecipe").click(function (e) {
    var id = e.currentTarget.id;

    //document.getElementById("editRecipeName").value = rawData.recipeName;

    location.href = "edit.html#" + id;

    console.log(id);
    //JUNGLE_SERVICE.updateData(id);
  });
}

function completeEditRecipe() {
  //Edit Recipe
  $(".completeEditRecipe").click(function (e) {
    e.preventDefault();
    console.log("EDITED")
    var id = e.currentTarget.id;

    newRecipeName = $('#editRecipeName').val();

    JUNGLE_SERVICE.updateData(id, displayData, newRecipeName);
  });
}

function displayData(addData) {
  var container = ` `;
  addData.forEach(function (doc) {
    var id = doc.id;
    var rawData = doc.data();

    container += `<div id="recipe" class="recipe--01"><div class="recipe--img"><div class="recipe--buttons"><span><a id="${id}" onclick="editRecipe()" class="editRecipe" >Edit Recipe</a></span><br /><span><a class="deleteRecipe" onclick="deleteRecipe()" id="${id}">Delete Recipe</a></span></div></div><div class="recipe--text"><h3 id="${id}">${rawData.recipeName}</h3><div class="recipe__underline"></div><div class="recipe__description"><p id="${id}">${rawData.recipeDescription}</p></div><div class="recipe__info"><div class="info__top"><div class="info--icon"><img src="images/time.svg" alt="time icon" width="23px" height="24px"></div><div class="info--text"><p  id="${id}">${rawData.recipeTime}</p></div></div><div class="info__bottom"><div class="info--icon"><img src="images/servings.svg" alt="serving icon"width="23px" height="24px"></div><div class="info--text"><p id="${id}">${rawData.recipeSize}</p></div></div></div></div></div><br/>`;
  });

  $(".showRecipes").html(container);

  deleteRecipe();
  editRecipe();
}


function displayEditData(updateData) {
  var editContainer = ` `;
 
  updateData.forEach(function (doc) {
    var id = doc.id;
    var rawData = doc.data();
  // });

    editContainer += `<div class="main__edit" onload="completeEditRecipe()"><div class="edit__left">
        <div class="edit__input--top"><h1>Hey, edit your recipe!</h1>
            <input type="text" value="pizza.jpg">
            <span>
                <a href="#">Attach file</a>
            </span>
        </div>
        <div class="edit__input--middle">
            <input type="text"  id="editRecipeName" value="${rawData.recipeName}">
        </div>
        <div class="edit__input--bottom">
            <input type="text" id="editRecipeDescription" value="${rawData.recipeDescription}">
        </div>
    </div>
    <div class="edit__right">
        <input type="text"  id="editRecipeTime" value="${rawData.recipeTime}">
        <input type="text" id="editRecipeSize"  value="${rawData.recipeSize}"><span><a  class="completeEditRecipe" id="${id}">Submit Changes</a></span> </div></div>
        `;
});

  $(".showEditRecipes").html(editContainer);

  deleteRecipe();
  editRecipe();
  completeEditRecipe();
}

function init() {
  //Create Recipe
  $("#createRecipe").click(function (e) {
    e.preventDefault();

    const form = document.querySelector("#addRecipeNow");

    JUNGLE_SERVICE.addData(form);

    //Adds Recipe Name
    let recipeName = $("#addRecipeName").val().trim();

    let recipeDescription = $("#addRecipeDescription").val();

    //Adds Recipe Time
    let recipeTime = $("#addRecipeTime").val().trim();

    //Adds Recipe Serving Size
    let recipeSize = $("#addRecipeSize").val().trim();

    if (
      recipeName != " " ||
      recipeDescription != " " ||
      recipeTime != " " ||
      recipeSize != " "
    ) {
      //console.log('recipe name added');
    } else {
      alert("One of your inputs is empty!");
    }
  });

  //Display Recipe
  $("#getRecipes").click(function (e) {
    e.preventDefault();
    JUNGLE_SERVICE.getData(displayData);
  });

  $("#showEditRecipes").click(function (e) {
    e.preventDefault();
    JUNGLE_SERVICE.getData(displayEditData);
  });

  
}

$(document).ready(function () {
  JUNGLE_SERVICE.initFirebase();
  init();
});
