const { vehiculoModel } = require('../db/database');
const vehiculoSchema = require('../Schema/vehiculo.schema');

const verificaVehiculo = {};

verificaVehiculo.verificaParametrosPaginacion = async (req, res, next) => {
    // OJO OJO OJO
    // let limit = req.query.limit;
    let page = req.query.page;
    let paginationMin = req.query.paginationMin;
    let paginationMax = req.query.paginationMax;
    
    // console.log(paginationMin, paginationMax);

    try {
        // SE VERIFICA SI SE INGRESO EL PARAMETRO LIMIT (CANTIDAD DE REGISTROS POR PAGINA)
        /* if (limit !== undefined) {
            // SE VERIFICA SI EL PARAMETRO LIMIT ES UN NUMERO VALIDO
            if (isNaN(limit) || limit.length <= 0 ) {
                return res.json({ status: 400, error: true, message: 'El parametro Limit debe ser un numero valido', results: "" });
            }

            // SE VERIFICA SI EL PARAMETRO LIMIT ES UN NUMERO ENTERO MAYOR A CERO
            if (parseInt(limit) <= 0) {
                return res.json({ status: 400, error: true, message: 'El parametro Limit debe ser un numero entero mayor a Cero', results: "" });
            }
        }else {
            // SE COLOCA VALOR POR DEFECTO AL PARAMETRO LIMIT
            limit = 10;
        } */
        
        // SE VERIFICA SI SE INGRESO EL PARAMETRO PAGE (PAGINA ACTUAL)
        if (page !== undefined) {
            // SE VERIFICA SI EL PARAMETRO PAGE ES UN NUMERO VALIDO
            if (isNaN(page) || page.length <= 0 ) {
                return res.json({ status: 400, error: true, message: 'El parametro Page debe ser un numero valido', results: "" });
            }

            // SE VERIFICA SI EL PARAMETRO PAGE ES UN NUMERO ENTERO MAYOR A CERO
            if (parseInt(page) <= 0) {
                return res.json({ status: 400, error: true, message: 'El parametro Page debe ser un numero entero mayor a Cero', results: "" });
            }
        }else {
            // SE COLOCA VALOR POR DEFECTO AL PARAMETRO PAGE
            page = 1;
        }

        // SE VERIFICA SI SE INGRESO EL PARAMETRO PAGINATION MIN (VALOR MINIMO DEL ARRAY DE PAGINACION)
        if (paginationMin !== undefined) {
            // SE VERIFICA SI EL PARAMETRO PAGINATION MIN ES UN NUMERO VALIDO
            if (isNaN(paginationMin) || paginationMin.length <= 0 ) {
                return res.json({ status: 400, error: true, message: 'El parametro Pagination Min debe ser un numero valido', results: "" });
            }

            // SE VERIFICA SI EL PARAMETRO PAGINATION MIN ES UN NUMERO ENTERO MAYOR A CERO
            if (parseInt(paginationMin) <= 0) {
                return res.json({ status: 400, error: true, message: 'El parametro Pagination Min debe ser un numero entero mayor a Cero', results: "" });
            }
        }else {
            // SE COLOCA VALOR POR DEFECTO AL PARAMETRO PAGINATION MIN
            paginationMin = 0;
        }

        // SE VERIFICA SI SE INGRESO EL PARAMETRO PAGINATION MAX (VALOR MAXIMO DEL ARRAY DE PAGINACION)
        if (paginationMax !== undefined) {
            // SE VERIFICA SI EL PARAMETRO PAGINATION MAX ES UN NUMERO VALIDO
            if (isNaN(paginationMax) || paginationMax.length <= 0 ) {
                return res.json({ status: 400, error: true, message: 'El parametro Pagination Max debe ser un numero valido', results: "" });
            }

            // SE VERIFICA SI EL PARAMETRO PAGINATION MAX ES UN NUMERO ENTERO MAYOR A CERO
            if (parseInt(paginationMax) <= 0) {
                return res.json({ status: 400, error: true, message: 'El parametro Pagination Max debe ser un numero entero mayor a Cero', results: "" });
            }
        }else {
            // SE COLOCA VALOR POR DEFECTO AL PARAMETRO PAGINATION MAX
            paginationMax = 0;
        }

        // SE VERIFICA QUE EL PARAMETRO PAGINATION MIN NO SEA MAYOR AL PARAMETRO PAGINATION MAX
        if (parseInt(paginationMin) > parseInt(paginationMax)) {
            return res.json({ status: 400, error: true, message: 'El parametro Pagination Min no puede ser mayor al parametro Pagination Max', results: "" });
        }

        // SE AGREGRAN LOS PARAMETROS COMO PROPIEDADES
        // req.query.limit = limit;
        req.query.page = page;
        req.query.paginationMin = paginationMin;
        req.query.paginationMax = paginationMax;
        
        next();

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

verificaVehiculo.verificaDatosRegistroVehiculo = async (req, res, next) => {
    const { nombre } = req.body;
    
    try {
        const { error } = await vehiculoSchema.validaSchema.validate(req.body);

        if (error) {
            return res.json({ status: 400, error: true, message: error.details[0].message, results: "" });
        }

        // VERIFICAR SI EL NOMBRE YA EXISTE EN LA BD
        const vehiculoFind = await vehiculoModel.findOne({ where: { nombre : nombre } });

        if (vehiculoFind) {
            return res.json({ status: 400, error: true, message: 'Nombre Ya Existe', results: "" });
        }

        next();

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

verificaVehiculo.verificaDatosUpdateVehiculo = async (req, res, next) => {
    const { nombre, fabricante, modelo, tipo, color, chasis, combustible } = req.body;
    const { id } = req.params;
    
    try {
        const { error } = await vehiculoSchema.validaSchema.validate(req.body);

        if (error) {
            // VERIFICAR QUE CAMPOS SE INGRESARON PARA COMPROBAR SI YA EXISTEN EN LA BD
            if ((nombre !== undefined && error.details[0].context.key == 'nombre') || 
                (fabricante !== undefined && error.details[0].context.key == 'fabricante') || 
                (modelo !== undefined && error.details[0].context.key == 'modelo') ||
                (tipo !== undefined && error.details[0].context.key == 'tipo') ||
                (color !== undefined && error.details[0].context.key == 'color') ||
                (chasis !== undefined && error.details[0].context.key == 'chasis') ||
                (combustible !== undefined && error.details[0].context.key == 'combustible')) {
                    return res.json({ status: 400, error: true, message: error.details[0].message, results: "" });
            }
        }

        // SI SE INGRESO EL NAME SE VERIFICA SI YA EXISTE EN LA BD PARA OTRA PELICULA
        if (nombre !== undefined) {
            const vehiculoFind = await vehiculoModel.findOne({ where: { nombre : nombre } });

            if (vehiculoFind) {
                if (id != vehiculoFind.id) {
                    return res.json({ status: 400, error: true, message: 'Nombre Ya Existe', results: "" });
                }
            }
        }

        next();

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

module.exports = verificaVehiculo;