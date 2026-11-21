import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { libraryContext } from "./lexia-legal";
export function publicLegalClient() {
 const url=process.env["SUPABASE_URL"]; const key=process.env["SUPABASE_PUBLISHABLE_KEY"];
 if(!url||!key) throw new Error("Biblioteca no disponible.");
 return createClient<Database>(url,key,{auth:{persistSession:false,autoRefreshToken:false},global:{fetch:(input,init)=>{const h=new Headers(init?.headers);if(h.get("Authorization")===`Bearer ${key}`)h.delete("Authorization");h.set("apikey",key);return fetch(input,{...init,headers:h});}}});
}
export async function publishedLegalContext(question:string) {
 const db=publicLegalClient();
 const terms=question.match(/[\p{L}\d]{4,}/gu)?.filter(x=>!['sobre','para','como','necesito','quiero','puede','fuente','oficial','paraguayo','paraguay'].includes(x.toLowerCase())).slice(0,12)??[];
 const {data:latest,error}=await db.from("legal_library").select("title,content,official_url,reference,reviewed_at").eq("published",true).order("reviewed_at",{ascending:false}).limit(20);
 if(error)throw new Error("No se pudo consultar la biblioteca actualizada.");
 const {data:related,error:relatedError}=terms.length?await db.from("legal_library").select("title,content,official_url,reference,reviewed_at").eq("published",true).or(terms.flatMap(t=>[`title.ilike.%${t}%`,`content.ilike.%${t}%`,`reference.ilike.%${t}%`]).join(',')).order("reviewed_at",{ascending:false}).limit(30):{data:[],error:null};
 if(relatedError)throw new Error("No se pudo recuperar la normativa pertinente.");
 const merged=[...(related??[]),...(latest??[])].filter((r,i,a)=>a.findIndex(x=>x.official_url===r.official_url&&x.reviewed_at===r.reviewed_at)===i);
 return libraryContext(merged.map(r=>({...r,content:r.content.slice(0,12000)}))).slice(0,90000);
}
