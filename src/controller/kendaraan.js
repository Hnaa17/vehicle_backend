const {
    insert,
    allVehicle,
    detail,
    updateVehicle,
    deleteVehicle,
} = require('../models/kendaraan');
const {success, failed} = require('../helper/response');

const vehicleController = {
    insertVehicle: async (req, res) => {
        try {
            const {no_reg, name, merk, production_year, capacity} = req.body;
            const data = {
                no_reg, 
                name,
                merk, 
                production_year, 
                capacity
            };
            await insert(data)
            if (no_reg  == '' || name == '' || merk == '' || production_year == '' || capacity == '') {
                failed(res, {
                    code: 500,
                    status: 'error',
                    message: `Semua data harus di isi`,
                    error: [],
                });
            }
            if(isNaN(production_year) || isNaN(capacity)){
                failed(res, {
                    code: 500,
                    status: 'error',
                    message: `Tahun Produksi dan Kapasitas kendaraan harus di isi angka`,
                    error: [],
                });
            }
            success(res, {
                code: 200,
                status: 'success',
                message: 'Data kendaraan baru berhasil dibuat',
                data: data,
            });
        } catch(error) {
            failed(res, {
                code: 500,
                status: 'error',
                message: error,
                error: [],
            });
        }
    },
    getAll: async (req, res) => {
        try {
            const result = await allVehicle();
            success(res, {
                code: 200,
                status: 'success',
                message: `Success get all vehicle data`,
                data: result.rows,
            });
        } catch(error) {
            failed(res, {
                code: 500,
                status: 'error',
                message: error.message,
                error: [],
            });
        }
    },
    getDetail: async (req, res) => {
        try {
            const {no_reg} = req.params;
            const result = await detail(no_reg);
            if (result.rowCount > 0) {
                success(res, {
                    code: 200,
                    status: 'success',
                    message: 'Success get vehicle data by id',
                    data: result.rows[0],
                });
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `vehicle with registration number ${no_reg} is not found`,
                    error: [],
                });
            }
        } catch(error) {
            failed(res, {
                code: 500,
                status: 'error',
                message: error.message,
                error: [],
            });
        }
    },
    updateData: async (req, res) => {
        try {
            const { no_reg } = req.params;
            const { name, merk, production_year, capacity } = req.body;
            const vehicleCheck = await detail(no_reg);
            if (vehicleCheck.rowCount > 0) {
                const data = {
                    no_reg,
                    name, 
                    merk, 
                    production_year, 
                    capacity, 
                };
                await updateVehicle(data);
                success(res, {
                    code: 200,
                    status: 'success',
                    message: 'Success update vehicle',
                    data: data,
                });
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `vehicle with registration number ${no_reg} is not found`,
                    error: [],
                });
                return;
            }
        } catch(error) {
            failed(res, {
                code: 500,
                status: 'error',
                message: error.message,
                error: [],
            });
        }
    },
    deleteData: async (req, res) => {
        try {
            const { no_reg } = req.params;
            const detailVehicle = await detail(no_reg);
            if (detailVehicle.rowCount > 0) {
                await deleteVehicle(no_reg);
                success(res, {
                    code: 200,
                    status: 'success',
                    message: `success deleted vehicle with registration number ${no_reg}`,
                });
                return;
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `vehicle with registration number ${no_reg} is not found`,
                    error: [],
                });
                return;
            }
        } catch(error) {
            failed(res, {
                code: 500,
                status: 'error',
                message: error.message,
                error: [],
            });
        }
    }
}

module.exports = vehicleController;