export interface Pais {
  codigo: string;
  nombre: string;
  bandera: string;
  ruta: string;
}

export const PAISES: Pais[] = [
  { codigo: "mx", nombre: "México", bandera: "🇲🇽", ruta: "/" },
  { codigo: "co", nombre: "Colombia", bandera: "🇨🇴", ruta: "/co" },
];
