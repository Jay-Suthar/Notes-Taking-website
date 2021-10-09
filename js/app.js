console.log("this is magic notes");

shownotes();

let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click", () => {
    let addtxt = document.getElementById("addtxt");
    let addtitle = document.getElementById("addtitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let obj = {
        title: addtitle.value,
        text: addtxt.value
    }
    notesobj.push(obj);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addtxt.value = "";
    addtitle.value = "";
    // console.log(notesobj);
    shownotes();
})


//function to show elements from local storage
function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let html = "";
    notesobj.forEach((function (element, index) {
        html += `
        <div class="notecard my-2 mx-2 card">
                <div class="card-body">
                    <h5 class="card-title">${index+1}. ${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}" onclick = "deletenode(this.id)" class="btn btn-primary">Delete</button>
                </div>
            </div>`;
    }))


    let notesElm = document.getElementById('notes');
    if (notesobj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! <br>Use "Add a Note" section to add notes`;
    }
}

// function to dlt a node 
function deletenode(index) {
    // console.log("I am deleting", index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    shownotes();
}

let search = document.getElementById('searchtxt');
search.addEventListener('input', function () {
    let inputVal = search.value.toLowerCase();
    // console.log("input event fired", inputVal);
    let notecard = document.getElementsByClassName('notecard');
    Array.from(notecard).forEach(function (element) {
        let cardtxt = element.getElementsByTagName("p")[0].innerText;
        // console.log(cardtxt);
        if (cardtxt.includes(inputVal)) {
            element.style.display = "block";
        }

        else {
            element.style.display = "none";
        }
    })
})