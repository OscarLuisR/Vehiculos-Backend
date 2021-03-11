const joi = require('joi');
const message = require('../lib/message');

const movilSchema = {};

//movilSchema.statics.validaSchema = joi.object({
movilSchema.validaSchema = joi.object({
    nombre: joi.string()
        .trim()
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":  
                        err.message = "Debe ingresar un Nombre";
                        break;
                    case "string.empty":
                        err.message = "Debe ingresar un Nombre Valido";                                             
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),

    fabricante: joi.string()
        .trim()
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":
                        err.message = "Debe ingresar un Fabricante";                        
                        break;
                    case "string.empty":                        
                        err.message = "Debe ingresar un Fabricante Valido";                        
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),

    modelo: joi.string()
        .trim()
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":
                        err.message = "Debe ingresar un Modelo";                        
                        break;
                    case "string.empty":                        
                        err.message = "Debe ingresar un Modelo Valido";                        
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),

    tipo: joi.string()
        .trim()
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":
                        err.message = "Debe ingresar un Tipo";                        
                        break;
                    case "string.empty":                        
                        err.message = "Debe ingresar un Tipo Valido";                        
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),

    color: joi.string()
        .trim()
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":
                        err.message = "Debe Color un Tipo";                        
                        break;
                    case "string.empty":                        
                        err.message = "Debe Color un Tipo Valido";                        
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),

    chasis: joi.string()
        .trim()
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":
                        err.message = "Debe Color un Chasis";                        
                        break;
                    case "string.empty":                        
                        err.message = "Debe Color un Tipo Chasis";                        
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),

    combustible: joi.string()
        .trim()
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":
                        err.message = "Debe Color un Combustible";                        
                        break;
                    case "string.empty":                        
                        err.message = "Debe Color un Tipo Combustible";                        
                        break;
                    default:
                        break;
                }
            });

            return errors;
        })
});

module.exports = movilSchema;
