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

function getImgUrl(filename) {
    return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}

exports.uploadProfileImgToCloudStorage = (req, res, next) => {

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
        req.file.cloudStoragePublicUrl = getImgUrl(uploadedFileName)
        next()
        // res.send(req.file.cloudStoragePublicUrl)
    })

    stream.end(req.file.buffer)
    console.log(req.file.cloudStoragePublicUrl);
}

exports.uploadArticleImgToCloudStorage = (req, res, next) => {

    if (!req.file) return next()

    const uploadedFileName = `articleImage/${nanoid(8)}`;
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
        req.file.cloudStoragePublicUrl = getImgUrl(uploadedFileName)
        next()
        // res.send(req.file.cloudStoragePublicUrl)
    })

    stream.end(req.file.buffer)
    console.log(req.file.cloudStoragePublicUrl);
}