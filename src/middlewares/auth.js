process.loadEnvFile();
//HEADER AUTHENTICATION MIDDLEWARE
export const auth = async (req, res, next) => {
        // Headers
        const publicKeyHeader = process.env.PUBLIC_KEY_HEADER;
        const secretKeyHeader = process.env.SECRET_KEY_HEADER;
    
        // Extract keys from headers
        const publicKey = req.header(publicKeyHeader);
        const secretKey = req.header(secretKeyHeader);
    
        // Check which header is present and validate the corresponding key
        if (publicKey) {
            if (publicKey === process.env.PUBLIC_KEY) {
                return next(); // Public key is valid
            } else {
                return res.status(401).send({ message: 'Invalid public key' });
            }
        }
    
        if (secretKey) {
            if (secretKey === process.env.SECRET_KEY) {
                return next(); // Secret key is valid
            } else {
                return res.status(401).send({ message: 'Invalid secret key' });
            }
        }
    
        // If no recognized headers are present
        res.status(400).send({ message: 'No valid authentication header found' });
};
    

