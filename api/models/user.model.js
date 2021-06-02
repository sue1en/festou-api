const userSchema = {
  email: {
    type:String,
    require: true,
  },
  password: {
    type: String,
    required:true,
  },
  // image: {
  //   originalName: {
  //     type:String,
  //     require: false,
  //   },
  //   name: {
  //     type:String,
  //     require: false,
  //   },
  //   type: {
  //     type:String,
  //     require: false,
  //   },

}

module.exports = userSchema;