// API URL
const API_URL = 'http://localhost:5000/api/items';

// DOM Elements
const itemForm = document.getElementById('item-form');
const itemsList = document.getElementById('items-list');
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const submitBtn = document.getElementById('submit-btn');

let editingItemId = null;

// Fetch and Display Items
async function fetchItems() {
    const response = await fetch(API_URL);
    const items = await response.json();

    itemsList.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>${item.name}</strong>: ${item.description}</span>
            <div>
                <button class="edit" onclick="editItem('${item._id}', '${item.name}', '${item.description}')">Edit</button>
                <button onclick="deleteItem('${item._id}')">Delete</button>
            </div>
        `;
        itemsList.appendChild(li);
    });
}

// Add or Update Item
itemForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = nameInput.value;
    const description = descriptionInput.value;

    if (editingItemId) {
        // Update Item
        await fetch(`${API_URL}/${editingItemId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description }),
        });
        editingItemId = null;
        submitBtn.textContent = 'Add Item';
    } else {
        // Add Item
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description }),
        });
    }

    nameInput.value = '';
    descriptionInput.value = '';
    fetchItems();
});

// Edit Item
function editItem(id, name, description) {
    editingItemId = id;
    nameInput.value = name;
    descriptionInput.value = description;
    submitBtn.textContent = 'Update Item';
}

// Delete Item
async function deleteItem(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchItems();
}

// Initial Fetch
fetchItems();
