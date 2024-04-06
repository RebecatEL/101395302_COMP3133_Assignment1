const Employee = require('./models/Employee');
const User = require('./models/Users');

exports.resolvers = {
    Query: {
        login: async (parent, args) => {
            console.log(args)
            // If cannot find the user, throw error message
            const user = await User.findOne({email: args.email, password: args.password})
            if (!user){
                console.log("Wrong email or password")
                throw new Error("Wrong email or password")
            }else{
                return user
            }
        },
        getAllEmployees: async (parent, args) => {
            // return all employees in JSON format
            return Employee.find({})
        },
        getEmployeeByID: async (parent, args) => {
            return Employee.findById(args.id)
        }
    },

    Mutation: {
        signup: async (parent, args) => {
            let newUser = new User({
                username: args.username,
                email: args.email,
                password: args.password
            })
            console.log(newUser)
            return newUser.save()
        },
        addNewEmployee: async (parent, args) => {
            console.log(args)
            let newEmp = new Employee({
                firstname: args.firstname,
                lastname: args.lastname,
                email: args.email,
                gender: args.gender,
                salary: args.salary
            })
            return newEmp.save()
        },
        updateEmployee: async (parent, args) => {
            console.log(args)
            if (!args.id){
                return;
            }

            try{
            const query = Employee.findOneAndUpdate(
            {
                _id: args.id
            },
            {
                $set: {
                    firstname: args.firstname,
                    lastname: args.lastname,
                    email: args.email,
                    gender: args.gender,

                    salary: args.salary
                }
            }, {new: true});
            
            const updatedEmployee = await query.exec();
            return updatedEmployee;
            }
            catch(err){
                console.log('Something went wrong when updating the employee', err)
                return null;
            }
            
        },
      deleteEmployee: async (parent, args) => {
        console.log(args)
        if (!args.id){
            throw new Error("No ID found");
        }
        return await Employee.findByIdAndDelete(args.id)
      }
    }
};

//module.exports = resolvers;