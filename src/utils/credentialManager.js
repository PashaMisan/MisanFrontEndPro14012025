import jwtEncode from "jwt-encode";

const credentialManager = {
    USERNAME: 'admin',
    PASSWORD: '12345',

    generateToken(username, password) {
        return jwtEncode(username, password);
    },

    getValidToken() {
        return this.generateToken(this.USERNAME, this.PASSWORD);
    },

    isValidToken(token) {
        return this.getValidToken() === token;
    }
}

export default credentialManager;