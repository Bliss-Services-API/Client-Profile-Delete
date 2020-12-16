module.exports = (postgresClient, S3Client) => {
    const clientProfileController = require('./ClientProfileController')(postgresClient);
    const clientImageController = require('./ClientProfileImageController')(S3Client);
    const clientMessageController = require('./ClientMessageController')(postgresClient);

    return {
        clientProfileController,
        clientMessageController,
        clientImageController
    };
}