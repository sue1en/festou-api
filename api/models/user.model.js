const userSchema = {
  email: {
    type:String,
    require: true,
  },
  password: {
    type: String,
    required:true,
  },
  kind: {
    type: String,
    required:true,
  }
}

module.exports = userSchema;