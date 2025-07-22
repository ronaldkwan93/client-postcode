const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getSuburbs = async (postcode: String, jwt: String) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/postcode?postcode=${postcode}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
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
      `${API_BASE_URL}/postcode/find?suburb=${suburb}&state=${state}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
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
  suburb: String,
  jwt: String
) => {
  try {
    const response = await fetch(API_BASE_URL + "/postcode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        postcode: postcode,
        suburb: suburb,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    if (response.status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {}
};

export const registerUser = async (
  name: String,
  email: String,
  password: String
) => {
  try {
    const response = await fetch(API_BASE_URL + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.status || "Registration failed");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const loginUser = async (email: String, password: String) => {
  try {
    const response = await fetch(API_BASE_URL + "/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    });

    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error login user");
  }
};
