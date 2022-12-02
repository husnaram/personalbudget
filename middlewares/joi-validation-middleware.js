export const validate = (schema) => (req, res, next) => {
	const { error } = schema.validate(req.body);
	if (error) {
		res
			.status(422)
			.send({
				success: false,
				message: error.details[0].message,
				data: []
			});
	} else {
		next();
	}
}