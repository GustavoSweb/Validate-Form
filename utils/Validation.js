const names = {
  name: "Nome",
  email: "Email",
  password: "Senha",
};

class Validation {
  constructor(data, optional) {
    this.data = data;
    this.optional = optional;
    this.inputs = {
      email: this.EmailFormat.bind(this),
    };
  }
  EmailFormat() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
    if (!emailRegex.test(this.data.email))
      throw new Error(`Formato de email inválido`);
  }
  Check() {
    var msg;
    Object.keys(this.data).forEach((input) => {
      const option = this.optional.find((a) => a == input);
      if (
        this.data[input] == undefined ||
        (this.data[input] == "" && option == null)
      ) {
        msg =
          names[input] != undefined
            ? `${names[input]} não pode ser vazio`
            : "Marque todos os campos";
        throw new Error(msg);
      }
      if (this.inputs[input] != undefined && option == null) this.inputs[input]();
    });
  }
}

module.exports = Validation;
