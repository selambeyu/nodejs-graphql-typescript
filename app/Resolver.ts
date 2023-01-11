import exp from "constants";
import people from "./dataset";

const Resolver = {
  Query: {
    getAllPeople: () => people,
    getPerson: (_: any, args: any) => {
      console.log(args);
      return people.find((person) => person.id === args.id);
    },
  },
};

export default Resolver;