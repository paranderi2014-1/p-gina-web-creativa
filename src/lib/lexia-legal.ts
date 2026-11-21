import { z } from "zod";
import { isOfficialUrl } from "./lexia-chat";
export const officialUrlSchema = z.string().url().max(2000).refine(isOfficialUrl, "Usá un enlace HTTPS de BACN, Poder Judicial o CSJ.");
export const librarySchema = z.object({ id: z.string().uuid().optional(), kind: z.enum(["ley","fallo","fuente"]), title: z.string().trim().min(3).max(500), official_url: officialUrlSchema, content: z.string().max(200000), reference: z.string().max(500), chamber: z.string().max(200), subject: z.string().max(200), decision_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(), published: z.boolean() });
export const caseSchema = z.object({ id:z.string().uuid().optional(), title:z.string().trim().min(3).max(300), number:z.string().max(100), jurisdiction:z.string().max(100), court:z.string().max(250), district:z.string().max(150), status:z.enum(["Activo","Archivado","Finalizado"]), risk:z.enum(["Sin evaluar","Bajo","Medio","Alto"]), summary:z.string().max(20000), people:z.string().max(10000), official_url:officialUrlSchema });
export const entrySchema = z.object({ case_id:z.string().uuid(), kind:z.enum(["actuacion","tarea","documento"]), title:z.string().trim().min(2).max(300), body:z.string().max(20000), due_date:z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(), official_url:z.union([officialUrlSchema,z.literal("")]), file_path:z.string().max(500).nullable() });
export const csjSearchSchema = z.object({ q:z.string().trim().max(300).default(""), sala:z.string().max(200).default(""), materia:z.string().max(200).default(""), year:z.string().regex(/^\d{4}$|^$/).default(""), number:z.string().regex(/^\d{1,8}$|^$/).default(""), page:z.number().int().min(0).max(10000).default(0) });
export type CsjSearch = z.infer<typeof csjSearchSchema>;
export function referenceUrl(code:number) { return `https://www.csj.gov.py/jurisprudencia/home/Detalle?codigo=${code}`; }
export function documentUrl(code:number) { return `https://www.csj.gov.py/jurisprudencia/home/DocumentoJurisprudencia?codigo=${code}`; }
export function libraryContext(rows:Array<{title:string;content:string;official_url:string;reference:string;reviewed_at:string}>) {
 return rows.map(r=>JSON.stringify({titulo:r.title,texto:r.content,fuente:r.official_url,referencia:r.reference,revisado:r.reviewed_at})).join("\n");
}
