class UsersList {
    constructor(usersUrl, renderContainer) {
        this.usersUrl = usersUrl;
        this.container = renderContainer;
        this.addEventListeners();
    }
    getProductById(id) {
        return this.users.find(el => el.id === id);
    }
    getUsers(){
      fetch(this.usersUrl)
          .then(result => result.json() )
          .then(users => {
              this.users = users;
              this.renderUsers(this.container, users);
          })
    }
    searchByName(name, users) {
      return users.filter(user => user.name.includes(name))
    }
    updateUsersList(user){
      this.users[this.users.findIndex(el => el.id === user.id)] = user;
      return this.users;
    }
    renderUsers(container, users) {
        let productListDomString = `
                  <table class="table table-dark table-responsive">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Age</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Company</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th class="user-about">About</th>
                        <th>Registered</th>
                        <th>Edit</th
                      </tr>
                    </thead>
                    <tbody>`;
        users.forEach(product => {
            productListDomString +=
                `<tr>
                    <td>
                      <div class="id-box">
                        ${product.id}
                      </div>
                    </td>
                    <td>${product.age}</td>
                    <td>${product.name}</td>
                    <td>${product.gender}</td>
                    <td>${product.company}</td>
                    <td>${product.email}</td>
                    <td class="phone-box">${product.phone}</td>
                    <td>${product.address}</td>
                    <td>
                      <div class="about-box">
                        ${product.about}
                      </div>
                    </td>
                    <td>${product.registered}</td>
                    <td>
                      <button class="btn btn-info" data-toggle="modal"
                        data-target="#usersEditModal" data-id="${product.id}">Edit
                      </button>
                    </td>
                  </tr>`;
        });
        productListDomString += `</tbody></table>`
        container.html(productListDomString);
    }
    addEventListeners() {
        $('#usersEditModal').on('show.bs.modal', event => {
            // Button that triggered the modal
            const button = $(event.relatedTarget);
            // Extract info from data-* attributes
            const id  = String(button.data('id'));
            const product = this.getProductById(id);
            const modal = $('#usersEditModal');
            // Set data to inputs
            modal.find('.modal-body .card-age').val(product.age);
            modal.find('.modal-body .card-name').val(product.name);
            modal.find('.modal-body .card-gender').val(product.gender);
            modal.find('.modal-body .card-company').val(product.company);
            modal.find('.modal-body .card-email').val(product.email);
            modal.find('.modal-body .card-phone').val(product.phone);
            modal.find('.modal-body .card-address').val(product.address);
            modal.find('.modal-body .card-about').val(product.about);
            modal.find('.modal-body .card-registered').val(product.registered);
            modal.find('button.save')
                .data('id', id);
        });

        $('.download').click( event => {
            this.getUsers();
        });

        $('.search').click( event => {
            const name = $('.search-input').val();
            let searchedUsers = this.searchByName( name, this.users);
            this.renderUsers($('.users-container'), searchedUsers);
        });
        $('#usersEditModal button.save').click( event => {
            const button = $(event.target);
            const id  = button.data('id');
            const modal = $('#usersEditModal');

            const age = modal.find('.modal-body .card-age').val();
            const name = modal.find('.modal-body .card-name').val();
            const gender = modal.find('.modal-body .card-gender').val();
            const company = modal.find('.modal-body .card-company').val();
            const email = modal.find('.modal-body .card-email').val();
            const phone = modal.find('.modal-body .card-phone').val();
            const address = modal.find('.modal-body .card-address').val();
            const about = modal.find('.modal-body .card-about').val();
            const registered = modal.find('.modal-body .card-registered').val();

            const updatedUser = {
              id,
              age,
              name,
              gender,
              company,
              email,
              phone,
              address,
              about,
              registered
            };
            const updatedUsersList = this.updateUsersList(updatedUser);

            this.renderUsers($('.users-container'), updatedUsersList);
        });
    }
}
