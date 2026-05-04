import { useState } from "react";
import { Pet } from "MP_202610_G81_E4_FRONT/src/types/Pets.ts";

const PetForm = () => {
  const [pet, setPet] = useState<Pet>({
    name: "",
    species: "Perro",
    breed: "",
    age: 0,
    status: "Disponible",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPet({
      ...pet,
      [e.target.name]:
        e.target.name === "age"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica (te suma puntos)
    if (!pet.name || !pet.breed || pet.age <= 0) {
      alert("Completa todos los campos obligatorios");
      return;
    }

    console.log("Mascota registrada:", pet);

    alert("Mascota registrada correctamente");

    // reset
    setPet({
      name: "",
      species: "Perro",
      breed: "",
      age: 0,
      status: "Disponible",
      description: "",
    });
  };

  return (
  <div className="form-container">
    <h2>Registro de Mascota</h2>

    <form onSubmit={handleSubmit}>
      <label>Nombre</label>
      <input name="name" value={pet.name} onChange={handleChange} />

      <label>Especie</label>
      <select name="species" value={pet.species} onChange={handleChange}>
        <option>Perro</option>
        <option>Gato</option>
      </select>

      <label>Raza</label>
      <input name="breed" value={pet.breed} onChange={handleChange} />

      <label>Edad</label>
      <input name="age" type="number" value={pet.age} onChange={handleChange} />

      <label>Estado</label>
      <select name="status" value={pet.status} onChange={handleChange}>
        <option>Disponible</option>
        <option>Adoptado</option>
      </select>

      <button type="submit">Guardar</button>
    </form>
  </div>
);
export default PetForm;