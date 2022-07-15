import mongoose from "mongoose";
import moment from 'moment' 

const AccountSchema = new mongoose.Schema({
  id:{
    type: String
  },
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    unique: true,
    required: true
  },
  phone:{
    type:String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  created_at:{
    type: Date,
    default: moment(new Date())
  }
})

const Account = mongoose.model('tbl_accounts', AccountSchema)

export default Account


