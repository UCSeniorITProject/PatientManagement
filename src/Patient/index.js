const patientService = require("./service");
const patientSchema = require("./schemas");

module.exports = (fastify, options, next) => {
  fastify.delete(
    "/patient",
    { schema: patientSchema.deletePatient },
    patientService.deletePatient
  );
  fastify.patch(
    "/patient/:id",
    { schema: patientSchema.patchPatient },
    patientService.patchPatient
  );
  fastify.get(
    "/patient",
    { schema: patientSchema.getPatientWithFilter },
    patientService.getPatientWithFilter
  );
  fastify.post(
    "/patient",
    { schema: patientSchema.createPatient },
    patientService.createPatient
  );
  next();
};
