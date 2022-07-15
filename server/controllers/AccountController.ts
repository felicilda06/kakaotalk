import { Request, Response } from "express";
import { Account } from "../models";
import * as bcrypt from "bcrypt";

const AccountController = {
  register: async (req: Request, res: Response) => {
    const { name, email, phone, password } = req.body;

    try {
      const [isEmailExist] = await Account.find({ email: email });
      const saltRound: number = 10;
      bcrypt.hash(password, saltRound, (_err: any, hashPassword: string) => {
        const register = new Account({
          name,
          email,
          phone,
          password: hashPassword,
        });

        if (isEmailExist) {
          res.status(400).json({
            message: `Email already exist.`,
          });
          return;
        } else {
          if (register) {
            res.status(200).json({
              message: "Account Successfully Saved.",
            });
            return register.save();
          }

          res.status(400).json({
            message: `An Error Occured on saving data.`,
          });
        }
      });
    } catch (e: any) {
      console.log(`Error`, e);
    }
  },
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    let data: any = "";

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      const [findAccountByPhone] = await Account.find({ phone: email });

      if (!findAccountByPhone) {
        res.status(400).json({
          message: `Phone number does'nt found.`,
        });
        return;
      }
      data = findAccountByPhone;
    } else {
      const [findAccountByEmail] = await Account.find({ email: email });

      if (!findAccountByEmail) {
        res.status(400).json({
          message: `Email address does'nt found.`,
        });
        return;
      }
      data = findAccountByEmail;
    }

    if (data) {
      const { password: dbPassword } = data;
      bcrypt.compare(password, dbPassword, (_err: any, isMatch: boolean) => {
        if (!isMatch) {
          res.status(400).json({
            message: `Password does'nt match`,
          });
          data = "";
          return;
        }

        res.status(200).json({
          message: "Successfully Logged In",
        });
      });
    }
  },
  tailNumber: async (req: Request, res: Response) => {
    const data = {
      country: {
        id: "Bahamas",
        label: "Bahamas",
        value: {
          country: "Bahamas",
        },
      },
      prefix: "",
      tail_number: "123541",
    };
    return await res.send(data);
  },
};

export default AccountController;
