import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import styles from "./ManageRequests.module.css";

export function ManageRequests(){
    const [solicitudes, setSolicitudes] = useState([]);
    const [selectedSolicitud, setSelectedSolicitud] = useState(null);
    const [showDetail, setShowDetail] = useState(false);
    //por ahora en comentario las solicitudes de prueba, pero la conexion real ya esta establecida
    useEffect(() => {
        const cargarSolicitudes = async() => {
            try{
                const response = await fetch("http://localhost:8080/api/adoption-requests");
                const data = await response.json();

                setSolicitudes(data);

            }catch(error){
                console.error(error);
                alert("No se pudieron cargar las solicitudes");
            }
        };
        cargarSolicitudes();
    },[]);
    console.log(solicitudes);
    /*const solicitudesData = [
        {
            id: "SOL-001",
            mascota: {
                nombre: "Max",
                tipo: "Perro",
                edad: "2 años",
                imagen: "https://images.unsplash.com/photo-1648799834307-97650bbf7298"
            },
            adoptante: {
                nombre: "María González",
                email: "maria@email.com",
                telefono: "3001234567"
            },
            fecha: "2026-04-15",
            estado: "Pendiente"
        },
        {
            id: "SOL-002",
            mascota: {
                nombre: "Luna",
                tipo: "Perro",
                edad: "1 año",
                imagen: "https://images.unsplash.com/photo-1709457671378-c2ff3aaecac5"
            },
            adoptante: {
                nombre: "Carlos Ruiz",
                email: "carlos@email.com",
                telefono: "301987654"
            },
            fecha: "2026-04-16",
            estado: "Pendiente"
        },
        {
            id: "SOL-003",
            mascota: {
                nombre: "Tom",
                tipo: "Gato",
                edad: "3 años",
                imagen: "https://images.unsplash.com/photo-1702914954859-f037fc75b760"
            },
            adoptante: {
                nombre: "Ana Martínez",
                email: "ana@email.com",
                telefono: "320111111"
            },
            fecha: "2026-04-14",
            estado: "Aprobada"
        },
        {
            id: "SOL-004",
            mascota: {
                nombre: "Rocky",
                tipo: "Perro",
                edad: "4 años",
                imagen: "https://images.unsplash.com/photo-1637852422069-81efc85e0a79"
            },
            adoptante: {
                nombre: "Pedro López",
                email: "pedro@email.com",
                telefono: "300222222"
            },
            fecha: "2026-04-13",
            estado: "Rechazada"
        }
    ];*/
    const aprobarSolicitud = (id) => {
        const nuevasSolicitudes = solicitudes.map((solicitud) =>
            solicitud.id == id
                ? { ...solicitud, status: "APPROVED"}
                :solicitud
        );
        setSolicitudes(nuevasSolicitudes);
        setShowDetail(false);
    };
    const rechazarSolicitud = (id) => {
        const nuevasSolicitudes = solicitudes.map((solicitud) => 
            solicitud.id === id
                ? { ...solicitud, status: "REJECTED"}
                : solicitud
        );
        setSolicitudes(nuevasSolicitudes);
        setShowDetail(false);
    }
   return(
        <div className={styles.appContainer}>

            <div className={styles.mainContent}>

                <h1 className={styles.title}>
                    Gestionar Solicitudes
                </h1>

                <div className={styles.statsGrid}>

                    <div className={styles.statCardPending}>
                        <p>Pendientes</p>
                        <h2>
                            {
                                solicitudes.filter(
                                    solicitud => solicitud.status === "PENDING"
                                ).length
                            }
                        </h2>
                    </div>

                    <div className={styles.statCardApproved}>
                        <p>Aprobadas</p>
                        <h2>
                            {
                                solicitudes.filter(
                                    solicitud => solicitud.status === "APPROVED"
                                ).length
                            }
                        </h2>
                    </div>

                    <div className={styles.statCardRejected}>
                        <p>Rechazadas</p>
                        <h2>
                            {
                                solicitudes.filter(
                                    solicitud => solicitud.status === "REJECTED"
                                ).length
                            }
                        </h2>
                    </div>

                </div>

                <div className={styles.tableContainer}>

                    <div className={styles.tableHeader}>
                        <h2>Solicitudes del Refugio</h2>
                    </div>

                    <table className={styles.table}>

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Mascota</th>
                                <th>Adoptante</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>

                            {solicitudes.map((solicitud) => (

                                <tr key={solicitud.id}>

                                    <td>{solicitud.id}</td>

                                    <td>

                                        <div className={styles.petCell}>

                                            <img
                                                src={solicitud.pet?.photos?.[0] || "https://via.placeholder.com/150"}
                                                alt={solicitud.pet?.name}
                                                className={styles.petImage}
                                            />

                                            <div>
                                                <p className={styles.petName}>
                                                    {solicitud.pet?.name}
                                                </p>

                                                <p className={styles.petType}>
                                                    {solicitud.pet?.species}
                                                </p>
                                            </div>

                                        </div>

                                    </td>

                                    <td>
                                        {solicitud.adopter?.name}
                                    </td>

                                    <td>
                                        {solicitud.date}
                                    </td>

                                    <td>

                                        <span
                                            className={
                                                solicitud.status === "PENDING"
                                                ? styles.pendingBadge
                                                : solicitud.status === "APPROVED"
                                                ? styles.approvedBadge
                                                : styles.rejectedBadge
                                            }
                                        >
                                            {solicitud.status}
                                        </span>

                                    </td>

                                    <td>

                                        <button 
                                            className={styles.detailButton}
                                            onClick={() => {
                                                setSelectedSolicitud(solicitud);
                                                setShowDetail(true);
                                            }}
                                        >
                                            <Eye size={16}/>
                                            Ver Detalle
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>
            
            
            {showDetail && selectedSolicitud && (

                <div className={styles.modalOverlay}>

                    <div className={styles.modal}>

                        <h2 className={styles.modalTitle}>
                            Detalle de Solicitud
                        </h2>

                        <div className={styles.modalContent}>

                            <div className={styles.infoCard}>

                                <h3 className={styles.infoTitle}>
                                    Mascota
                                </h3>

                                <img
                                    src={selectedSolicitud.pet?.photos?.[0] || "https://via.placeholder.com/150"}
                                    alt={selectedSolicitud.pet?.name}
                                    className={styles.modalImage}
                                />

                                <p>
                                    <strong>Nombre:</strong> {selectedSolicitud.pet?.name}
                                </p>

                                <p>
                                    <strong>Tipo:</strong> {selectedSolicitud.pet?.species}
                                </p>

                                <p>
                                    <strong>Edad:</strong> {selectedSolicitud.pet?.age}
                                </p>

                            </div>

                            <div className={styles.infoCard}>

                                <h3 className={styles.infoTitle}>
                                    Adoptante
                                </h3>

                                <p>
                                    <strong>Nombre:</strong> {selectedSolicitud.adopter?.name}
                                </p>

                                <p>
                                    <strong>Email:</strong> {selectedSolicitud.adopter?.email}
                                </p>

                                <p>
                                    <strong>Teléfono:</strong> {selectedSolicitud.adopter?.phone}
                                </p>

                                <div className={styles.dateSection}>

                                    <h3 className={styles.infoTitle}>
                                        Fecha de Solicitud
                                    </h3>

                                    <p>{selectedSolicitud.date}</p>

                                </div>

                                <span
                                    className={
                                        selectedSolicitud.status === "PENDING"
                                        ? styles.pendingBadge
                                        : selectedSolicitud.status === "APPROVED"
                                        ? styles.approvedBadge
                                        : styles.rejectedBadge
                                    }
                                >
                                    Estado: {selectedSolicitud.status}
                                </span>

                            </div>

                        </div>

                        <div className={styles.modalButtons}>

                            {selectedSolicitud.status === "PENDING" && (
                                <>
                                    <button
                                        className={styles.closeButton}
                                        onClick={() => setShowDetail(false)}
                                    >
                                        Cerrar
                                    </button>

                                    <button
                                        className={styles.rejectButton}
                                        onClick={() => rechazarSolicitud(selectedSolicitud.id)}
                                    >
                                        Rechazar
                                    </button>

                                    <button
                                        className={styles.approveButton}
                                        onClick={() => aprobarSolicitud(selectedSolicitud.id)}
                                    >
                                        Aprobar
                                    </button>
                                </>
                            )}
                            {selectedSolicitud.status !== "PENDING" &&(
                                <button
                                    className={styles.closeButton}
                                    onClick={() => setShowDetail(false)}
                                >
                                    Cerrar
                                </button>
                            )}

                        </div>
                    </div>

                </div>

            )}


        </div>
    );
}