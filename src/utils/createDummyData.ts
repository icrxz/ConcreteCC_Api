import { UserModel } from "../database/users/users.model";
import { IUser } from "../database/users/users.types";
import { connect, disconnect } from "../database/db"

(async () => {
  connect();

  const users: IUser[] = [
    { firstName: "Emma", lastName: "Bradley", birthDate: new Date("2020-08-23"), email: 'example@email.com', cpf: '441.405.608-00' },
    { firstName: "Elise", lastName: "Conner", birthDate: new Date("2020-09-20"), email: 'example@email.com', cpf: '441.405.608-00' },
    { firstName: "Jack", lastName: "Lawson", birthDate: new Date("1998-03-08"), email: 'example@email.com', cpf: '441.405.608-00' },
    { firstName: "Oliver", lastName: "Moss", birthDate: new Date("1995-05-08"), email: 'example@email.com', cpf: '441.405.608-00' },
    { firstName: "Jamie", lastName: "Reid", birthDate: new Date("2002-05-06"), email: 'example@email.com', cpf: '441.405.608-00' },
    { firstName: "Aidan", lastName: "Bradley", birthDate: new Date("2000-10-08"), email: 'example@email.com', cpf: '441.405.608-00' },
    { firstName: "Jordan", lastName: "Gallagher", birthDate: new Date("2004-11-12"), email: 'example@email.com', cpf: '441.405.608-00' },
    { firstName: "Erin", lastName: "Miles", birthDate: new Date("1993-06-09"), email: 'example@email.com', cpf: '441.405.608-00' },
    { firstName: "William", lastName: "May", birthDate: new Date("1999-01-18"), email: 'example@email.com', cpf: '441.405.608-00' },
  ];

  try {
    users.forEach(async (user: IUser) => {
      await UserModel.create(user);
      console.log(`Created user ${user.firstName} ${user.lastName}`);
    });

    disconnect();
  } catch (e) {
    console.error(e);
  }
})();
