'use strict';

module.exports = (postgresClient) => {

    const models = require('../models');

    const Model = models(postgresClient);
    const clientMessageModel = Model.clientMessageModel;

    const deleteProfileSync = async (clientId) => {
        await clientMessageModel.destroy({ where: { client_id: clientId }});
        return true;
    };

    return {
        deleteProfileSync
    };
}