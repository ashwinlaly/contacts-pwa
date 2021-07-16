(function() {
    document.addEventListener('DOMContentLoaded', function() {
        var modals = document.querySelectorAll('.modal');
        var sideNav = document.querySelectorAll('.sidenav');
        var fixedButton = document.querySelectorAll('.fixed-action-btn');
        M.Modal.init(modals);
        M.Sidenav.init(sideNav);
        M.FloatingActionButton.init(fixedButton);
    });
})();