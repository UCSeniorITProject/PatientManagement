const {boomify} = require('boom');
const Patient = require('./PatientModel');

exports.createPatient = async (req, reply) => {
	try {
		const patient = Patient.build(req.body.patient);

		const savedPatient = await patient.save();
		return {patient: savedPatient.dataValues}
	} catch (err) {
		throw boomify(err);
	}
};

exports.getPatientWithFilter = async (req, reply) => {
	try {
		const patients = Patient.findAll(
			{
				where: req.query,
			}
		);

		return {patients: patients.map(x => x.dataValues)};
	} catch (err) {
		throw boomify(err);
	}
};

exports.patchPatient = async (req, reply) => {
	try {
		if(Object.entries(req.body.patient).length === 0){
      const patient = await Patient.findOne({
        where: {
          id: req.params.id,
        }
      });

      return {patient: patient.dataValues};
    }

    const upatedPatientCount = await Patient.update(
      req.body.patient,
      {
        where: {
          id: req.params.id,
        },
        individualHooks: true,
      }
    );

    if(upatedPatientCount[1].length === 0){
      return reply
                .code(404)
                .send();
    }

    const updatedPatient = await Patient.findOne({
      where: {
        id: req.params.id,
      },
    });

    return {patient: updatedPatient.dataValues};
	} catch (err) {
		throw boomify(err);
	}
};

exports.deletePatient = async (req, reply) => {
	try {
		const patientDeletedCount = await Patient.destroy({
			where: {
				id: req.params.id,
			},
		});

		if(patientDeletedCount === 0){
			return reply
								.code(404)
								.send({
									msg: 'Patient could not be found',
								});
		}

		return reply
							.code(204)
							.send();
	} catch (err) {
		throw boomify(err);
	}
};