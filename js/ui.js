contacts = document.querySelector(".contacts")

document.addEventListener('DOMContentLoaded', function() {
    var modals = document.querySelectorAll('.modal');
    var sideNav = document.querySelectorAll('.sidenav');
    var fixedButton = document.querySelectorAll('.fixed-action-btn');
    M.Modal.init(modals);
    M.Sidenav.init(sideNav);
    M.FloatingActionButton.init(fixedButton);
});

let renderContact = (data, id) => {
    html = `<li class="collection-item avatar" data-id=${id}>
                    <i class="material-icons circle green">insert_chart</i>
                    <span class="title name">${data.name}</span>
                    <p> Phone : ${data.phone}</p>
                    <div class="secondary-content" data-id=${id}>
                        <i href="#edit_modal" class="material-icons modal-trigger">edit</i></a>
                        <i href="#!" class="material-icons">${data.favorite ? 'star' : 'star_border'}</i></a>
                        <i href="#!" class="material-icons">delete_outline</i></a>
                    </div>
                </li>`;
    
    contacts.innerHTML += html;
}
