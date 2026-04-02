

// --- Thêm hàng vào giỏ và thanh toán ---
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
});

function loadComponent(id, file) {
    fetch(file)
        .then(res => {
            if (!res.ok) throw new Error("Không thể tải file: " + file);
            return res.text();
        })
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (id === 'header') updateCartBadge();
        })
        .catch(err => console.error("Lỗi Component:", err));
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('netstore_cart')) || [];
    
    const existingIndex = cart.findIndex(item => item.name === product.name);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            name: product.name,
            price: product.price,
            priceText: product.priceText,
            img: product.img,
            quantity: 1
        });
    }

    localStorage.setItem('netstore_cart', JSON.stringify(cart));
    updateCartBadge();
    alert(`Đã thêm "${product.name}" vào giỏ hàng thành công!`);
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('netstore_cart')) || [];
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const badge = document.querySelector('.cart-count-badge');
    if (badge) {
        badge.innerText = totalQty;
        badge.style.display = totalQty > 0 ? "block" : "none";
    }
}

function processCheckout() {
    const cart = JSON.parse(localStorage.getItem('netstore_cart')) || [];

    if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống. Vui lòng chọn sản phẩm trước!");
        window.location.href = "sanpham.html";
        return;
    }

    window.location.href = "thanhtoan.html";
}

function confirmOrder() {
    const name = document.getElementById('fullname')?.value;
    const phone = document.getElementById('phone')?.value;
    const address = document.getElementById('address')?.value;

    if (!name || !phone || !address) {
        alert("Vui lòng điền đầy đủ thông tin giao hàng!");
        return;
    }

    alert(`Cảm ơn ${name}! Đơn hàng của bạn đã được đặt thành công.`);
    
    localStorage.removeItem('netstore_cart');
    window.location.href = "index.html"; 
}