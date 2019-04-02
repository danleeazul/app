import {MDCTopAppBar} from '@material/top-app-bar/index';
import {MDCDrawer} from "@material/drawer";
import {MDCList} from "@material/list";
import {MDCRipple} from '@material/ripple';


const list = new MDCList(document.querySelector('.mdc-list'));

//TAB BAR
import {MDCTabBar} from '@material/tab-bar';
const tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));

// Select DOM elements
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const listEl = document.querySelector('.mdc-drawer .mdc-list');
const drawerElement = document.querySelector('.mdc-drawer');
const mainContentEl = document.querySelector('.main-content');

// Initialize top app bar

const topAppBar = new MDCTopAppBar(topAppBarElement);

// Initialize drawer

const initModalDrawer = () => {
  drawerElement.classList.add("mdc-drawer--modal");
  const drawer = MDCDrawer.attachTo(drawerElement);
  drawer.open = false;
  topAppBar.setScrollTarget(mainContentEl);
  topAppBar.listen('MDCTopAppBar:nav', () => {
    drawer.open = !drawer.open;
  });

  listEl.addEventListener('click', (event) => {
    drawer.open = false;
  });
}

if (window.matchMedia("(max-width: 900px)").matches) {
  initModalDrawer();
} else {
  const list = new MDCList(listEl);
  list.wrapFocus = true;
}

// Toggle between permanent drawer and modal drawer at breakpoint 900px

const resizeHandler = () => {
  if (window.matchMedia("(max-width: 900px)").matches) {
    initModalDrawer();
  } else {
    drawerElement.classList.remove("mdc-drawer--modal");
  }
}
window.addEventListener('resize', resizeHandler);


// Switch content on tab activation

Array.from(document.querySelectorAll('.mdc-tab')).forEach(
    tab => tab.addEventListener('MDCTab:interacted', (e) => switchToTab(e.detail.tabId))
  );
  
  const switchToTab = (activatedTabId) => {
    Array.from(document.querySelectorAll('.tab-content')).forEach(tabContent => {
      tabContent.style.display = tabContent.id.slice(0, -1 * '-content'.length) == activatedTabId.slice(0, -1 * '-tab'.length) ? 'block' : 'none';
    });
  }

  function ButtonDashboard(){
    document.getElementById('dashboard-tab').click();
  } 
  var dashboardclick = document.getElementById("btndashboard");
  dashboardclick.addEventListener("click",  ButtonDashboard);

  function ButtonListing(){
    document.getElementById('listing-tab').click();
  } 
  var listingclick = document.getElementById("btnlisting");
  listingclick.addEventListener("click",  ButtonListing);
  
//logout functions FIREBASE
function logout(){
    firebase.auth().signOut().then(function() {
        window.location="index.html";
      }).catch(function(error) {
        // An error happened.
        var errorCode = error.code;
        var errorMessage = error.message;
  
        window.alert("Error: " + errorMessage);
      });
  } 
  var logoutclick = document.getElementById("btnlogout");
  logoutclick.addEventListener("click", logout, false);


//CARDS
const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(selector), function(el) {
  return new MDCRipple(el);
});


