const Joi = require('joi');

const email = Joi.string().email({
	minDomainSegments: 2,
	tlds: { allow: ["com", "net"] },
});

const pin = Joi.number().min(10000).max(999999).required();
const phone = Joi.number().min(400000001).max(500000001).required();
const newPassword = Joi.string().min(3).max(30).required();

const shortString = Joi.string().min(2).max(50);
const longString = Joi.string().min(2).max(1000);
const datee = Joi.date();


const resetPaswordReqValidation = (req, res, next) => {
    const schema = joi.object({email});
    const value = schema.validate(req.body)

    if(value.error){
        return res.status(400).json({status:"error", message: value.error.message});
    }
    next();
}



const updatePasswordValidation = (req, res, next) => {
	const schema = Joi.object({ email, pin, newPassword });

	const value = schema.validate(req.body);
	if (value.error) {
		return res.json({ status: "error", message: value.error.message });
	}
	next();
};