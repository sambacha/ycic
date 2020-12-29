import axios from 'axios';
const URL = "https://ijj5xljd05.execute-api.eu-central-1.amazonaws.com/dev/watch";

export const postNewWatcher = async (data) => {
  try {
    const resp = await axios.post(URL, {
      address: data.address,
      email: data.email,
      events: [
        { name: data.event.name, signature: data.event.signature, counter: 2 }
      ]
    });
    switch (resp.status) {
      case 200:
        return true;
      default:
        throw new Error('API ERROR' + resp.status);
    }
  } catch (error) {
    throw error;
  }
};