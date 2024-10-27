///<reference types="../@types/jquery"/>


let rowData = document.getElementById("rowData");
let displaySearch = document.getElementById("displaySearch")
close()
$('.close i').on('click', function () {
    if ($('.sidebar').css("left") == "0px") {
        close()
    }
    else {
        $('.sidebar').animate({ left: 0 }, 500)
        $('.icon').addClass('fa-xmark')
        $('.icon').removeClass('fa-bars')
        $('.list li').eq(0).animate({ top: 0 }, 500)
        $('.list li').eq(1).animate({ top: 0 }, 600)
        $('.list li').eq(2).animate({ top: 0 }, 700)
        $('.list li').eq(3).animate({ top: 0 }, 800)
        $('.list li').eq(4).animate({ top: 0 }, 900)
    }
})
function close() {
    let width = $('.navbarmine').outerWidth()
    $('.sidebar').animate({ left: -width }, 500)
    $('.icon').removeClass('fa-xmark')
    $('.icon').addClass('fa-bars')
    $('.list li').animate({ top: 250 }, 500)
}

$(document).ready(function(){
    $('.innerloadingScreen').fadeOut(200)
    $('.loadingScreen').fadeOut(1000)
$('body').css('overflow' , 'auto')


})





getMeals('');
let meals = []
async function getMeals(term) {


    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json();

    meals = response.meals
    displayMeals(meals)
    $('.innerloadingScreen').fadeOut(1000)
    close()
    displaySearch.innerHTML = "";
}

function displayMeals(arr){
    let cartona = ``;
    for (let i = 0; i < arr.length; i++) {

        cartona += `
<div class="col-md-3 ">
                    <div class="position-relative div overflow-hidden"  onclick="allDetails('${arr[i].idMeal}')">
                        <img class="w-100 rounded-2"
                            src="${arr[i].strMealThumb}">
                        <div class="position-absolute layer rounded-2 d-flex justify-content-start  align-items-center">
                            <h3 class="px-2">${arr[i].strMeal}</h3>

                        </div>
                    </div>
                </div>
`
    }
   
    rowData.innerHTML = cartona;

}

async function getCategories() {
    $('.innerloadingScreen').fadeIn(200)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json();

    let categories = response.categories

    // console.log(categories)
    displayCategories(categories)
    $('.innerloadingScreen').fadeOut(200)
    close()
    displaySearch.innerHTML = "";
}



function displayCategories(arr) {
    let cartona = ``;
    for (let i = 0; i < arr.length; i++) {

        cartona += `
    <div class="col-md-3 ">
                        <div class="position-relative div overflow-hidden" onclick="filterCategories('${arr[i].strCategory}')">
                            <img class="w-100 rounded-2"
                                src="${arr[i].strCategoryThumb}">
                            <div class="position-absolute layer rounded-2  text-center">
<div> <h3 class="px-2 pt-2">${arr[i].strCategory}</h3>
    <p class="px-2">${arr[i].strCategoryDescription.split(" ").slice(0 , 28).join(" ")}</p>
</div>
                               
                            </div>
                        </div>
                    </div>
    `
    }
    rowData.innerHTML = cartona;

}





async function getArea() {
    $('.innerloadingScreen').fadeIn(200)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await response.json();

    let area = response.meals

    // console.log(area)
    displayArea(area)
    $('.innerloadingScreen').fadeOut(200)
    close()
    displaySearch.innerHTML = "";
}



function displayArea(arr) {
    let cartona = ``;
    for (let i = 0; i < arr.length; i++) {

        cartona += `
        <div class="col-md-3 ">
            <div class="text-center text-white div" onclick="filterArea('${arr[i].strArea}')">
                 <i class="fa-solid fa-house-laptop fa-4x"></i>
                 <h3 class="px-2 pt-2">${arr[i].strArea}</h3>
            </div>
        </div>
        `
    }
    rowData.innerHTML = cartona;

}

async function getIngredients() {
    $('.innerloadingScreen').fadeIn(200)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await response.json();

    let ingredients = response.meals


    // console.log(ingredients)
    displayIngredients(ingredients.slice(0 , 20))
    $('.innerloadingScreen').fadeOut(200)
    close()
    displaySearch.innerHTML = "";
}

function displayIngredients(arr) {
    let cartona = ``;
    for (let i = 0; i < arr.length; i++) {

        cartona += `
        <div class="col-md-3 ">
            <div class="text-center text-white div"  onclick="filterIngredients('${arr[i].strIngredient}')">
                 <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                 <h3 class="px-2 pt-2">${arr[i].strIngredient}</h3>
<p class="px-2 ">${arr[i].strDescription.split(" ").slice(0 , 27).join(" ")}</p>
            </div>
        </div>
        `
    }
    rowData.innerHTML = cartona;
}

async function filterCategories(name) {
    $('.innerloadingScreen').fadeIn(200)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)
    response = await response.json();

    let filterCategories = response.meals


    // console.log(filterCategories)
    displayfilterCategories(filterCategories)
    $('.innerloadingScreen').fadeOut(200)
}

function displayfilterCategories(arr) {
    let cartona = ``;
    for (let i = 0; i < arr.length; i++) {

        cartona += `
    <div class="col-md-3 ">
                        <div class="position-relative div overflow-hidden" onclick="allDetails('${arr[i].idMeal}')">
                            <img class="w-100 rounded-2"
                                src="${arr[i].strMealThumb}">
                            <div class="position-absolute layer rounded-2 d-flex justify-content-start  align-items-center ">
 <h3 class="px-2 pt-2">${arr[i].strMeal}</h3>
                            </div>
                        </div>
                    </div>
    `
    }
    rowData.innerHTML = cartona;

}

async function filterArea(city){
    $('.innerloadingScreen').fadeIn(200)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${city}`)
    response = await response.json();

    let area = response.meals

    // console.log(area)
    displayfilterArea(area)
    $('.innerloadingScreen').fadeOut(200)
}

function displayfilterArea(arr) {
    let cartona = ``;
    for (let i = 0; i < arr.length; i++) {

        cartona += `
    <div class="col-md-3 ">
                        <div class="position-relative div overflow-hidden" onclick="allDetails('${arr[i].idMeal}')">
                            <img class="w-100 rounded-2"
                                src="${arr[i].strMealThumb}">
                            <div class="position-absolute layer rounded-2 d-flex justify-content-start  align-items-center ">
 <h3 class="px-2 pt-2">${arr[i].strMeal}</h3>
                            </div>
                        </div>
                    </div>
    `
    }
    rowData.innerHTML = cartona;
}

async function filterIngredients(item){
    $('.innerloadingScreen').fadeIn(200)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${item}`)
    response = await response.json();

    let Ingredients = response.meals

    // console.log(Ingredients)
    displayfilterIngredients(Ingredients)
    $('.innerloadingScreen').fadeOut(200)
}

function displayfilterIngredients(arr) {
    let cartona = ``;
    for (let i = 0; i < arr.length; i++) {

        cartona += `
    <div class="col-md-3 ">
                        <div class="position-relative div overflow-hidden" onclick="allDetails('${arr[i].idMeal}')">
                            <img class="w-100 rounded-2"
                                src="${arr[i].strMealThumb}">
                            <div class="position-absolute layer rounded-2 d-flex justify-content-start  align-items-center ">
 <h3 class="px-2 pt-2">${arr[i].strMeal}</h3>
                            </div>
                        </div>
                    </div>
    `
    }
    rowData.innerHTML = cartona;
}

let Details =[];
async function allDetails(id){
    $('.innerloadingScreen').fadeIn(200)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    response = await response.json();

     Details = response.meals[0]

    // console.log(Details)
    displayDetails(Details)
    $('.innerloadingScreen').fadeOut(200)
    displaySearch.innerHTML = "";
    close()
}

function displayDetails(arr){


let ing = ``
for(let i = 1 ; i <= 20 ; i++){

if(arr[`strIngredient${i}`]){

    ing += `<li class="alert alert-info py-2 px-1 mx-2"> ${arr[`strMeasure${i}`]}  ${arr[`strIngredient${i}`]}</li>`
}

}
 let tags = arr.strTags?.split(",")

if(!tags) tags=[]
let displayTags = ``
for (let i = 0; i < tags.length; i++) {
    
    displayTags += `<li class="alert alert-danger py-2 px-1 mx-2">${tags[i]}</li>`
}

let cartona = `<div class="col-md-4 text-white">
                    <div>
                        <img src="${Details.strMealThumb}" class="w-100 rounded-2">
                        <h3>${Details.strMeal}</h3>

                    </div>

                </div>
                <div class="col-md-8 text-white" >


                    <h2 class="py-1">Instructions</h2>
                    <p class="py-1">${Details.strInstructions}</p>

                    <div class="py-1">
                        <h3><span class="fw-bolder">Area : </span>${Details.strArea}</h3>
                        <h3><span class="fw-bolder">Category : </span>${Details.strCategory}</h3>
                        <h3><span class="fw-bolder">Recipes : </span></h3>
                        <div>
                            <ul class="list-unstyled d-flex flex-wrap ">
                                ${ing}
                            </ul>
                        </div>
                        <h3><span class="fw-bolder">Tags : </span></h3>
                        <div>
                            <ul class="list-unstyled d-flex flex-wrap ">
                               ${displayTags}
                            </ul>
                        </div>

                        <div class="list-unstyled d-flex  ">
                            <a href="${Details.strSource}" target="_blank" class="btn btn-success ">Source</a>
                            <a href="${Details.strYoutube}" target="_blank" class="btn btn-danger mx-1">Youtube</a>
                        </div>
                    </div>
                </div>

`
rowData.innerHTML = cartona;

}

function search(){
   
let cartona = `<div class="row py-4  " >
<div class="col-md-6">
                    <input  oninput="searchByName(this.value) , loading()"  class="form-control bg-transparent text-white" placeholder="Search By Name" type="text">
                </div>
                <div class="col-md-6">
                    <input  oninput="searchByFletter(this.value) , loading() " maxlength="1"  class="form-control bg-transparent text-white" placeholder="Search By First Letter"
                        type="text">
                </div>
                </div>`
                displaySearch.innerHTML = cartona;
                rowData.innerHTML = "";
               
close()

}

async function searchByName(text){

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`)
    response = await response.json();

    let results = response.meals

    results? displayMeals(results) : displayMeals([])
}


async function searchByFletter(text){
text == "" ? text = "a" : "" ;
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${text}`)
    response = await response.json();

    let results = response.meals

    results? displayMeals(results) : displayMeals([])


}



function loading(){
    $('.innerloadingScreen').fadeIn(200)
    $('.innerloadingScreen').fadeOut(200)
}


let fullNameInputFocus = false;
let emailInputFocus = false;
let phoneInputFocus = false;
let ageInputFocus = false;
let passwordInputFocus = false;
let repasswordInputFocus = false;


function contact(){
    displaySearch.innerHTML= '';
let cartona = `<div class="contact d-flex justify-content-center align-items-center min-vh-100 px-5">


            <div class="container w-75  px-5 text-center">
                <div class="row  g-4">
                    <div class="col-md-6">
                        <input id="nameInput"  onkeyup="validation()"  class="form-control" placeholder="Enter Your Name" type="text">
                        <div  id="NameAlert"  class="alert alert-danger w-100 mt-1 d-none">Special characters and numbers not allowed</div>
                    </div>
                    <div class="col-md-6">
                        <input  id="emailInput" onkeyup="validation()" class="form-control" placeholder="Enter Your Email" type="email">
                        <div  id="emailAlert" class="alert alert-danger w-100 mt-1 d-none">Email not valid *exemple@yyy.zzz</div>
                    </div>
                    <div class="col-md-6">
                        <input  id="phonenumberInput" onkeyup="validation()" class="form-control" placeholder="Enter Your Phone" type="text">
                        <div  id="phoneAlert"  class="alert alert-danger w-100 mt-1 d-none">Enter valid Phone Number</div>
                    </div>
                    <div class="col-md-6">
                        <input id="ageInput" onkeyup="validation()" class="form-control" placeholder="Enter Your Age" type="number">
                        <div  id="ageAlert" class="alert alert-danger w-100 mt-1 d-none">Enter valid age</div>
                    </div>
                    <div class="col-md-6">
                        <input  id="passwordInput"  onkeyup="validation()" class="form-control" placeholder="Enter Your Password" type="password">
                        <div  id="passwordAlert" class="alert alert-danger w-100 mt-1 d-none">Enter valid password *Minimum eight characters, at least one letter and one number:*</div>
                    </div>
                    <div class="col-md-6">
                        <input  id="repasswordInput" onkeyup="validation()" class="form-control" placeholder="Repassword" type="password">
                        <div   id="repasswordAlert" class="alert alert-danger w-100 mt-1 d-none">Enter valid repassword</div>
                    </div>
                </div>
                <button id="submitButton"  class="btn btn-outline-danger my-3 disabled">submit</button>
            </div>
        </div>`
    rowData.innerHTML = cartona;
    close()
    $('#nameInput').on('focus',function(){
        fullNameInputFocus = true
    })
    $('#emailInput').on('focus',function(){
        emailInputFocus = true
    })
$('#phonenumberInput').on('focus' , function(){
    phoneInputFocus = true
})
$('#ageInput').on('focus' ,function(){
    ageInputFocus = true
})
$('#passwordInput').on('focus',function(){
    passwordInputFocus = true
})
$('#repasswordInput').on('focus',function(){
    repasswordInputFocus = true
})

}



function validation(){

    if (fullNameInputFocus) {
        if (nameRegex()) {
            document.getElementById("NameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("NameAlert").classList.replace("d-none", "d-block")
        }
    }
    if (emailInputFocus) {
        if (emailRegex()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")
        }
    }

    if (phoneInputFocus) {
        if (phoneRegex()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")
        }
    }
    if (ageInputFocus) {
        if (ageRegex()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")
        }
    }
    if (passwordInputFocus) {
        if (passwordRegex()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputFocus) {
        if (repasswordRegex()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }
if (nameRegex() && emailRegex() && phoneRegex() && ageRegex() && passwordRegex() && repasswordRegex()) {
    document.getElementById('submitButton').classList.remove('disabled')
}else{
    document.getElementById('submitButton').classList.add('disabled')
}

}
function nameRegex() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById('nameInput').value))
}

function emailRegex() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById('emailInput').value))
}

function phoneRegex() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById('phonenumberInput').value))
}

function ageRegex() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById('ageInput').value))
}

function passwordRegex() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById('passwordInput').value))
}

function repasswordRegex(){
    if(document.getElementById('repasswordInput').value == document.getElementById('passwordInput').value){
        return true
    }else{
        return false
    }
}


