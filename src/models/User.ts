export default class User {
  name: string;

  email: string;

  password: string;

  rg: string;

  cpf: string;

  sexo: string;

  superUser: boolean;

  constructor(
    name: string,
    email: string,
    password: string,
    rg: string,
    cpf: string,
    sexo: string,
    superUser: boolean,
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.rg = rg;
    this.cpf = cpf;
    this.sexo = sexo;
    this.superUser = superUser;
  }
}
