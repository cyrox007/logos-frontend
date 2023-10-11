import CryptoJS from "crypto-js";
import config from "@/Config";

class hashMethods {
    static passwordToHash (password) {
        var apiSecret = config.API_SECTER_WORD;
    
        var key = CryptoJS.enc.Base64.parse(apiSecret);
        var prehash = CryptoJS.enc.Utf8.parse(password);
        var hash = CryptoJS.HmacSHA256(prehash, key);
        /* var signature = hash.toString(CryptoJS.enc.Base64); */
        
        return hash.toString();
    }
}

export default hashMethods;