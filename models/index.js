'use strict';

/**
 * 
 * Returns all the Models in the Server
 * 
 * @param {Sequelize} postgresClient Sequelize Database Connection Object
 */
module.exports = (postgresClient) => {
    const clientProfileModel = require('./ClientProfileModel')(postgresClient);
    const clientCredentialsModel = require('./ClientCredentialsModel')(postgresClient);
    const clientPaymentHistoryModel = require('./ClientPaymentHistoryModel')(postgresClient);
    const clientMessageModel = require('./ClientMessageModel')(postgresClient);

    clientCredentialsModel.belongsTo(clientProfileModel, {foreignKey: 'client_id'});    
    clientProfileModel.hasOne(clientCredentialsModel, {foreignKey: 'client_id'});

    clientPaymentHistoryModel.belongsTo(clientProfileModel, {foreignKey: 'client_id'});    
    clientProfileModel.hasOne(clientPaymentHistoryModel, {foreignKey: 'client_id'});

    clientMessageModel.belongsTo(clientProfileModel, {foreignKey: 'client_id'});    
    clientProfileModel.hasOne(clientMessageModel, {foreignKey: 'client_id'});

    return {
        clientProfileModel,
        clientCredentialsModel,
        clientPaymentHistoryModel,
        clientMessageModel
    };
};