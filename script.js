const contactForm = $('#contactForm');
const contactList = $('#contactList');
let contacts = [];

contactForm.on('submit', addContact);

function addContact(event) {
    event.preventDefault();

    const newContact = {
        firstName: contactForm[0].firstName.value,
        lastName: contactForm[0].lastName.value,
        phone: formatPhone(contactForm[0].phone.value)
    };

    const validation = validateContact(newContact);
    if (!validation.isValid) {
        alert(validation.message);
        return;
    }

    contacts.push(newContact);
    contactForm[0].reset();
    displayContacts();
}

function validateContact(contact) {
    if (!contact.firstName) {
        return { isValid: false, message: 'Por favor, insira um nome.' };
    }
    if (!contact.lastName) {
        return { isValid: false, message: 'Por favor, insira um sobrenome.' };
    }
    if (contact.phone.replace(/\D/g, '').length !== 11) {
        return { isValid: false, message: 'O telefone deve ter exatamente 11 dígitos (sem contar caracteres especiais).' };
    }
    return { isValid: true };
}

function formatPhone(phone) {
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 11) return phone;

    return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 7)}-${cleanPhone.slice(7)}`;
}

function displayContacts() {
    contactList.empty();
    contacts.forEach((contact, index) => {
        const listItem = $(`
            <li>
                <strong>${contact.firstName} ${contact.lastName}</strong>
                <span> Telefone: ${contact.phone}</span>
                <a href="#" onclick="removeContact(${index})">Remover</a>
                <a href="#" onclick="editContact(${index})">Editar</a>
            </li>
        `);
        contactList.append(listItem);

        setTimeout(() => {
            listItem.addClass('show');
        }, 100);
    });
}

function removeContact(index) {
    contacts.splice(index, 1);
    displayContacts();
}

function editContact(index) {
    const contact = contacts[index];
    $('#firstName').val(contact.firstName);
    $('#lastName').val(contact.lastName);
    $('#phone').val(contact.phone.replace(/\D/g, ''));

    $('#editButton').show();
    $('#addButton').hide();

    $('#editButton').off('click').on('click', function() {
        const updatedContact = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            phone: formatPhone($('#phone').val()),
        };

        contacts[index] = updatedContact;
        contactForm[0].reset();
        displayContacts();
        $('#editButton').hide();
        $('#addButton').show();
    });
}
