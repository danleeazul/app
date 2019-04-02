import {MDCTextField} from '@material/textfield';
import {MDCRipple} from '@material/ripple';


const username = new MDCTextField(document.querySelector('.username'));
const password = new MDCTextField(document.querySelector('.password'));

new MDCRipple(document.querySelector('.signin')); //signin button


//Login
function login(){

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    // firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function() {
    //     // Sign-in successful. 
    //     //window.location="home.html";

    //   }).catch(function(error) {
    //       // An error happened.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;

    //     window.alert("Error: " + errorMessage);      });

    

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

    
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(user => {

           
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          user.getIdToken().then(function(data) {
            console.log(data)

            
            return user.getIdToken().then(idToken => {
              const csrfToken = getCookie('csrfToken')
              return postIdTokenToSessionLogin('/sessionLogin', idToken, csrfToken);
            });


          });
        }
      });
    }).then(() => {
      return firebase.auth().signOut();
    }).then(() => {
      window.location.assign('/home.html');
    }).catch(function(error) {
      // An error happened.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error: " + errorMessage);      });

    

}//login
var loginclick = document.getElementById("btnlogin");
loginclick.addEventListener("click", login, false);

