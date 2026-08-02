//ALL VARIABLES AND DOCS SELECTION

let addNote = document.querySelector("#add-note");
let formContainer = document.querySelector(".form-container");
let closeForm = document.querySelector(".closeForm");

let stack = document.querySelector(".stack");
let upBtn = document.querySelector("#upBtn");
let downbtn = document.querySelector("#downbtn");

const form = document.querySelector("form");

const imageUrlInput = form.querySelector(
    "input[placeholder='https://example.com/photo.jpg']"
);
const fullNameInput = form.querySelector(
    "input[placeholder='Enter full name']"
);
const HomeTownInput = form.querySelector(
    "input[placeholder='Enter home town']"
);
const PurposeInput = form.querySelector(
    "input[placeholder='e.g., Quick appointment note']"
);
const categoryRadios = form.querySelectorAll(
    "input[name='category']"
);
const SubmitButton = form.querySelector(".submit-btn");

// CODE STARTS HERE

function saveToLocalStorage(obj){
   if(localStorage.getItem("tasks") === null){
    let oldTasks = [];
    oldTasks.push(obj);
    localStorage.setItem("tasks",JSON.stringify(oldTasks));
   }
   else{
    let oldTasks = localStorage.getItem("tasks");
    oldTasks = JSON.parse(oldTasks);
    oldTasks.push(obj);
    localStorage.setItem("tasks",JSON.stringify(oldTasks));
   }
}

addNote.addEventListener("click",function(){
    formContainer.style.display = "initial";
});

closeForm.addEventListener("click",function(){
    formContainer.style.display = "none";
});

form.addEventListener("submit",function(evt){
    evt.preventDefault();
    const imageUrl = imageUrlInput.value.trim();
    const fullName = fullNameInput.value.trim();
    const HomeTown = HomeTownInput.value.trim();
    const purpose = PurposeInput.value.trim();

    let selected = false;
    categoryRadios.forEach(function(cat){
        if(cat.checked){
            selected = cat.value;
        }
    });

    //VALIDATE LOGIC
    if(imageUrl === ""){
        alert("Please enter an image URL.");
        return;
    }
    if(fullName === ""){
        alert("Please enter your full name");
        return;
    }
    if(HomeTown === ""){
        alert("Please enter your home town");
        return;
    }
    if(purpose === ""){
        alert("Please enter your purpose");
        return;
    }

    if(!selected){
        alert("Please select a category");
        return;
    }

saveToLocalStorage({
        imageUrl,
        fullName,
        purpose,
        HomeTown,
        selected,
    });

    form.reset();
    formContainer.style.display = "none";
    showCards();
});

function showCards(){
    stack.innerHTML = "";
    let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    allTasks.forEach(function(task){
    const card = document.createElement("div");
    card.classList.add("card");

// Avatar
const avatar = document.createElement("img");
avatar.classList.add("avatar");
avatar.alt = "profile";
avatar.src = task.imageUrl;
card.appendChild(avatar);

// Name
const name = document.createElement("h2");
name.textContent = task.fullName;
card.appendChild(name);

// Info:Hometown
const homeTownInfo = document.createElement("div");
homeTownInfo.classList.add("info");
const homeTownLabel = document.createElement("span");
homeTownLabel.textContent = "Home town";
const homeTownValue = document.createElement("span");
homeTownValue.textContent = task.HomeTown;
homeTownInfo.appendChild(homeTownLabel);
homeTownInfo.appendChild(homeTownValue);

//Info:Bookings
const bookingsInfo = document.createElement("div");
bookingsInfo.classList.add("info");
const bookingLabel = document.createElement("span");
bookingLabel.textContent = "purpose";
const bookingValue = document.createElement("span");
bookingValue.textContent = task.purpose;

bookingsInfo.appendChild(bookingLabel);
bookingsInfo.appendChild(bookingValue);

// Buttons
const buttons = document.createElement("div");
buttons.classList.add("buttons");

// Call Button
const callBtn = document.createElement("button");
callBtn.classList.add("call");

const phoneIcon = document.createElement("i");
phoneIcon.classList.add("ri-phone-line");

callBtn.appendChild(phoneIcon);
callBtn.append(" Call");

// Message Button
const msgBtn = document.createElement("button");
msgBtn.classList.add("msg");
msgBtn.textContent = "Message";

// Append buttons
buttons.appendChild(callBtn);
buttons.appendChild(msgBtn);

// Assemble card
card.appendChild(avatar);
card.appendChild(name);
card.appendChild(homeTownInfo);
card.appendChild(bookingsInfo);
card.appendChild(buttons);

// Finally add to the stack
document.querySelector(".stack").appendChild(card);
    })
}

showCards();


function updateStack() {
    const cards = document.querySelectorAll(".stack .card");

    cards.forEach((card, index) => {
        card.style.zIndex = cards.length - index;
        card.style.transform = `translateY(${index * 10}px) scale(${1 - index * 0.02})`;
        card.style.opacity = 1 - index * 0.02;
    });
}

upBtn.addEventListener("click",function(){
   let lastChild = stack.lastElementChild;
   if(lastChild){
    stack.insertBefore(lastChild,stack.firstElementChild);
    updateStack();
   }
});
downBtn.addEventListener("click",function(){
    const firstChild = stack.firstElementChild;
    if(firstChild){
        stack.appendChild(firstChild);
        updateStack();
    }
});