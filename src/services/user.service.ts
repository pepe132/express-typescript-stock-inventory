import { UsersModel } from "../models/users.model";
import { CreateUserDTO, UpdateUserDTO } from "../interfaces/users.interface";
import { encrypt } from "../utils/bcrypt.handle";
import { RolesModel } from "../models/role.model";

export class UserService {
  
  static async createUser(data: CreateUserDTO) {
    const { email, user_password, user_name, company_id, role_id } = data;

    const userExists = await UsersModel.findOne({ where: { email } });
    if (userExists) {
      throw new Error("El correo electrónico ya está en uso");
    }

    // Validar rol
    const role = await RolesModel.findByPk(role_id);
    if (!role) {
      throw new Error("El rol especificado no existe");
    }

    const passwordHash = await encrypt(user_password);

    const newUser = await UsersModel.create({
      user_name,
      email,
      user_password: passwordHash,
      company_id,
      role_id
    });

    const { user_password: _, ...userResponse } = newUser.get();
    return userResponse;
  }

  static async getUsersByCompany(companyId: number) {
    return await UsersModel.findAll({
      where: { company_id: companyId },
      attributes: { exclude: ['user_password'] },
      include: [RolesModel]
    });
  }

  static async getUserById(userId: number, companyId: number) {
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

  static async updateUser(userId: number, companyId: number, data: UpdateUserDTO) {
    const user = await UsersModel.findOne({
      where: { user_id: userId, company_id: companyId }
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    if (data.email) {
      const emailExists = await UsersModel.findOne({ 
        where: { email: data.email, user_id: { $ne: userId } as any } 
      });
      if (emailExists) {
        throw new Error("El correo electrónico ya está en uso por otro usuario");
      }
    }

    if (data.user_password) {
      data.user_password = await encrypt(data.user_password);
    }

    await user.update(data);
    
    const { user_password: _, ...updatedUser } = user.get();
    return updatedUser;
  }

  static async deleteUser(userId: number, companyId: number) {
    const user = await UsersModel.findOne({
      where: { user_id: userId, company_id: companyId }
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    await user.destroy(); // Soft delete por paranoid: true
    return { message: "Usuario eliminado correctamente" };
  }

  static async changeUserRole(userId: number, companyId: number, roleId: number) {
    const user = await UsersModel.findOne({
      where: { user_id: userId, company_id: companyId }
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const role = await RolesModel.findByPk(roleId);
    if (!role) {
      throw new Error("El rol especificado no existe");
    }

    await user.update({ role_id: roleId });
    
    const { user_password: _, ...updatedUser } = user.get();
    return updatedUser;
  }
}
