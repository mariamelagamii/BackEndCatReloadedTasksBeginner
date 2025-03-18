async function calculateTotalPrice() {
    const cart = [
        { id: 1, quantity: 3 },
        { id: 4, quantity: 4 },
        { id: 3, quantity: 5 }
    ];
    let totalPrice = 0;
    for (let item of cart) {
        const response = await fetch(`https://fakestoreapi.com/products/${item.id}`);
        const product = await response.json();
        totalPrice += product.price * item.quantity;
    }
    console.log(`Total Price: $${totalPrice.toFixed(2)}`);
}
calculateTotalPrice();