import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import styles from "./ManageRequests.module.css";

export function ManageRequests(){
    //por ahora en comentario pero al completar las conexiones con el back esto se suara para pedir las solicitudes
    //const[solicitudes, setSolicitudes] = useState([]);
   /* useEffect(() => {
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
    console.log(solicitudes);*/
    const solicitudesData = [
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
    ];
    const [solicitudes, setSolicitudes] = useState(solicitudesData);
    const [selectedSolicitud, setSelectedSolicitud] = useState(null);
    const [showDetail, setShowDetail] = useState(false);
    const aprobarSolicitud = (id) => {
        const nuevasSolicitudes = solicitudes.map((solicitud) =>
            solicitud.id == id
                ? { ...solicitud, estado: "Aprobada"}
                :solicitud
        );
        setSolicitudes(nuevasSolicitudes);
        setShowDetail(false);
    };
    const rechazarSolicitud = (id) => {
        const nuevasSolicitudes = solicitudes.map((solicitud) => 
            solicitud.id === id
                ? { ...solicitud, estado: "Rechazada"}
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
                                    solicitud => solicitud.estado === "Pendiente"
                                ).length
                            }
                        </h2>
                    </div>

                    <div className={styles.statCardApproved}>
                        <p>Aprobadas</p>
                        <h2>
                            {
                                solicitudes.filter(
                                    solicitud => solicitud.estado === "Aprobada"
                                ).length
                            }
                        </h2>
                    </div>

                    <div className={styles.statCardRejected}>
                        <p>Rechazadas</p>
                        <h2>
                            {
                                solicitudes.filter(
                                    solicitud => solicitud.estado === "Rechazada"
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
                                                src={solicitud.mascota.imagen}
                                                alt={solicitud.mascota.nombre}
                                                className={styles.petImage}
                                            />

                                            <div>
                                                <p className={styles.petName}>
                                                    {solicitud.mascota.nombre}
                                                </p>

                                                <p className={styles.petType}>
                                                    {solicitud.mascota.tipo}
                                                </p>
                                            </div>

                                        </div>

                                    </td>

                                    <td>
                                        {solicitud.adoptante.nombre}
                                    </td>

                                    <td>
                                        {solicitud.fecha}
                                    </td>

                                    <td>

                                        <span
                                            className={
                                                solicitud.estado === "Pendiente"
                                                ? styles.pendingBadge
                                                : solicitud.estado === "Aprobada"
                                                ? styles.approvedBadge
                                                : styles.rejectedBadge
                                            }
                                        >
                                            {solicitud.estado}
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
                                    src={selectedSolicitud.mascota.imagen}
                                    alt={selectedSolicitud.mascota.nombre}
                                    className={styles.modalImage}
                                />

                                <p>
                                    <strong>Nombre:</strong> {selectedSolicitud.mascota.nombre}
                                </p>

                                <p>
                                    <strong>Tipo:</strong> {selectedSolicitud.mascota.tipo}
                                </p>

                                <p>
                                    <strong>Edad:</strong> {selectedSolicitud.mascota.edad}
                                </p>

                            </div>

                            <div className={styles.infoCard}>

                                <h3 className={styles.infoTitle}>
                                    Adoptante
                                </h3>

                                <p>
                                    <strong>Nombre:</strong> {selectedSolicitud.adoptante.nombre}
                                </p>

                                <p>
                                    <strong>Email:</strong> {selectedSolicitud.adoptante.email}
                                </p>

                                <p>
                                    <strong>Teléfono:</strong> {selectedSolicitud.adoptante.telefono}
                                </p>

                                <div className={styles.dateSection}>

                                    <h3 className={styles.infoTitle}>
                                        Fecha de Solicitud
                                    </h3>

                                    <p>{selectedSolicitud.fecha}</p>

                                </div>

                                <span
                                    className={
                                        selectedSolicitud.estado === "Pendiente"
                                        ? styles.pendingBadge
                                        : selectedSolicitud.estado === "Aprobada"
                                        ? styles.approvedBadge
                                        : styles.rejectedBadge
                                    }
                                >
                                    Estado: {selectedSolicitud.estado}
                                </span>

                            </div>

                        </div>

                        <div className={styles.modalButtons}>

                            {selectedSolicitud.estado === "Pendiente" && (
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
                            {selectedSolicitud.estado !== "Pendiente" &&(
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