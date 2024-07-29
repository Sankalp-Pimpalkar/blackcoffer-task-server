import mongoose from 'mongoose';
import { app } from "../constants.js";
const port = process.env.PORT || 5000;


function connectDB() {
    mongoose.connect(`${process.env.MONGODB_URL}`)
        .then(() => {
            console.log('MongoDB connected...');

            // Starting express server
            app.listen(port, () => {
                console.log(`Server running on port http://localhost:${port}`)
            });
        })
        .catch(err => {
            console.log('Mongodb connection failed due to ', err)
            process.exit(1);
        });
}

export default connectDB;