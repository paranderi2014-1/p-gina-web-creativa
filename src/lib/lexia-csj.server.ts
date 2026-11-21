import { load } from "cheerio";
import { z } from "zod";
import { referenceUrl,documentUrl,type CsjSearch } from "./lexia-legal";
const base="https://www.csj.gov.py/jurisprudencia";
const rowSchema=z.object({CodigoJurisprudencia:z.number(),NoResolucionJudicial:z.number(),CaratulaPublicacion:z.string().nullable(),FechaResolucionJudicial:z.string(),NormasReferencia:z.string().nullable(),TipoResolucionJudicial:z.object({DescripcionTipoResolucionJudicial:z.string()}),Sala:z.object({DescripcionSala:z.string()}),Materia:z.object({DescripMateria:z.string().nullable()}),TieneDocumento:z.boolean().optional()});
export async function searchOfficialCases(params:CsjSearch) {
 let cookie="";
 const call=async(path:string,body?:URLSearchParams)=>{
  const response=await fetch(`${base}${path}`,{method:body?'POST':'GET',headers:{...(cookie?{Cookie:cookie}:{}),...(body?{'Content-Type':'application/x-www-form-urlencoded','X-Requested-With':'XMLHttpRequest'}:{})},...(body?{body:body.toString()}:{}),signal:AbortSignal.timeout(25000),redirect:'error'});
  const setCookies=response.headers.getSetCookie?.()??[];
  if(setCookies.length)cookie=[cookie,...setCookies.map(c=>c.split(';')[0])].filter(Boolean).join('; ');
  if(!response.ok)throw new Error(`CSJ no disponible (${response.status}).`);
  return response;
 };
 const criteria=load(await (await call('/Home/Criterios')).text());
 const form=new URLSearchParams();
 const token=criteria('input[name="__RequestVerificationToken"]').val();if(typeof token==='string')form.set('__RequestVerificationToken',token);
 const option=(name:string,text:string)=>criteria(`select[name="${name}"] option`).toArray().find(el=>criteria(el).text().trim().toLowerCase()===text.toLowerCase());
 form.set('PalabrasTexto',params.q);form.set('Anno',params.year||(!params.q&&!params.number?String(new Date().getUTCFullYear()):''));form.set('Numero',params.number);form.set('TipoResolucion','');form.set('RangoFecha','');form.set('NormasReferencia','');
 for(const [name,text] of [['Salas',params.sala],['Materias',params.materia]]){if(!name||!text)continue;const el=option(name,text);if(el)form.set(name,criteria(el).attr('value')??'');}
 await call('/Home/Busqueda',form);
 const data=new URLSearchParams({draw:'1',start:String(params.page*10),length:'10','search[value]':'','search[regex]':'false','order[0][column]':'3','order[0][dir]':'desc'});
 ['CodigoJurisprudencia','TipoResolucionJudicial.DescripcionTipoResolucionJudicial','NoResolucionJudicial','FechaResolucionJudicial','CaratulaPublicacion','Sala.DescripcionSala'].forEach((n,i)=>{data.set(`columns[${i}][data]`,n);data.set(`columns[${i}][name]`,'');data.set(`columns[${i}][searchable]`,'true');data.set(`columns[${i}][orderable]`,'true');data.set(`columns[${i}][search][value]`,'');data.set(`columns[${i}][search][regex]`,'false');});
 const parsed=z.object({recordsFiltered:z.number(),data:z.array(rowSchema)}).parse(await (await call('/Jurisprudencias/GetData',data)).json());
 return {total:parsed.recordsFiltered,checkedAt:new Date().toISOString(),rows:parsed.data.map(r=>({id:r.CodigoJurisprudencia,title:r.CaratulaPublicacion??'Sin carátula publicada',reference:`${r.TipoResolucionJudicial.DescripcionTipoResolucionJudicial} N° ${r.NoResolucionJudicial}`,date:new Date(Number(r.FechaResolucionJudicial.match(/-?\d+/)?.[0])).toISOString().slice(0,10),chamber:r.Sala.DescripcionSala,subject:r.Materia.DescripMateria??'',legal:r.NormasReferencia??'',url:referenceUrl(r.CodigoJurisprudencia),pdf:r.TieneDocumento?documentUrl(r.CodigoJurisprudencia):null}))};
}
export async function officialCaseDetail(code:number) {
 const r=await fetch(`${base}/Home/Detalle?codigo=${code}`,{signal:AbortSignal.timeout(25000),redirect:'error'});if(!r.ok)throw new Error('No se pudo leer el fallo oficial.');const $=load(await r.text());$('script,style,nav,footer').remove();return {text:$('body').text().replace(/\s+/g,' ').trim().slice(0,45000),url:referenceUrl(code)};
}
