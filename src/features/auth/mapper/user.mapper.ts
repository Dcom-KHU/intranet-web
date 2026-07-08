import { type User } from "../types/user.type";
import type UserDto from "../dto/user.dto";

const toUser = (dto: UserDto): Omit<User, "password"> => ({
    id: dto.userId,
    userID: dto.loginId,
    email: dto.email,
    name: dto.name,
    studentNumber: dto.studentId,
    phoneNumber: dto.phoneNumber,
    role: dto.role,
    status: dto.status,
    requirePasswordChange: dto.requirePasswordChange,
});

export default toUser;