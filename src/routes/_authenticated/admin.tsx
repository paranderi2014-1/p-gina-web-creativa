import {createFileRoute} from '@tanstack/react-router';
import {adminOptions,libraryOptions} from '@/lib/lexia-legal.functions';
import {AdminLibrary} from '@/components/lexia/AdminLibrary';
import {pageHead} from '@/lib/seo';
export const Route=createFileRoute('/_authenticated/admin')({head:()=>pageHead('Administración jurídica — LEX IA PY','Publicación y revisión de leyes, fallos y fuentes oficiales para Lexia en www.lexiapy.com.'),loader:async({context})=>{const admin=await context.queryClient.ensureQueryData(adminOptions());if(admin)await context.queryClient.ensureQueryData(libraryOptions());},component:AdminLibrary});
