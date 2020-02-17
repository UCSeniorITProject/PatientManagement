const activeEnum = require('../constants/activeEnum');

const patientBeforeSave = {
	patientUserId: {
		type: 'number',
		description: 'The user id of the patient in the database',
	},
	socialSecurityNumber: {
		type: 'string',
		description: 'The social security number of the patient',
	},
	dateOfBirth :{
		type: 'string',
		description: 'The date of birth of the patient',
	},
	gender: {
		type: 'string',
		description: 'The gender of the patient',
		enum: ['M', 'F'],
	},
	address: {
		type: 'string',
		description: 'The street address of the patient',
	},
	city: {
		type: 'string',
		description: 'The city of the patient',
	},
	state: {
		type: 'string',
		description: 'The state that the patient resides in',
	},
	zipCode: {
		type: 'string',
		description: 'The zip code the patient resides in',
	},
	insuranceName: {
		type: 'string',
		description: 'The name of the patient\'s insurance provider',
	},
	insurancePlanNo: {
		type: 'string',
		description: 'The plan number of the patient\'s insurance',
	},
	insuranceCoPayAmount: {
		type: 'string',
		description: 'The co-pay amount of the patient\'s insurance',
	},
	active: {
		type: 'string',
		enum: activeEnum,
		description: 'Whether or not the patient is active',
	},
};

const patientAfterSave = {
	...patientBeforeSave,
	patientId: {
		type: 'string',
		description: 'The id of the patient row',
	},
	createdAt: {
		type: 'string',
		description: 'The date the patient was created',
	},
	updatedAt: {
		type: 'string',
		description: 'The last time the patient was updated',
	},
};

exports.deletePatient = {
  description: 'Deletes a patient with the given ID',
  tags: ['Patient'],
  summary: 'Deletes a patient with the given  ID',
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'number',
        description: 'The ID of the patient to delete',
      },
    },
  },
  exposeRoute: true,
  response: {
    204: {
      description: 'Succesfully deleted the patient',
      type: 'object',
      properties: {
        msg: {
          type: 'string',
          default: 'Succesfully deleted the patient'
        },
      },
    },
    404: {
      description: 'The patient was not found',
      type: 'object',
      properties: {
        msg: {
          type: 'string',
          default: 'The patient was not found',
        },
      }, 
    },
  },
};

exports.patchPatient = {
  description: 'Patches a patient with the given ID',
  tags: ['Patient'],
  summary: 'Patches a patient with the given  ID',
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'number',
        description: 'The ID of the patient to patch',
      },
    },
  },
  body: {
    type: 'object',
    properties: {
      pharmacy: {
        type: 'object',
        properties: patientBeforeSave,
      },
    },
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Succesfully patched the patient',
      type: 'object',
      properties: {
        patient: {
          type: 'string',
          properties: patientAfterSave,
          description: 'The patient that was patched',
        },
      },
    },
    404: {
      description: 'The patient was not found',
      type: 'object',
      properties: {
        msg: {
          type: 'string',
          default: 'The patient was not found',
        },
      }, 
    }
  }
};

exports.getPatientWithFilter = {
  description: 'Gets all patient that match the given filter',
  tags: ['Patient'],
  summary: 'Grabs all patient that match the given filter',
  query: {
    type: 'object',
    properties: patientAfterSave,
  },
  exposeRoute: true,
  response: {
    200: {
      type: 'object',
      description: 'Succesfully got a list of all patients',
      properties: {
        patients: {
          type: 'array',
          items: {
            type: 'object',
            properties: patientAfterSave,
          },
        },
      },
    },
  }
};

exports.createPatient = {
  description: 'Creates a patient with the given body',
  tags: ['Patient'],
  summary: 'Creates a patient and applies the given body',
  body: {
    type: 'object',
    description: 'The patient to create',
    properties: {
      patient: {
        type: 'object',
        properties: patientBeforeSave,
      }
    }
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'The patient to create',
      type: 'object',
      properties: {
        patient: {
          type: 'object',
          properties: patientAfterSave,
          description: 'The patient that was saved',
        },
      },
    },
  },
};