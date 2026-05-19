import { PawPrint, Menu } from "lucide-react";
import style from "./PetList.module.css";

export const PetList = () => {
  const pets = [
    {
      id: 1,
      name: "Max",
      species: "Labrador",
      age: "5 años",
      image:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=800",
    },
    {
      id: 2,
      name: "Luna",
      species: "Labrador",
      age: "3 años",
      image:
        "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=800",
    },
    {
      id: 3,
      name: "Rocky",
      species: "Beagle",
      age: "2 años",
      image:
        "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=800",
    },
    {
      id: 4,
      name: "Beagle",
      species: "Beagle",
      age: "2 años",
      image:
        "https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=800",
    },
  ];

  return (
    <div className={style.container}>
      <div className={style.card}>

        {/* HEADER */}
        <div className={style.topbar}>
          <PawPrint size={32} color="#8b5cf6" />
          <h2>Listar mascotas</h2>
          <Menu size={32} color="#6b7280" />
        </div>

        {/* BODY */}
        <div className={style.content}>
          <h1>Mascotas Disponibles</h1>

          <div className={style.grid}>
            {pets.map((pet) => (
              <div className={style.petCard} key={pet.id}>

                <img src={pet.image} alt={pet.name} />

                <div className={style.petInfo}>
                  <h3>{pet.name}</h3>

                  <p>Especie: {pet.species}</p>
                  <p>{pet.age}</p>

                  <div className={style.actions}>
                    <span className={style.status}>
                      Bueno
                    </span>

                    <button>
                      Ver Detalles
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};