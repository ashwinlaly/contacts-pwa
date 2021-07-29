contacts = document.querySelector(".contacts")
favorite_contacts = document.querySelector(".favorite-contacts")

document.addEventListener('DOMContentLoaded', function() {
    var modals = document.querySelectorAll('.modal');
    var sideNav = document.querySelectorAll('.sidenav');
    var fixedButton = document.querySelectorAll('.fixed-action-btn');
    M.Modal.init(modals);
    M.Sidenav.init(sideNav);
    M.FloatingActionButton.init(fixedButton);
});

let renderContact = (data, id) => {
    html = `<li class="collection-item avatar contact" data-id=${id}>
                <i class="material-icons circle green">insert_chart</i>
                <span class="title name">${data.name}</span>
                <p> Phone : <span class="title phone">${data.phone}</span></p>
                <div class="secondary-content" data-id=${id}>
                    <i href="#edit_modal" class="material-icons modal-trigger" style="cursor:pointer">edit</i></a>
                    <i href="#!" class="material-icons favorite" style="cursor:pointer">${data.favorite ? 'star' : 'star_border'}</i></a>
                    <i href="#!" class="material-icons" style="cursor:pointer">delete_outline</i></a>
                </div>
            </li>`;
    contacts.innerHTML += html;
}

let renderFavoriteContact = (data, id) => {
    html = `<li class="collection-item avatar contact" data-id=${id}>
                <i class="material-icons circle green">insert_chart</i>
                <span class="title name">${data.name}</span>
                <p> Phone : <span class="title phone">${data.phone}</span></p>
                <div class="secondary-content" data-id=${id}>
                    <i href="#edit_modal" class="material-icons modal-trigger" style="cursor:pointer">edit</i></a>
                    <i href="#!" class="material-icons favorite" style="cursor:pointer">${data.favorite ? 'star' : 'star_border'}</i></a>
                    <i href="#!" class="material-icons" style="cursor:pointer">delete_outline</i></a>
                </div>
            </li>`;
    favorite_contacts.innerHTML += html;
}

let updateContent = (data, id) => {
    const contact = document.querySelector(`.contact[data-id="${id}"]`);
    contact.querySelector(".name").value = data.name;
    contact.querySelector(".phone").value = data.phone;
    contact.querySelector(".favorite").innerHTML = data.favorite ? 'star' : 'star_border';
}

let removeContact = (id)  => {
    const contact = document.querySelector(`.contact[data-id=${id}]`);
    contact.remove();
}