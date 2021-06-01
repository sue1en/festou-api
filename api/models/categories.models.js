module.exports = {
  name: {
    type:String,
    require: true,
  },
  description: {
    type:String,
    require: false,
  },
  status: {
    type:Boolean,
    require: true,
  },
  image: {
    originalName: {
      type:String,
      require: false,
    },
    name: {
      type:String,
      require: false,
    },
    type: {
      type:String,
      require: false,
    },
  },
}
