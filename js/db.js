var contactForm = document.querySelector("#create_modal form")
var contactModal = document.querySelector("#create_modal")

contactForm.addEventListener("submit", e => {
    e.preventDefault();
    var contact = {
        name: contactForm.name.value,
        phone: contactForm.phone.value
    }

    db.collection("contact-pwa").add(contact).then(() => {
        contactForm.reset();
        var instance = M.Modal.getInstance(contactModal);
        instance.close();
        contactForm.querySelector(".error").testComtent = "";
    }).catch(error => {
        contactForm.querySelector(".error").textContent = error;
    });
})