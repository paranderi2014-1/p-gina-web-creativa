import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { librarySchema,csjSearchSchema,type CsjSearch } from "./lexia-legal";
export const adminStatus=createServerFn({method:'GET'}).middleware([requireSupabaseAuth]).handler(async({context})=>{const{data,error}=await context.supabase.rpc('has_role',{_user_id:context.userId,_role:'admin'});if(error)throw new Error('No se pudo verificar el acceso.');return data===true;});
export const getLibrary=createServerFn({method:'GET'}).middleware([requireSupabaseAuth]).handler(async({context})=>{const{data,error}=await context.supabase.from('legal_library').select('*').order('reviewed_at',{ascending:false});if(error)throw new Error('No se pudo leer la biblioteca.');return data;});
export const saveLibrary=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator((v:unknown)=>librarySchema.parse(v)).handler(async({context,data})=>{
 const{data:admin,error:roleError}=await context.supabase.rpc('has_role',{_user_id:context.userId,_role:'admin'});if(roleError||!admin)throw new Error('Solo administradores pueden publicar.');
 const {id,...item}=data;
 const values={...item,created_by:context.userId,reviewed_at:new Date().toISOString()};
 const result=id?await context.supabase.from('legal_library').update(values).eq('id',id).select('id').single():await context.supabase.from('legal_library').insert(values).select('id').single();if(result.error||!result.data)throw new Error('No se pudo guardar la publicación.');return result.data;
});
export const deleteLibrary=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator((v:unknown)=>z.object({id:z.string().uuid()}).parse(v)).handler(async({context,data})=>{const{data:admin}=await context.supabase.rpc('has_role',{_user_id:context.userId,_role:'admin'});if(!admin)throw new Error('Acceso restringido.');const{error}=await context.supabase.from('legal_library').delete().eq('id',data.id);if(error)throw new Error('No se pudo borrar.');return{ok:true};});
export const searchCsj=createServerFn({method:'POST'}).inputValidator((v:unknown)=>csjSearchSchema.parse(v)).handler(async({data})=>{try{const{searchOfficialCases}=await import('./lexia-csj.server');return{...await searchOfficialCases(data),error:''};}catch(e){console.error('Consulta CSJ',e instanceof Error?e.message:'Error');return{rows:[],total:0,checkedAt:new Date().toISOString(),error:'La CSJ no respondió a la consulta. No se sustituyeron resultados por ejemplos.'};}});
export const getCsjDetail=createServerFn({method:'POST'}).inputValidator((v:unknown)=>z.object({code:z.number().int().positive()}).parse(v)).handler(async({data})=>{const{officialCaseDetail}=await import('./lexia-csj.server');return officialCaseDetail(data.code);});
export const csjOptions=(p:CsjSearch)=>queryOptions({queryKey:['csj-official',p],queryFn:()=>searchCsj({data:p}),staleTime:60000});
export const adminOptions=()=>queryOptions({queryKey:['admin-status'],queryFn:()=>adminStatus()});
export const libraryOptions=()=>queryOptions({queryKey:['legal-library'],queryFn:()=>getLibrary()});
