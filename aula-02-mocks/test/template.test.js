import Person from "../src/person";
import { expect, jest } from "@jest/globals";

const name = "Jentiro Gotaho";
const cpf = "123.456.789-00";

describe("#Person Suite", () => {
  describe("#validate", () => {
    it("should throw error if name is not present", () => {
      const mockedInvalidPerson = {
        name: null,
        cpf,
      };
      expect(() => Person.validate(mockedInvalidPerson)).toThrow(
        new Error("name is required")
      );
    });

    it("should throw error if cpf is not present", () => {
      const mockedInvalidPerson = {
        name,
        cpf: null,
      };
      expect(() => Person.validate(mockedInvalidPerson)).toThrow(
        new Error("cpf is required")
      );
    });

    it("should not throw if cpf and name are present", () => {
      const mockedInvalidPerson = {
        name,
        cpf,
      };
      expect(() => Person.validate(mockedInvalidPerson)).not.toThrow();
    });
  });
  describe("#format", () => {
    it("should format name and cpf", () => {
      const mockedPerson = { name, cpf };
      const formattedPerson = Person.format(mockedPerson);
      const expectedPerson = {
        name: "Jentiro",
        lastName: "Gotaho",
        cpf: "12345678900",
      };

      expect(formattedPerson).toStrictEqual(expectedPerson);
    });
  });
  describe("#save", () => {
    it("should not save if person doesn't have required fields", () => {
      const mockedPerson = { name, cpf };
      const invalidPerson = {
        name,
        cpf,
      };

      expect(() => Person.save(invalidPerson)).toThrow(
        new Error(
          `cannot save invalid person format: ${JSON.stringify(invalidPerson)}`
        )
      );
    });

    it("should save successfully", () => {
      const mockedPerson = { name, cpf };
      const formattedPerson = Person.format(mockedPerson);

      expect(() => Person.save(formattedPerson)).not.toThrow();
    });
  });

  describe("#process", () => {
    it("should process a valid person", () => {
      // arrange act assert

      const mockPerson = { name, cpf };
      const formattedMockPerson = {
        name: "Jentiro",
        lastName: "Gotaho",
        cpf: 12345678900,
      };

      const result = Person.process(mockPerson);
      const expected = "ok";

      // Faz com que retorne true quando o Person executa o método validate
      jest.spyOn(Person, Person.validate.name).mockReturnValue();

      // FOrça o format a retornar o formattedMockPerson quando executado
      jest
        .spyOn(Person, Person.format.name)
        .mockReturnValue(formattedMockPerson);

      expect(result).toStrictEqual(expected);
    });
  });
});
