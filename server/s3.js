const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

const fs = require("fs");
const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region:'eu-west-1'   
});

exports.s3Email = (name, to, body) => ses.sendEmail({
    Source: 'root.tiara@spicedling.email',
    Destination: {
        ToAddresses:[to]
    },
    Message: {
        Body:{
            Text:{
                Data: `${name}, this is your verification code ${body}`
            }
        },
        Subject:{
            Data: 'welcome to our network'
        }
    }
}).promise().then(
    ()=>console.log('email sent')
).catch(
    err => console.log ('email err', err)
);
exports.s3Upload = (req, res, next) => {
    if (!req.file) {
        console.log("multer fail");
        return res.sendStatus(500);
    }

    const { filename, mimetype, size, path } = req.file;

    s3.putObject({
        Bucket: "spicedling",
        ACL: "public-read",
        Key: filename,
        Body: fs.createReadStream(path),
        ContentType: mimetype,
        ContentLength: size,
    })
        .promise()
        .then(function () {
            next();
            fs.unlink(path, () => {});
            console.log("amazon has it");
        })
        .catch((err) => {
            console.log(err);
        });
};
