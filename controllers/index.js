const res = require("express/lib/response");
const { Cert, Study } = require("../models")


const getAllCert = async (req, res) => {
    try {
        const certs = await Cert.find({})
        return res.status(200).json({ certs })
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getByOrg = async (req, res) => {
    try {
        const organization = await Cert.find({ organization: req.params.organization})
        return res.status(200).json({ organization })
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getLikeName = async (req, res) => {
    try {
    const name = await Cert.find({'name': {'$regex': `${req.params.name}`, '$options': 'i'}}) 
        return res.status(200).json({ name })
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getId = async (req, res) => {
    try {
    const id = await Cert.find({ _id: req.params._id }) 
        return res.status(200).json({ id })
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const postStudy = async (req, res) => {
    try {
        const study = new Study({
            displayName: req.body.displayName,
            url: req.body.url,
            cert: req.params._id
        })
        await study.save()
        // const cert = await Cert.findById({ _id: req.params._id })
        //     // .populate({
        //     //     path: "learningresources",
        //     //     select: study
        //     // })
        //     // console.log(cert)
        // await cert.save()
        return res.status(200).json({ study })
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllCert,
    getByOrg,
    getLikeName,
    getId,
    postStudy
}