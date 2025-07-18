const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getSuburbs = async (postcode: String) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/postcode?postcode=${postcode}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const result = await response.json();
    return result;
  } catch (error) {}
};

export const getPostCodeBySuburbAndState = async (
  suburb: String,
  state: String
) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/postcode/find?suburb=${suburb}&state=${state}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const result = await response.json();
    return result;
  } catch (error) {}
};

export const addPostCodeAndSuburb = async (
  postcode: String,
  suburb: String
) => {
  try {
    const response = await fetch(API_BASE_URL + "/postcode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postcode: postcode,
        suburb: suburb,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
      return false;
    }

    if (response.status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {}
};
