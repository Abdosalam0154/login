var signinEmail =document.getElementById("signinEmail");
var signinPassword =document.getElementById("signinPassword");
var signupName =document.getElementById("signupName");
var signupEmail =document.getElementById("signupEmail");
var signupPassword =document.getElementById("signupPassword");
var signUpArray=[];

if (localStorage.getItem("signup")!==null) {
    signUpArray=JSON.parse(localStorage.getItem("signup"))
}
else{
    signUpArray=[]
}
// --------------------------signup-------------------------

    function signup(){
        if(Validation(signupName) && Validation(signupEmail) && Validation(signupPassword)&&checkIsEmptySignUp()==true ){
            if (isExist() == true) {
                displayExist()
                return true;
            }
            var user={
                name:signupName.value,
                email:signupEmail.value,
                password:signupPassword.value,
                }
                signUpArray.push(user);
                console.log(signUpArray);
                localStorage.setItem('signup',JSON.stringify(signUpArray));
                displaySucces()
                clrinput();

                signupName.classList.remove("is-valid")
                signupEmail.classList.remove("is-valid")
                signupPassword.classList.remove("is-valid")
    }
    else{
        displayrequired()
    }
}


function Validation(ele) {

    var Regex = {
        signupName: /^[A-Za-z].{3,30}$/,
        signupEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        signupPassword: /^.{5,20}$/,
    };

    if(Regex[ele.id].test(ele.value)){
        ele.classList.add('is-valid');
        ele.classList.remove('is-invalid');
        return true
    }
    else{
        ele.classList.add('is-invalid');
        ele.classList.remove('is-valid');
        return false
    }
}


// --------------------------signin-------------------------





function login(){

    if(signinEmail.value==null||signinPassword.value==null){
        signinEmail.classList.add("is-invalid")
        signinPassword.classList.add("is-invalid")
        displayrequired();
    }
    else{
        for(var i=0; i<signUpArray.length;i++){
            if(signinEmail.value==signUpArray[i].email&&signinPassword.value==signUpArray[i].password){
                localStorage.setItem('signup',JSON.stringify(signUpArray[i].name));
                window.location =  "../home.html";
            }
            else{
                displayincorrect()
            }
        }
    }
}




function displayExist(){
    document.getElementById("messageImpty").innerHTML='<span class="text-white ">the mail is already</span>'
}
function displaySucces(){
    document.getElementById("messageImpty").innerHTML='<span class="text-white ">Succes</span>'
}
function displayrequired(){
    document.getElementById("messageImpty").innerHTML='<span class="text-white ">All inputs required</span>'
}
function displayincorrect(){
    document.getElementById("message").innerHTML ='<span class="text-white">incorrect email or password</span>'
}


function isExist(){
    for(var i=0; i<signUpArray.length; i++){
        if(signUpArray[i].email==signinEmail.value){
                return true 
                }
        }
        return false;
    }

function checkIsEmptySignUp() {
    if (signupName.value == '' || signupEmail.value == '' || signupPassword.value == '') {
        return false
    }
    else {
        return true
    }
}

function clrinput(){
    signupName.value=null;
    signupEmail.value=null;
    signupPassword.value=null;
}