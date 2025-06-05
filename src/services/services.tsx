// Define the return shape of a country object
export type Country = {
  code: string;
  name: string;
  flag: string;
  flagIcon: string;
  callingCode: string;
};

// Fetch all countries and map to custom structure
export const getCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
    if (!response.ok) throw new Error('Failed to fetch countries');

    const data = await response.json();

    return data
      .map((country: any) => ({
        name: country.name.common,
      }))
      .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

// Define registration form structure
export type RegisterFormData = {
  firstName: string;
  lastName: string;
  gender: string;
  country: string;
  email: string;
  phoneNumber: string;
  termsAccepted: boolean;
};

// Register a user
export const registerUser = async (
  formData: RegisterFormData
): Promise<any> => {
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
