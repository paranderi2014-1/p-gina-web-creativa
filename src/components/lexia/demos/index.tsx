import { ComplianceDemo } from "./ComplianceDemo";
import { ContratosDemo } from "./ContratosDemo";
import { EjecutivosDemo } from "./EjecutivosDemo";
import { EscritosDemo } from "./EscritosDemo";
import { GestionDemo } from "./GestionDemo";
import { HonorariosDemo } from "./HonorariosDemo";
import { JurisprudenciaDemo } from "./JurisprudenciaDemo";
import { LitigiosDemo } from "./LitigiosDemo";
import { PrediccionDemo } from "./PrediccionDemo";
import { PrivacidadDemo } from "./PrivacidadDemo";
import { RevisionDemo } from "./RevisionDemo";
import { VigilanciaDemo } from "./VigilanciaDemo";

export {
  ComplianceDemo,
  ContratosDemo,
  EjecutivosDemo,
  EscritosDemo,
  GestionDemo,
  HonorariosDemo,
  JurisprudenciaDemo,
  LitigiosDemo,
  PrediccionDemo,
  PrivacidadDemo,
  RevisionDemo,
  VigilanciaDemo,
};

const BY_ID = [
  HonorariosDemo,
  JurisprudenciaDemo,
  VigilanciaDemo,
  ContratosDemo,
  EjecutivosDemo,
  ComplianceDemo,
  LitigiosDemo,
  PrediccionDemo,
  GestionDemo,
  EscritosDemo,
  RevisionDemo,
  PrivacidadDemo,
];

export function ModuleDemo({ id }: { id: number }) {
  const Demo = BY_ID[id - 1] ?? HonorariosDemo;
  return <Demo />;
}
