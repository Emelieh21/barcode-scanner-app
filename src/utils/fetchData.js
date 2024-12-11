// Function to call openfoodfacts
export async function fetchData(result) {
    const url = `https://world.openfoodfacts.org/api/v3/product/${result}.json`;
    console.log("Fetching data from:", url);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
}