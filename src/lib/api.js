const API_URL = 'https://spainweb.picklebracket.pro/api'; // cambia por tu dominio Laravel



export const fetchRoutes = async () => {
    const res = await fetch(`${API_URL}/routes`);
    return res.json();
};

export const fetchPackages = async () => {
    const res = await fetch(`${API_URL}/packages`);
    return res.json();
};

export const fetchBlogPosts = async () => {
    const res = await fetch(`${API_URL}/blog-posts`);
    return res.json();
};

export const sendReservation = async (data) => {
    const res = await fetch(`${API_URL}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
};