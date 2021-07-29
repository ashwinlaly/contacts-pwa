db.enablePersistence().catch(err => {
    if(err.code == "failed-precondition") {
        console.log("multiple tabs opened")
    } else if(err.code == "unimplemented"){
        console.log("browsert not supported")
    }
});

var contactModal = document.querySelector("#create_modal")
var contactForm = document.querySelector("#create_modal form")

var updateID = null;
var contactEditModal = document.querySelector("#edit_modal")
var contactEditForm = document.querySelector("#edit_modal form")

contactForm.addEventListener("submit", e => {
    e.preventDefault();
    var contact = {
        name: contactForm.name.value,
        phone: contactForm.phone.value
    }

    db.collection("contact").add(contact).then(() => {
        contactForm.reset();
        var instance = M.Modal.getInstance(contactModal);
        instance.close();
        contactForm.querySelector(".error").testComtent = "";
    }).catch(error => {
        contactForm.querySelector(".error").textContent = error;
    });
});

contactEditForm.addEventListener("submit", e => {
    e.preventDefault();
    var contact = {
        name: contactEditForm.name.value,
        phone: contactEditForm.phone.value
    }

    db.collection("contact").doc(updateID).update(contact).then(() => {
        contactEditForm.reset();
        var instance = M.Modal.getInstance(contactModal);
        instance.close();
        contactEditForm.querySelector(".error").textContent = '';
    }).catch(error => {
        contactEditForm.querySelector(".error").textContent = error;
    });
});

db.collection("contact").onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if(change.type === "added") {
            if(window.location.pathname == "/" || window.location.pathname == "/index.html") {
                renderContact(change.doc.data(), change.doc.id);
            } else if(window.location.pathname == "/pages/favorites.html") {
                renderFavoriteContact(change.doc.data(), change.doc.id);
            } else {

            }
        }
        if(change.type === "removed") {
            
        }
        if(change.type === "modified") {
            updateContent(change.doc.data(), change.doc.id);
        }
    });
});

const contactContainer = document.querySelector(".contacts");
contactContainer.addEventListener("click", e => {
    const id = e.target.parentElement.getAttribute("data-id");
    if(e.target.textContent === "edit") {
        const contact = document.querySelector(`.contact[data-id="${id}"]`);
        const name = contact.querySelector(".name").innerHTML;
        const phone = contact.querySelector(".phone").innerHTML;
        updateID = id;
        const updateContact = document.querySelector("#edit_modal");
        updateContact.querySelector("#name").value = name;
        updateContact.querySelector("#phone").value = phone;
    } else if(e.target.textContent === "star_border" || e.target.textContent === "star") {
        const contact = document.querySelector(`.contact[data-id="${id}]"`);
        is_favorite = {
            favorite : e.target.textContent === "star" ? false : true
        }
        db.collection("contact").doc(id).update(is_favorite).then(response => {
            
        }).catch(error => {
            console.log(error);
        });
    } else if(e.target.textContent === "delete_outline") {
        db.collection("contact").doc(id).delete();
        removeContact(id);
    } else {
        
    }
})