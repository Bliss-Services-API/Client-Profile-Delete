'use strict';

/**
 * 
 * Controller for Handling Operations related to the Transient Token.
 * 
 * @param {Sequelize Object} postgresClient Client to use for Postgres Database Operations
 * 
 */
module.exports = (postgresClient) => {
    
    //Importing Modules
    const model = require('../models');

    //Initializing Variables
    const Models = model(postgresClient);
    const clientProfileModel = Models.clientProfileModel;
    const clientCredentialModel = Models.clientCredentialsModel;
    const clientPaymentHistoryModel = Models.clientPaymentHistoryModel;

    const deleteProfileData = async (clientId) => {
        await clientPaymentHistoryModel.delete({ where: { client_id: clientId } });
        await clientCredentialModel.delete({ where: { client_id: clientId } });
        await clientProfileModel.delete({ where: { client_id: clientId } });

        return true;
    };

    return {
        deleteProfileData
    };
}