import { useEffect, useState } from "react";
import {
    Eye,
    AlertCircle,
    Building2,
    Filter
} from "lucide-react";

import styles from "./SuperviseRequests.module.css";

export function SuperviseRequests(){

    const [solicitudes, setSolicitudes] = useState([]);
    const [selectedSolicitud, setSelectedSolicitud] = useState(null);
    const [showDetail, setShowDetail] = useState(false);
    const [filtroEstado, setFiltroEstado] = useState("TODOS");
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {

        const cargarSolicitudes = async () => {

            try{

                const response = await fetch(
                    "http://localhost:8080/api/adoption-requests"
                );

                if(!response.ok){
                    throw new Error("Error cargando solicitudes");
                }

                const data = await response.json();

                setSolicitudes(data);
                console.log(data);
                console.log(data[0]);

            }catch(error){

                console.error(error);
                alert("No se pudieron cargar las solicitudes");

            }

        };

        cargarSolicitudes();

    }, []);

    const calcularDiasPendiente = (fecha) => {

        if(!fecha){
            return 0;
        }

        const hoy = new Date();
        const fechaSolicitud = new Date(fecha);

        const diferencia =
            hoy.getTime() - fechaSolicitud.getTime();

        return Math.floor(
            diferencia / (1000 * 60 * 60 * 24)
        );

    };

    const solicitudesFiltradas = solicitudes.filter(
        (solicitud) => {

            const coincideEstado = filtroEstado === "TODOS" || solicitud.status === filtroEstado;
            const textoBusqueda = busqueda.toLowerCase();
            const coincideBusqueda = solicitud.id?.toString().includes(textoBusqueda) || solicitud.pet?.name?.toLowerCase().includes(textoBusqueda) 
                                     || solicitud.adopter?.name?.toLowerCase().includes(textoBusqueda) || solicitud.pet?.shelter?.name?.toLowerCase().includes(textoBusqueda);
            return coincideEstado && coincideBusqueda;

        }
    );

    const solicitudesSinGestion = solicitudes.filter(
        (solicitud) => {

            const dias =
                calcularDiasPendiente(
                    solicitud.createdAt || solicitud.date
                );

            return (
                solicitud.status === "PENDING" &&
                dias > 7
            );

        }
    );

    return(

        <div className={styles.appContainer}>

            <div className={styles.mainContent}>

                <h1 className={styles.title}>
                    Supervisar Solicitudes
                </h1>

                {solicitudesSinGestion.length > 0 && (

                    <div className={styles.warningBox}>

                        <div className={styles.warningContent}>

                            <AlertCircle size={22}/>

                            <div>

                                <p className={styles.warningTitle}>
                                    Solicitudes sin gestión
                                </p>

                                <p>
                                    Hay {
                                        solicitudesSinGestion.length
                                    } solicitudes pendientes
                                    por más de 7 días.
                                </p>

                            </div>

                        </div>

                    </div>

                )}

                <div className={styles.statsGrid}>

                    <div className={styles.statCard}>

                        <p>Total</p>

                        <h2>
                            {solicitudes.length}
                        </h2>

                    </div>

                    <div className={styles.statCardPending}>

                        <p>Pendientes</p>

                        <h2>
                            {
                                solicitudes.filter(
                                    solicitud =>
                                        solicitud.status === "PENDING"
                                ).length
                            }
                        </h2>

                    </div>

                    <div className={styles.statCardApproved}>

                        <p>Aprobadas</p>

                        <h2>
                            {
                                solicitudes.filter(
                                    solicitud =>
                                        solicitud.status === "APPROVED"
                                ).length
                            }
                        </h2>

                    </div>

                    <div className={styles.statCardRejected}>

                        <p>Rechazadas</p>

                        <h2>
                            {
                                solicitudes.filter(
                                    solicitud =>
                                        solicitud.status === "REJECTED"
                                ).length
                            }
                        </h2>

                    </div>

                </div>

                <div className={styles.filterContainer}>

                    <div className={styles.filterHeader}>

                        <Filter size={18}/>

                        <h3>
                            Filtrar solicitudes
                        </h3>

                    </div>
                    <div className={styles.filterControls}>
                            <input
                                type="text"
                                placeholder="Buscar por ID, mascota, adoptante o refugio"
                                className={styles.searchInput}
                                value={busqueda}
                                onChange={(e) => 
                                    setBusqueda(e.target.value)
                                }
                            />
                            <select
                                className={styles.select}
                                value={filtroEstado}
                                onChange={(e) =>
                                    setFiltroEstado(e.target.value)
                                }
                            >

                                <option value="TODOS">
                                    Todos
                                </option>

                                <option value="PENDING">
                                    Pendientes
                                </option>

                                <option value="APPROVED">
                                    Aprobadas
                                </option>

                                <option value="REJECTED">
                                    Rechazadas
                                </option>

                            </select>

                         </div>
                    
                </div>

                <div className={styles.tableContainer}>

                    <div className={styles.tableHeader}>

                        <h2>
                            Solicitudes de la Plataforma
                        </h2>

                    </div>

                    <table className={styles.table}>

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>Mascota</th>
                                <th>Adoptante</th>
                                <th>Refugio</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th>Días Pendiente</th>
                                <th>Acciones</th>

                            </tr>

                        </thead>

                        <tbody>

                            {solicitudesFiltradas.map(
                                (solicitud) => {

                                    const diasPendiente =
                                        calcularDiasPendiente(
                                            solicitud.createdAt ||
                                            solicitud.date
                                        );

                                    return(

                                        <tr
                                            key={solicitud.id}
                                            className={
                                                diasPendiente > 7 &&
                                                solicitud.status === "PENDING"
                                                    ? styles.oldRequestRow
                                                    : ""
                                            }
                                        >

                                            <td>
                                                {solicitud.id}
                                            </td>

                                            <td>

                                                <div className={styles.petCell}>

                                                    <img
                                                        src={
                                                            solicitud.pet?.photos?.[0]
                                                            || "https://via.placeholder.com/150"
                                                        }
                                                        alt={
                                                            solicitud.pet?.name
                                                        }
                                                        className={styles.petImage}
                                                    />

                                                    <div>

                                                        <p className={styles.petName}>
                                                            {
                                                                solicitud.pet?.name
                                                            }
                                                        </p>

                                                        <p className={styles.petType}>
                                                            {
                                                                solicitud.pet?.species
                                                            }
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>

                                            <td>
                                                {
                                                    solicitud.adopter?.name
                                                    || "Sin adoptante"
                                                }
                                            </td>

                                            <td>

                                                <div className={styles.shelterCell}>

                                                    <Building2 size={16}/>

                                                    <span>
                                                        {
                                                            solicitud.pet?.shelter?.name
                                                            || "Sin refugio"
                                                        }
                                                    </span>

                                                </div>

                                            </td>

                                            <td>
                                                {
                                                    solicitud.createdAt
                                                    || solicitud.adoptionDate
                                                }
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

                                                {
                                                    solicitud.status === "PENDING"
                                                    ? `${diasPendiente} días`
                                                    : "-"
                                                }

                                            </td>

                                            <td>

                                                <button
                                                    className={styles.detailButton}
                                                    onClick={() => {

                                                        setSelectedSolicitud(
                                                            solicitud
                                                        );

                                                        setShowDetail(true);

                                                    }}
                                                >

                                                    <Eye size={16}/>

                                                    Ver Detalle

                                                </button>

                                            </td>

                                        </tr>

                                    );

                                }
                            )}

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
                                    src={
                                        selectedSolicitud.pet?.photos?.[0]
                                        || "https://via.placeholder.com/150"
                                    }
                                    alt={
                                        selectedSolicitud.pet?.name
                                    }
                                    className={styles.modalImage}
                                />

                                <p>
                                    <strong>Nombre:</strong>
                                    {" "}
                                    {selectedSolicitud.pet?.name}
                                </p>

                                <p>
                                    <strong>Tipo:</strong>
                                    {" "}
                                    {selectedSolicitud.pet?.species}
                                </p>

                                <p>
                                    <strong>Edad:</strong>
                                    {" "}
                                    {selectedSolicitud.pet?.age}
                                </p>

                            </div>

                            <div className={styles.infoCard}>

                                <h3 className={styles.infoTitle}>
                                    Adoptante
                                </h3>

                                <p>
                                    <strong>Nombre:</strong>
                                    {" "}
                                    {selectedSolicitud.adopter?.name}
                                </p>

                                <p>
                                    <strong>Email:</strong>
                                    {" "}
                                    {selectedSolicitud.adopter?.email}
                                </p>

                                <p>
                                    <strong>Teléfono:</strong>
                                    {" "}
                                    {selectedSolicitud.adopter?.phone}
                                </p>

                                <hr/>

                                <h3 className={styles.infoTitle}>
                                    Refugio
                                </h3>

                                <p>
                                    {
                                        selectedSolicitud.pet?.shelter?.name
                                        || "Sin refugio"
                                    }
                                </p>

                                <hr/>

                                <p>

                                    <strong>Estado:</strong>
                                    {" "}

                                    <span
                                        className={
                                            selectedSolicitud.status === "PENDING"
                                            ? styles.pendingBadge
                                            : selectedSolicitud.status === "APPROVED"
                                            ? styles.approvedBadge
                                            : styles.rejectedBadge
                                        }
                                    >

                                        {selectedSolicitud.status}

                                    </span>

                                </p>

                            </div>

                        </div>

                        <div className={styles.modalButtons}>

                            <button
                                className={styles.closeButton}
                                onClick={() =>
                                    setShowDetail(false)
                                }
                            >

                                Cerrar

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}