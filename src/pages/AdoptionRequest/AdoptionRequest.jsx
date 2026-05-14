import { useState, useEffect } from "react";
import styles from "./AdoptionRequest.module.css";
export function AdoptionRequest(){
    const [selectedPet, setSelectedPet] = useState(null);
    const [motivation, setMotivation] = useState("");
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [filtroTipo, setFiltroTipo] = useState("Todos");
    const [filtroTamano, setFiltroTamano] = useState("Todos");
    const [filtroAplicadoTipo, setFiltroAplicadoTipo] = useState("Todos");
    const [filtroAplicadoTamano, setFiltroAplicadoTamano] = useState("Todos");

    
    useEffect(() => {
        const cargarMascotas = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/pets");
                const data = await response.json();

                setPets(data);

            } catch(error) {
                console.error(error);
                alert("No se pudieron cargar las mascotas");
            }
        };

        cargarMascotas();
        }, []);

    /*
    const pets = [
        {
            id: 1,
            name: "Jake",
            age: "2 años",
            size: "Grande",
            description: "Perro amigable y juguetón",
            image: "https://images.unsplash.com/photo-1648799834307-97650bbf7298",
            status: "AVAILABLE",
            type: "Perro",
        },
        {
            id:2,
            name: "puka",
            age: "1 año",
            size: "Mediano",
            description: "Perra leal y juiciosa",
            image: "https://images.unsplash.com/photo-1648799834307-97650bbf7298",
            status: "AVAILABLE",
            type: "Perro",
        },
        {id: 3, name: "natasha", status: "ADOPTED"}
    ];
    */
    const [pets, setPets] = useState([]);
    return(
        <div className={styles.appContainer}>
            <div className={styles.mainContent}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Solicitar adopción</h1>
                    <div className={styles.filtersBox}>
                        <h3>Buscar Mascotas</h3>
                        <div className={styles.filtersGrid }>
                            <div className={styles.filterGroup}>
                                <label className={styles.label}>Tipo</label>
                                <select 
                                    className={styles.select}
                                    value={filtroTipo}
                                    onChange={(e) => setFiltroTipo(e.target.value)}
                                >
                                    <option>Todos</option>
                                    <option>Perro</option>
                                    <option>Gato</option>
                                </select>
                            </div>
                            <div className={styles.filterGroup}>
                                <label className={styles.label}>Tamaño</label>
                                <select 
                                    className={styles.select}
                                    value={filtroTamano}
                                    onChange={(e) => setFiltroTamano(e.target.value)}
                                >
                                    <option>Todos</option>
                                    <option>Pequeño</option>
                                    <option>Mediano</option>
                                    <option>Grande</option>
                                </select>
                            </div>
                            <button 
                                className={styles.button}
                                onClick={() => {
                                    setFiltroAplicadoTipo(filtroTipo);
                                    setFiltroAplicadoTamano(filtroTamano);
                                }}
                            >
                                Buscar
                            </button>
                        </div>
                    </div>
                    <h2 className={styles.subtitle}>Mascotas disponibles</h2>
                    <div className={styles.petList}>
                        {pets
                            .filter(pet => {
                                const pasaTipo = filtroAplicadoTipo === "Todos" || pet.species === filtroAplicadoTipo;
                                const pasaTamano = filtroAplicadoTamano === "Todos" || pet.size === filtroAplicadoTamano;
                                return pet.status === "AVAILABLE" && pasaTipo && pasaTamano;
                            })
                            .map(pet => (
                                <div key={pet.id} className={styles.petCard}>
                                    
                                    <img 
                                        src={pet.photos?.[0] || "https://via.placeholder.com/300"} 
                                        alt={pet.name} 
                                        className={styles.petImage}
                                    />

                                    <div className={styles.petInfo}>
                                        <h4 className={styles.petName}>{pet.name}</h4>
                                        <p>{pet.age} años • {pet.size || "Sin tamaño definido"}</p>
                                        <p>{pet.breed}•{pet.temperament}</p>
                                    <button 
                                        className={styles.button}
                                        onClick={() => setSelectedPet(pet)}
                                        >
                                        Seleccionar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {selectedPet && !isConfirmed && (
                        <div>

                            <p className={styles.selectedText}>
                            Mascota seleccionada: {selectedPet.name}
                            </p>

                            <div className={styles.confirmBox}>
                            <h3>Motivación</h3>

                            <input 
                                className={styles.input}
                                type="text"
                                value={motivation}
                                onChange={(e) => setMotivation(e.target.value)}
                                placeholder="¿Por qué quieres adoptar?"
                            />

                            <button
                                className={styles.button}
                                onClick={async () => {
                                    if(!motivation){
                                        alert("Escribe una motivación");
                                        return;
                                    }

                                const confirmacion = window.confirm("¿Seguro deseas enviar la solicitud?");
                                
                                if (confirmacion){
                                    const adoptionData = {
                                    petId: selectedPet.id,
                                    //aun no se especifica quien es el adoptante, falta seccion de registro del adoptante
                                    adopterId: 1,
                                    motivation: motivation,
                                    status: "PENDING"
                                    };

                                    try{
                                        const response = await fetch("http://localhost:8080/api/adoption-requests",{
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(adoptionData)
                                        
                                            });
                                            console.log(await response.text());
                                            if (response.ok){
                                                setIsConfirmed(true);
                                                setMotivation("");
                                                setSelectedPet(null);
                                            } else {
                                                alert("Error al enviar la solicitud");
                                            }
                                    } catch(error){
                                    console.error(error);
                                        alert("No se pudo conectar con el servidor");
                                    }
                                }
                              }}
                            >
                                Solicitar adopción              
                            </button>

                            </div>
                        </div>
                        )}
                    {isConfirmed && (
                        <p className={styles.success}>Solicitud enviada con exito</p>
                    )}
                </div>
            </div>
        </div>

    )
}


