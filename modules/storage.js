'use strict'
const { Storage } = require('@google-cloud/storage')
const fs = require('fs')
const { nanoid } = require("nanoid");
require('dotenv').config();

const path = require('path');
const pathKey = path.resolve('./service.json')

const cloudStorage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: pathKey
})

const bucketName = "skinective"
const bucket = cloudStorage.bucket(bucketName)

function getProfileImgUrl(filename) {
    return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}

exports.uploadToCloudStorage = (req, res, next) => {
    console.log(pathKey);
    console.log("sampe method upload");
    if (!req.file) return next()

    const uploadedFileName = `usersProfileImage/${nanoid(8)}`;
    const uploadedFile = bucket.file(uploadedFileName)

    const stream = uploadedFile.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    })

    stream.on('error', (err) => {
        req.file.cloudStorageError = err
        next(err)
    })

    stream.on('finish', () => {
        req.file.cloudStorageObject = uploadedFileName
        req.file.cloudStoragePublicUrl = getProfileImgUrl(uploadedFileName)
        next()
        // res.send(req.file.cloudStoragePublicUrl)
    })

    stream.end(req.file.buffer)
    console.log(req.file.cloudStoragePublicUrl);
    console.log("akhir method upload");
}

