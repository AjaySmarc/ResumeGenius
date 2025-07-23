const API_BASE_URL = 'http://localhost:5000/api/auth'; // Change this if deployed

// Sign Up API Call
export const signup = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Signup Error:', error);
    return { error: 'Signup failed' };
  }
};

// Sign In API Call
export const signin = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Signin Error:', error);
    return { error: 'Signin failed' };
  }
};
