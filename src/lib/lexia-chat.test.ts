import { describe, expect, it } from "vitest";
import { isOfficialUrl, textOf } from "./lexia-chat";
describe("Fuentes paraguayas de Lexia", () => {
  it("acepta las fuentes oficiales solicitadas", () => {
    for (const url of [
      "https://www.bacn.gov.py/leyes-paraguayas",
      "https://www.pj.gov.py/",
      "https://www.csj.gov.py/gestion/",
      "https://www.csj.gov.py/portal",
      "https://apps.csj.gov.py/login",
      "https://apps.csj.gov.py/ingresos-judiciales",
      "https://www.csj.gov.py/jurisprudencia/",
      "https://www.csj.gov.py/legislacion/",
    ])
      expect(isOfficialUrl(url)).toBe(true);
  });
  it("rechaza suplantaciones y enlaces inseguros", () => {
    for (const url of [
      "https://csj.gov.py.ejemplo.com",
      "http://www.bacn.gov.py",
      "javascript:alert(1)",
    ])
      expect(isOfficialUrl(url)).toBe(false);
  });
  it("recupera todos los textos de una intervención sin incluir herramientas", () => {
    expect(
      textOf([
        { type: "text", text: "Contrato" },
        { type: "source-url", sourceId: "1", url: "https://www.bacn.gov.py" },
        { type: "text", text: "Laboral" },
      ]),
    ).toBe("Contrato\nLaboral");
  });
});
