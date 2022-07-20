const Joi = require('joi');

const email = Joi.string().email({
	minDomainSegments: 2,
	tlds: { allow: ["com", "net"] },
});

const pin = Joi.number().min(10000).max(999999).required();
const severity = Joi.number().min(1).max(5).required();
const newPassword = Joi.string().min(3).max(30).required();

const phone = Joi.number().min(400000001).max(500000001).required();
const shortString = Joi.string().min(2).max(50);
const longString = Joi.string().min(2).max(1000);
const datee = Joi.date();




const resetPasswordReqValidation = (req, res, next) => {
    const schema = Joi.object({ email });
	const value = schema.validate(req.body);
	if (value.error) {
		return res.json({ status: "error", message: value.error.message });
	}
	next();
};



const updatePasswordValidation = (req, res, next) => {
	const schema = Joi.object({ email, pin, newPassword });
	const value = schema.validate(req.body);
	if (value.error) {
		return res.json({ status: "error", message: value.error.message });
	}
	next();
};



const createNewTicketValidation = (req, res, next) => {
	const schema = Joi.object({
		title: shortString.required(),
		description: longString.required(),
		severity: severity
	
	});

	console.log(req.body);
	const value = schema.validate(req.body);
	if (value.error) {
		return res.json({ status: "error", message: value.error.message });
	}
	next();
};



const replyTicketMessageValidation = (req, res, next) => {
	const schema = Joi.object({
		sender: shortString.required(),
		message: longString.required(),
	});

	console.log(req.body);
	const value = schema.validate(req.body);

	if (value.error) {
		return res.json({ status: "error", message: value.error.message });
	}
	next();
};



module.exports = {
	resetPasswordReqValidation,
	updatePasswordValidation,
	createNewTicketValidation,
	replyTicketMessageValidation

};