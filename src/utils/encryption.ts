import CryptoJS from 'crypto-js';

export const encryptFile = async (file: File): Promise<{ encryptedData: string; password: string }> => {
  const password = CryptoJS.lib.WordArray.random(16).toString();
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      if (e.target?.result) {
        const wordArray = CryptoJS.lib.WordArray.create(e.target.result as ArrayBuffer);
        const encryptedData = CryptoJS.AES.encrypt(wordArray, password).toString();
        resolve({ encryptedData, password });
      }
    };
    
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

export const decryptFile = (encryptedData: string, password: string): ArrayBuffer => {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, password);
  return decrypted.toString(CryptoJS.enc.Utf8);
};