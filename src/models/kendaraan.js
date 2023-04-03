const pool = require('../config/db');

const insert = (data) => {
    const {no_reg, name, merk, production_year, capacity} = data;
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO vehicle2 (no_reg, name, merk, production_year, capacity) VALUES ('${no_reg}', '${name}', '${merk}', ${production_year}, ${capacity})`, 
        (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const allVehicle = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM vehicle2`, 
        (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const detail = (no_reg) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM vehicle2 WHERE no_reg='${no_reg}'`, 
        (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const updateVehicle = (data) => {
    const {no_reg, name, merk, production_year, capacity} = data;
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE vehicle2 SET name='${name}', merk='${merk}', production_year=${production_year}, capacity=${capacity} WHERE no_reg='${no_reg}'`, 
        (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const deleteVehicle = (no_reg) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM vehicle2 WHERE no_reg='${no_reg}'`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

// const countVehicle = () => {
//     return new Promise ((resolve, reject) => {
//         pool.query(`SELECT COUNT(*) AS total FROM vehicle`, (err, res) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(res);
//             }
//         })
//     })
// }

module.exports = {
    insert,
    allVehicle,
    detail,
    updateVehicle,
    deleteVehicle
}