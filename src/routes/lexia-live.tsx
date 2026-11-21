import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/lib/seo';
import { SectionTitle } from '@/components/lexia/shared';
import { VoiceCall } from '@/components/lexia/VoiceCall';
export const Route=createFileRoute('/lexia-live')({head:()=>pageHead('Lexia Live — Voz jurídica LEX IA','Conversaciones de voz con investigación oficial paraguaya en www.lexiapy.com.'),component:()=> <div className="py-6"><SectionTitle kicker="www.lexiapy.com · Lexia Live" title="Voz jurídica LEX IA" sub="Consultas orales con fundamentos verificables y supervisión humana."/><VoiceCall/></div>});
