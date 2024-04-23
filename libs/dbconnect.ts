import mongoose from 'mongoose'

const MongoConnect = () => {
  try {
    mongoose.connect(process.env.MONGOURL!) //! is used in typescript to ensure this value is mot null
    console.log('DATABASE CONNECTED ')
  } catch (error) {
    console.log('DATABASE NOT CONNECTED ')
    console.log(error)
  }
}
export default MongoConnect
