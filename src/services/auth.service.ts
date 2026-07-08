import { UsersModel } from "../models/users.model";
import { RegisterUserDTO, LoginDTO, AuthResponseDTO } from "../interfaces/auth.interface";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";
import { RolesModel } from "../models/role.model";

export class AuthService {
  
  static async registerUser(data: RegisterUserDTO) {
    const { email, user_password, user_name, company_id, role_id } = data;

    // Validar email único
    const userExists = await UsersModel.findOne({ where: { email } });
    if (userExists) {
      throw new Error("El correo electrónico ya está registrado");
    }

    // Encriptar contraseña
    const passwordHash = await encrypt(user_password);

    // Crear usuario
    const newUser = await UsersModel.create({
      user_name,
      email,
      user_password: passwordHash,
      company_id,
      role_id
    });

    // Generar Token
    const token = generateToken(newUser.user_id, newUser.company_id);

    return {
      user: {
        user_id: newUser.user_id,
        user_name: newUser.user_name,
        email: newUser.email,
        role_id: newUser.role_id,
        company_id: newUser.company_id
      },
      token
    };
  }

  static async loginUser(data: LoginDTO) {
    const { email, user_password } = data;

    // Buscar usuario
    const user = await UsersModel.findOne({ 
      where: { email },
      include: [RolesModel] 
    });

    if (!user) {
      throw new Error("Credenciales inválidas");
    }

    // Verificar contraseña
    const isCorrect = await verified(user_password, user.user_password);
    if (!isCorrect) {
      throw new Error("Credenciales inválidas");
    }

    // Generar Token
    const token = generateToken(user.user_id, user.company_id);

    return {
      user: {
        user_id: user.user_id,
        user_name: user.user_name,
        email: user.email,
        role_id: user.role_id,
        company_id: user.company_id
      },
      token
    };
  }

  static async getProfile(userId: number, companyId: number) {
    const user = await UsersModel.findOne({
      where: { user_id: userId, company_id: companyId },
      attributes: { exclude: ['user_password'] },
      include: [RolesModel]
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return user;
  }
}
