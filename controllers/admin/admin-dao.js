import usersModel from "../users/users-model.js";

export const aggregateUsers = async (user) => await usersModel.aggregate(user);