import CryptoJS from 'crypto-js';

/**
 * Crypt is a simple encryption/decryption system for UTF-8 strings given a password.
 * Internally, it uses the {@link CryptoJS} library, which in turn negotiates with
 * {@link crypto}. This could change in future, though.
 */
export class Crypt {
    private password: string;

    constructor (password: string) {
        this.password = password;
    }

    encrypt (string: string) {
        return CryptoJS.AES.encrypt(string, this.password).toString();
    }

    decrypt (string: string) {
        let bytes = CryptoJS.AES.decrypt(string, this.password);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}