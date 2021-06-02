const supplierSchema = {
  cnpj: {
    type: String,
    required: true,
  },
  tradeName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  status: {          // Analise | Ativo | Inativo
    type: String,
    required: true,
  },
}

module.exports = supplierSchema;