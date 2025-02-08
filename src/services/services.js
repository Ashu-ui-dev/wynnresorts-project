// Get all countries
export const getCountries = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (!response.ok) throw new Error('Failed to fetch countries');
    
    const data = await response.json();
    return data.map(country => ({
      code: country.cca2,
      name: country.name.common,
      flag: country.flags.svg,
      flagIcon: country.flag,
      callingCode: country.idd?.root 
        ? `${country.idd.root}${country.idd.suffixes?.[0] || ''}`
        : undefined
    }))
    .filter(country => country.callingCode)
    .sort((a, b) => a.name.localeCompare(b.name));
    
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

// Register user
export const registerUser = async (formData) => {
  try {
    const response = await fetch('your-api-endpoint/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) throw new Error('Registration failed');
    return await response.json();
    
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
}; 