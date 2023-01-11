import { Crypt } from "./Crypt"
import * as crypto from 'crypto';

let password = crypto.randomBytes(20).toString('hex')

// test_string_across_versions is an encrypted copy of the string "test_string_across_versions",
// with the password "test_string_across_versions", to ensure compatibility
let test_string_across_versions = "U2FsdGVkX19OAdhVTc57P2hvvgxaJNN/FXobnFzwX4UsBnE1H1ZWxokw74Zp/XvG";

test('can encrypt and decrypt OK', () => {
    let crypt = new Crypt(password);
    let randomString = crypto.randomBytes(20).toString('hex')

    let crypted = crypt.encrypt(randomString);
    expect(crypt.decrypt(crypted)).toEqual(randomString);
})

test('retains compatibility', () => {
    let crypt = new Crypt("test_string_across_versions");
    expect(crypt.decrypt(test_string_across_versions)).toEqual("test_string_across_versions");
})
