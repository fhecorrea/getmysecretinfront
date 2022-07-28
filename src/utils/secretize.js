import { encode as base64_encode, decode as base64_decode,  } from 'base-64';

const Secretize = {
  encrypt(plainData) {
    return base64_encode("b" + base64_encode(plainData) + "e");
  },
  decrypt(encData) {
    encData = base64_decode(encData);
    let data = base64_decode(encData.substring(0, encData.length - 1));
    console.log("A retornar...", data);
    return data;
  }
};

export default Secretize;