import React, { useState, useEffect } from 'react';
import { getItems, createItem, updateItem, deleteItem } from './ItemService';

const App = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const response = await getItems();
        setItems(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingItem) {
            await updateItem(editingItem._id, { name, description });
            setEditingItem(null);
        } else {
            await createItem({ name, description });
        }
        setName('');
        setDescription('');
        fetchItems();
    };

    const handleEdit = (item) => {
        setName(item.name);
        setDescription(item.description);
        setEditingItem(item);
    };

    const handleDelete = async (id) => {
        await deleteItem(id);
        fetchItems();
    };

    return (
        <div>
            <h1>CRUD App</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">{editingItem ? 'Update' : 'Add'} Item</button>
            </form>
            <ul>
                {items.map((item) => (
                    <li key={item._id}>
                        <strong>{item.name}</strong>: {item.description}
                        <button onClick={() => handleEdit(item)}>Edit</button>
                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
