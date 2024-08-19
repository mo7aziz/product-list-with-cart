const API = "./data.json";
async function getData() {
  try {
    let res = await fetch(API);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    let data = await res.json().then((data) => {
      return data;
    });
    return data;
  } catch (err) {
    console.error("Failed to fetch data:", err);
    return null;
  }
}

export { getData };
