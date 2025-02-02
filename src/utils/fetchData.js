export async function fetchData(url) {
    console.log("Fetching data from:", url);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
}

export async function fetchProduct(result) {
    const url = `https://world.openfoodfacts.org/api/v3/product/${result}.json`;
    return fetchData(url);
}
