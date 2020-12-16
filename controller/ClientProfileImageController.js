'use strict'

/**
 * 
 * Controller for Handling Celeb Images in the AWS S3 Bucket.
 * 
 * @param {Sequelize} databaseConnection Sequelize Object, containing the connection for the Database
 * @param {aws-sdk object} S3Client Object containing the AWS S3 reference
 * 
 */
module.exports = (S3Client) => {

    //Initializing Variables
    const clientImageBucket = process.env.CLIENT_IMAGE_BUCKET;
    
    /**
     * 
     * Function to Delete Celeb Image from the S3 Bucket, only if the profile
     * doesn't exists corresponding to the image of the celeb
     * 
     * @param {string} imageFileName Name of the Celeb Image File (.png)
     * @returns {Promise} Resolve contains JSON (image has been deleted), and reject contains error
     * or String (Error Message, as why the image couldn't be deleted)
     * 
     */
    const deleteClientImage = async imageFileName => {
        return new Promise(async (resolve, reject) => {
            try {
                const imageParam = {
                    Bucket: clientImageBucket,
                    Key: imageFileName
                };

                S3Client.deleteObject(imageParam, (err, info) => {
                    if(err){
                        return reject(err);
                    } else {
                        return resolve({
                            Message:'DONE',
                            Deleted: true
                        });
                    }
                });
            } catch(err) {
                return reject(err);
            };
        })
    };

    return {
        deleteClientImage
    };
}