// app/fetchData.js
"use server"; // This directive indicates that this file will only be executed on the server

export async function fetchData(result) {
    "use server";
    const url = `https://world.openfoodfacts.org/api/v3/product/${result}.json`;
    console.log("Fetching data from:", url);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
}