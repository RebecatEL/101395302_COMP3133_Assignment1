const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        validate(value) {
            if (!value) {
                throw new Error('Must provide a first name');
            }
        }
    },
    lastname: {
        type: String,
        required: true,
        validate(value) {
            if (!value) {
                throw new Error('Must provide a last name');
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other'],
    },
    salary: {
        type: Number,
        required: true
    }
});

const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;