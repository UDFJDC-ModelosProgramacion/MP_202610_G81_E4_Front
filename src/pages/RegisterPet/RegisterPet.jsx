import { PawPrint, Menu } from "lucide-react";
import style from "./RegisterPet.module.css";

export const RegisterPet = () => {
  return (
    <div className={style.container}>

      <div className={style.card}>

        {/* HEADER */}
        <div className={style.topbar}>
          <PawPrint size={32} color="#8b5cf6" />
          <h2>Registrar mascota</h2>
          <Menu size={32} color="#6b7280" />
        </div>

        {/* BODY */}
        <div className={style.content}>
          <h1>Registro de Mascota</h1>

          <div className={style.field}>
            <label>Nombre</label>
            <input type="text" placeholder="Max" />
          </div>

          <div className={style.field}>
            <label>Especie</label>
            <select>
              <option>Perro</option>
              <option>Gato</option>
            </select>
          </div>

          <div className={style.field}>
            <label>Raza</label>
            <input type="text" placeholder="Labrador" />
          </div>

          <div className={style.field}>
            <label>Edad</label>
            <select>
              <option>5</option>
              <option>3</option>
              <option>1</option>
            </select>
          </div>

          <div className={style.field}>
            <label>Estado</label>
            <select>
              <option>Disponible</option>
              <option>Adoptado</option>
            </select>
          </div>

          <button className={style.saveBtn}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};