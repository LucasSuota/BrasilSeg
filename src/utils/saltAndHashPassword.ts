import { hash } from "bcrypt";

export function saltAndHashPassword(password: string) {
  return hash(password, 10);
}
