const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password, confirmPassword }) {
    if(!name) {
      throw new AppError("Você precisa cadastrar um nome de usuário");
    }

    if(!email) {
      throw new AppError("Você precisa cadastrar um email");
    }

    const emailAlreadyExists = await this.userRepository.findByEmail(email);
    
    if(emailAlreadyExists) {
      throw new AppError("Este email já está sendo utilizado.");
    }

    if(password.length < 6) {
      throw new AppError("A senha precisa ter no mínimo 6 caracteres.");
    }    

    if(password && !confirmPassword || !password && confirmPassword) {
      throw new AppError("As senhas não conferem, por favor, tente novamente.");
    }

    if(password && confirmPassword) {
      const comparedPassword = password === confirmPassword;

      if(!comparedPassword) {
        throw new AppError("As senhas não conferem, por favor, tente novamente.");
      }
    }

    const hashedPassword = await hash(password, 8);

    await this.userRepository.create({ name, email, password: hashedPassword });
  }
}

module.exports = UserCreateService;