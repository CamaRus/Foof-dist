//Функции приема данных от сервера
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

//Получаем данные
const getResource = async (url) => {
    const res = await fetch(url);
    
    if (!res.ok) {
        throw new Error(`Could nit fetch ${url}, status: ${res.status}`);
    }
    
    return await res.json();
    };

export {postData};
export {getResource};