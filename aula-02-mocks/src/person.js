class Person {
  static validate(person) {
    if (!person.name) throw new Error("name is required");
    if (!person.cpf) throw new Error("cpf is required");
  }

  static format(person) {
    const [name, ...lastName] = person.name.split(" ");

    return {
      name,
      lastName: lastName.join(" "),
      cpf: person.cpf.replace(/\D/g, ""),
    };
  }

  static save(person) {
    const canSave = ["name", "cpf", "lastName"].every((props) => person[props]);
    if (!canSave)
      throw new Error(
        `cannot save invalid person format: ${JSON.stringify(person)}`
      );
    console.log("Person successfully saved.");
  }

  static process(person) {
    this.validate(person);
    const formattedPerson = this.format(person);
    this.save(formattedPerson);
    return "ok";
  }
}

export default Person;
