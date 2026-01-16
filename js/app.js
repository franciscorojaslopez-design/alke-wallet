/* =====================================================
   APP PRINCIPAL - ALKE WALLET
   =====================================================
   - Controla la lógica de toda la aplicación
   - Usa jQuery para eventos y manipulación del DOM
   - Usa LocalStorage para persistencia de datos
   - Usa Bootstrap para modales
===================================================== */

$(document).ready(function () {

    /* =====================================================
       DETECCIÓN DE PÁGINA ACTUAL
       ===================================================== */
    const page = window.location.pathname.split('/').pop();

    /* =====================================================
       SALDO
       ===================================================== */

    function getBalance() {
        return Number(localStorage.getItem('alke_balance')) || 450000;
    }

    function setBalance(value) {
        localStorage.setItem('alke_balance', value);
    }

    /* =====================================================
       MOVIMIENTOS / TRANSACCIONES
       ===================================================== */

    function getTransactions() {
        return JSON.parse(localStorage.getItem('alke_transactions')) || [];
    }

    function saveTransaction(transaction) {
        const transactions = getTransactions();
        transactions.unshift(transaction);
        localStorage.setItem(
            'alke_transactions',
            JSON.stringify(transactions)
        );
    }

    function getToday() {
        return new Date().toLocaleDateString('es-CL', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }

    /* =====================================================
       CONTACTOS
       =====================================================
       Persistencia de contactos para envío de dinero
    ===================================================== */

    function getContacts() {
        return JSON.parse(localStorage.getItem('alke_contacts')) || [];
    }

    function saveContact(contact) {
        const contacts = getContacts();
        contacts.push(contact);
        localStorage.setItem(
            'alke_contacts',
            JSON.stringify(contacts)
        );
    }

    /* =====================================================
       LOGIN
       ===================================================== */
    if (page === 'login.html') {

        $('#loginForm').on('submit', function (e) {
            e.preventDefault();

            const email = $('#email').val().trim();
            const password = $('#password').val().trim();

            if (email === 'usuario@mail.com' && password === '1234') {
                window.location.href = 'menu.html';
            } else {
                alert('Credenciales incorrectas');
            }
        });
    }

    /* =====================================================
       MENU
       ===================================================== */
    if (page === 'menu.html') {

        $('#currentBalance').text(
            getBalance().toLocaleString('es-CL')
        );

        const transactions = getTransactions();
        const tbody = $('#lastTransactions');
        tbody.empty();

        if (transactions.length === 0) {
            tbody.append(
                `<tr>
                    <td colspan="4" class="text-center text-muted">
                        No hay movimientos recientes
                    </td>
                </tr>`
            );
            return;
        }

        transactions.slice(0, 2).forEach(tx => {
            const ingreso = tx.tipo === 'ingreso';

            tbody.append(
                `<tr>
                    <td>${tx.fecha}</td>
                    <td>${tx.descripcion}</td>
                    <td class="fw-bold ${ingreso ? 'text-success' : 'text-danger'}">
                        ${ingreso ? '+$ ' : '-$ '}
                        ${tx.monto.toLocaleString('es-CL')}
                    </td>
                    <td>
                        <span class="badge bg-success-subtle text-success">
                            Completado
                        </span>
                    </td>
                </tr>`
            );
        });
    }

    /* =====================================================
       DEPÓSITO
       ===================================================== */
    if (page === 'deposit.html') {

        $('#displayBalance').text(
            getBalance().toLocaleString('es-CL')
        );

        $('#depositForm').on('submit', function (e) {
            e.preventDefault();

            const amount = Number($('#amount').val());
            if (amount <= 0) return;

            setBalance(getBalance() + amount);

            saveTransaction({
                tipo: 'ingreso',
                descripcion: 'Depósito realizado',
                monto: amount,
                fecha: getToday()
            });

            const modal = new bootstrap.Modal(
                document.getElementById('successModal')
            );
            modal.show();
        });
    }

    /* =====================================================
       ENVIAR DINERO
       ===================================================== */
    if (page === 'sendmoney.html') {

        function updateBalanceDisplay() {
            $('#availableBalanceDisplay').text(
                getBalance().toLocaleString('es-CL')
            );
        }

        updateBalanceDisplay();

        /* ===== CARGAR CONTACTOS GUARDADOS ===== */
        getContacts().forEach(c => {
            $('#contactSelect').append(
                `<option value="${c.name}">
                    ${c.name} (RUT: ${c.rut})
                </option>`
            );
        });

        $('#addContactBtn').on('click', function (e) {
            e.preventDefault();
            $('#newContactForm').slideToggle();
        });

        $('#saveContactBtn').on('click', function () {
            const name = $('#newContactName').val().trim();
            const rut = $('#newContactRut').val().trim();

            if (!name || !rut) {
                showModal('Atención', 'Completa nombre y RUT');
                return;
            }

            saveContact({ name, rut });

            $('#contactSelect').append(
                `<option value="${name}">
                    ${name} (RUT: ${rut})
                </option>`
            );

            $('#contactSelect').val(name);
            $('#newContactName').val('');
            $('#newContactRut').val('');
            $('#newContactForm').slideUp();

            showModal(
                'Contacto agregado',
                'El contacto fue guardado correctamente.'
            );
        });

        $('#sendMoneyForm').on('submit', function (e) {
            e.preventDefault();

            const amount = Number($('#sendAmount').val());
            const contact = $('#contactSelect').val();

            if (!contact) {
                showModal('Atención', 'Debes seleccionar un contacto');
                return;
            }

            if (amount <= 0 || amount > getBalance()) {
                showModal('Error', 'Saldo insuficiente');
                return;
            }

            setBalance(getBalance() - amount);
            updateBalanceDisplay();

            saveTransaction({
                tipo: 'egreso',
                descripcion: 'Transferencia a ' + contact,
                monto: amount,
                fecha: getToday()
            });

            showModal(
                'Transferencia exitosa',
                'Se enviaron $' + amount.toLocaleString('es-CL') + ' a ' + contact,
                true
            );
        });

        function showModal(title, message, redirect = false) {

            $('#modalContent').html(
                `<div class="mb-3">
                    <div class="rounded-circle bg-success d-inline-flex align-items-center justify-content-center"
                         style="width:70px; height:70px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white" viewBox="0 0 16 16">
                            <path d="M13.485 1.929a.75.75 0 0 1 .086 1.058l-7.25 9a.75.75 0 0 1-1.08.02l-3.25-3.25a.75.75 0 1 1 1.06-1.06l2.69 2.69 6.72-8.34a.75.75 0 0 1 1.024-.118z"/>
                        </svg>
                    </div>
                </div>
                <h4 class="fw-bold mb-2">${title}</h4>
                <p class="text-muted mb-4">${message}</p>
                <button class="btn btn-primary px-4" data-bs-dismiss="modal">
                    Aceptar
                </button>`
            );

            const modal = new bootstrap.Modal(
                document.getElementById('statusModal')
            );
            modal.show();

            if (redirect) {
                $('#statusModal').one('hidden.bs.modal', function () {
                    window.location.href = 'menu.html';
                });
            }
        }
    }

    /* =====================================================
       TRANSACCIONES
       ===================================================== */
    if (page === 'transactions.html') {

        const transactions = getTransactions();
        const tbody = $('#transactionTable tbody');
        tbody.empty();

        if (transactions.length === 0) {
            tbody.append(
                `<tr>
                    <td colspan="4" class="text-center text-muted py-4">
                        No hay movimientos registrados
                    </td>
                </tr>`
            );
        }

        transactions.forEach(tx => {
            const ingreso = tx.tipo === 'ingreso';

            tbody.append(
                `<tr class="item-transaccion ${tx.tipo}">
                    <td class="px-4 fw-semibold">${tx.descripcion}</td>
                    <td>${tx.fecha}</td>
                    <td>
                        <span class="badge rounded-pill 
                            ${ingreso ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}">
                            ${ingreso ? 'Ingreso' : 'Egreso'}
                        </span>
                    </td>
                    <td class="text-end px-4 fw-bold 
                        ${ingreso ? 'text-success' : 'text-danger'}">
                        ${ingreso ? '+$ ' : '-$ '}
                        ${tx.monto.toLocaleString('es-CL')}
                    </td>
                </tr>`
            );
        });

        $('.btn-filter').on('click', function () {
            const filter = $(this).data('filter');

            $('.item-transaccion').hide();
            filter === 'all'
                ? $('.item-transaccion').fadeIn()
                : $('.' + filter).fadeIn();
        });
    }

});