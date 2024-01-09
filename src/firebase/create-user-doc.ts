import { hash, genSalt } from "bcryptjs";
import { collection, addDoc } from "firebase/firestore";

import { IUserRegister } from "@/common/interfaces";

import { db } from "./init";

export const createUserDoc = async (user: IUserRegister) => {
  try {
    const { date, gender, month, name, password, year } = user;

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    await addDoc(collection(db, "users"), {
      name,
      gender,
      password: hashedPassword,
      dob: new Date(+year, +month, +date),
    });
  } catch (error) {
    console.error("Error creating user: ", error);
  }
};
