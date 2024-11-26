$(document).ready(function() {
    // Carrega os itens do LocalStorage ao iniciar
    loadItems();

    // Evento para adicionar um novo item
    $('#item-form').submit(function(e) {
        e.preventDefault();
        let itemName = $('#item-name').val();
        addItem(itemName);
        $('#item-name').val('');
    });

    // Evento para salvar as alterações no item editado
    $('#edit-form').submit(function(e) {
        e.preventDefault();
        let id = parseInt($('#edit-id').val());
        let name = $('#edit-name').val();
        updateItem(id, name);
        $('#edit-modal').modal('hide');
    });

    // Função para carregar os itens
    function loadItems() {
        let items = getItems();
        $('#item-list').empty();
        $.each(items, function(index, item) {
            $('#item-list').append(
                `<tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>
                        <button class="btn btn-info btn-sm edit-btn" data-id="${item.id}">Editar</button>
                        <button class="btn btn-danger btn-sm delete-btn" data-id="${item.id}">Excluir</button>
                    </td>
                </tr>`
            );
        });
    }

    // Função para obter itens do LocalStorage
    function getItems() {
        let items = localStorage.getItem('items');
        return items ? JSON.parse(items) : [];
    }

    // Função para salvar itens no LocalStorage
    function saveItems(items) {
        localStorage.setItem('items', JSON.stringify(items));
    }

    // Função para adicionar item
    function addItem(name) {
        let items = getItems();
        let id = items.length > 0 ? parseInt(items[items.length - 1].id) + 1 : 1;
        items.push({ id: id, name: name });
        saveItems(items);
        loadItems();
    }

    // Evento para abrir o modal de edição
    $(document).on('click', '.edit-btn', function() {
        let id = parseInt($(this).data('id'));
        let items = getItems();
        let item = items.find(item => item.id === id);
        $('#edit-id').val(item.id);
        $('#edit-name').val(item.name);
        $('#edit-modal').modal('show');
    });

    // Função para atualizar item
    function updateItem(id, name) {
        id = parseInt(id);
        let items = getItems();
        $.each(items, function(index, item) {
            if (item.id === id) {
                item.name = name;
                return false; // break
            }
        });
        saveItems(items);
        loadItems();
    }

    // Evento para excluir item
    $(document).on('click', '.delete-btn', function() {
        if (confirm('Tem certeza que deseja excluir este item?')) {
            let id = parseInt($(this).data('id'));
            deleteItem(id);
        }
    });

    // Função para excluir item
    function deleteItem(id) {
        id = parseInt(id);
        let items = getItems();
        items = items.filter(item => item.id !== id);
        saveItems(items);
        loadItems();
    }
});
