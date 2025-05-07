const storage = {
    storageKey: 'cartItems',

    getItems() {
        const items = localStorage.getItem(this.storageKey);
        return items ? JSON.parse(items) : [];
    },

    saveItems(items) {
        localStorage.setItem(this.storageKey, JSON.stringify(items));
    },

    clear() {
        localStorage.removeItem(this.storageKey);
    }
};

export default storage;
