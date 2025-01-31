import { userService } from "@/services/userService";

export const userController = {
  getUsers: () => {
    return userService.getUsers();
  },
  
  getUser: ({ params }: { params: { userId: string } }) => {
    return userService.getUser(params.userId);
  },
  
  createUser: ({ body }: { body: any }) => {
    return userService.createUser(body);
  },
  
  updateUser: ({ params, body }: { params: { userId: string }, body: any }) => {
    return userService.updateUser(params.userId, body);
  },
  
  deleteUser: ({ params }: { params: { userId: string } }) => {
    return userService.deleteUser(params.userId);
  },
};
