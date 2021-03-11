const { vehiculoModel } = require('../db/database');

/*
const faker = require('faker');

let newVehiculo;

for (let index = 1; index <= 300; index++) {
    newVehiculo = {
        nombre: faker.vehicle.vehicle(),
        fabricante: faker.vehicle.manufacturer(),
        modelo: faker.vehicle.model(),
        tipo: faker.vehicle.type(),
        color: faker.vehicle.color(),
        chasis: faker.vehicle.vin(),
        combustible: faker.vehicle.fuel()
    };    

    await vehiculoModel.create(newVehiculo);
}

res.send('300 REGISTROS CREADOS');
*/

const vehiculoCtrl = {};

vehiculoCtrl.getVehiculos = async (req, res) => {
    try {
        // OJO OJO OJO
        const { /*limit,*/ page, paginationMin, paginationMax } = req.query;
        
        let max = 0, min = 0;
        let pagination = [];

        // const results = await vehiculoModel.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] }});
        const results = await vehiculoModel.paginate({
            paginate: 10, 
            page: parseInt(page),
            attributes: ['id', 'nombre', 'fabricante', 'modelo', 'tipo', 'color', 'chasis', 'combustible']
        });

        if (parseInt(paginationMin) > 0 && parseInt(paginationMax) > 0) {
            if ( results.pages <= 10 ){
                min = 1;
                max = results.pages;
            }else {
                if ( parseInt(page) >= parseInt(paginationMin) && parseInt(page) <= parseInt(paginationMax) ) {
                    min = parseInt(paginationMin);
                    max = parseInt(paginationMax);
                }else if (parseInt(page) > parseInt(paginationMax)) {
                    min = (parseInt(page) - 10 + 1);
                    max = parseInt(page);
                }else if (parseInt(page) < parseInt(paginationMin)) {
                    min = parseInt(page);
                    max = (parseInt(page) + 10) - 1;
                }
            }
            
            for (let index = min; index <= max; index++) {
                pagination.push(index);            
            }
        }
        
        let resultado = ({
            docs: results.docs,
            totalPages: results.pages,
            totalDocs: results.total,
            page: parseInt(page), // ENVIADO POR PARAMETRO (Pagina Actual)
            limit: 10, // parseInt(limit), // ENVIADO POR PARAMETRO (Limite de registros por pagina)
            hasPrevPage: (parseInt(page) <= 1 ? false : true ), // CALCULAR
            prevPage: (parseInt(page) <= 1 ? null : parseInt(page)-1), // CALCULAR
            hasNextPage: (parseInt(page) < results.pages ? true : false ), // CALCULAR
            nextPage: (parseInt(page) < results.pages ? parseInt(page)+1 : null ), // CALCULAR,
            pagination: pagination
        });

        res.status(200).json({ status: 200, error: false, message: '', results: resultado});         

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
    // OJO OJO OJO
};

vehiculoCtrl.getVehiculoId = async (req, res) => {
    const { id } = req.params;

    try {
        const results = await vehiculoModel.findOne({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: {id : id}
        });

        res.status(200).json({ status: 200, error: false, message: '', results});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

vehiculoCtrl.createVehiculo = async (req, res) => {
    try {
        const newVehiculo = req.body;

        const results = await vehiculoModel.create(newVehiculo);
        
        res.status(200).json({ status: 200, error: false, message: '', results});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

vehiculoCtrl.updateVehiculo = async (req, res) => {
    const { id } = req.params;

    try {
        const results = await vehiculoModel.update(req.body, {where: {id: id}});

        res.status(200).json({ status: 200, error: false, message: '', results});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

vehiculoCtrl.deleteVehiculo = async (req, res) => {
    const { id } = req.params;

    try {        
        const results = await vehiculoModel.destroy({where: {id: id}});

        res.status(200).json({ status: 200, error: false, message: '', results});
        
    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }    
};

module.exports = vehiculoCtrl;