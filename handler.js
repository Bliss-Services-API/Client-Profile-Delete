'use strict';

const postgresClient = require('./connections/PostgresConnection')('production');
const crypto = require('crypto');
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});

postgresClient.authenticate()
.then(() => console.log('Database Connected Successfully'))
.catch((err) => console.log(`Database Connection Failed! ERR:${err}`));

module.exports.app = async (event, context) => {
    
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        const S3Client = new AWS.S3({apiVersion: '2006-03-01'});
        const MagicWord = process.env.MAGIC_WORD;

        const Controller = require('./controller')(postgresClient, S3Client);
        const clientProfileController = Controller.clientProfileController;
        const clientImageController = Controller.clientImageController;
        const clientMessageController = Controller.clientMessageController;
    
        const clientEmail = event.queryStringParameters.client_email;

        const clientEmailSalted = clientEmail + "" + MagicWord;
        const clientId = crypto.createHash('sha256').update(clientEmailSalted).digest('base64');
        
        const clientProfileImageName = `${clientId}.png`;

        await clientProfileController.deleteProfileData(clientId);
        await clientImageController.deleteClientImage(clientProfileImageName);
        await clientMessageController.deleteProfileSync(clientId);

        const response = {
            MESSAGE: 'DONE',
            RESPONSE: 'Client Deleted Successfully!',
            CODE: 'CLIENT_DELETED_SUCCESSFULLY'
        };

        return {
            statusCode: 200,
            body: JSON.stringify(response)
        };

    } catch(err) {
        console.error(`ERR: ${JSON.stringify(err.message)}`);

        const response = {
            ERR: err.message,
            RESPONSE: 'Client Deletion Failed',
            CODE: 'CLIENT_DELETION_FAILED'
        };

        return {
            statusCode: 400,
            body: JSON.stringify(response)
        };
    }
}