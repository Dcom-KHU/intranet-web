import type { PendingUsersResponseDto } from "../dto/pending-users.dto";
import type { PendingUsersPage } from "../types/pending-users.type";
import { formatDate } from "../../../utils/date";

export const toPendingUsersPage = (
  response: PendingUsersResponseDto["data"],
): PendingUsersPage => ({
  users: response.pendingUserList.map((user) => ({
    id: user.userId,
    userID: user.loginId,
    name: user.name,
    studentNumber: user.studentId,
    email: user.email,
    phoneNumber: user.phoneNumber,
    requestedAt: formatDate(user.createdAt),
  })),
  ...response.pageInfo,
});
