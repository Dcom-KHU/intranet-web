import { useEffect, useState } from "react";
import type { User } from "../../auth/types/user.type";
import { userService } from "../services/manage-user.service";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await userService.getAllUsers();
    setUsers(data);
    setLoading(false);
  };

  const searchUsers = async (keyword: string) => {
    setLoading(true);
    const data = await userService.searchUsers(keyword);
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    fetchUsers,
    searchUsers,
  };
};
