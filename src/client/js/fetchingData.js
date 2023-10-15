export async function fetching(url, data) {
  let response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Has error: ", error);
  }
}
