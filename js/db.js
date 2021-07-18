db.enablePersistence().catch(err => {
    if(err.code == "failed-precondition") {
        console.log("multiple tabs opened")
    } else if(err.code == "unimplemented"){
        console.log("browsert not supported")
    }
});


var contactForm = document.querySelector("#create_modal form")
var contactModal = document.querySelector("#create_modal")

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
})

db.collection("contact").onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if(change.type === "added") {
            renderContact(change.doc.data(), change.doc.id)
        }
        if(change.type === "removed") {
            
        }
    });
});