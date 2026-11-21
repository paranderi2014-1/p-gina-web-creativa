export async function readLegalFile(file:File){
 if(file.size>20*1024*1024)throw new Error('El archivo supera 20 MB.');
 if(file.name.toLowerCase().endsWith('.txt'))return file.text();
 if(!file.name.toLowerCase().endsWith('.pdf'))throw new Error('Usá un archivo PDF o TXT.');
 const pdfjs=await import('pdfjs-dist');
 const worker=await import('pdfjs-dist/build/pdf.worker.min.mjs?url');pdfjs.GlobalWorkerOptions.workerSrc=worker.default;
 const pdf=await pdfjs.getDocument({data:new Uint8Array(await file.arrayBuffer()),isEvalSupported:false}).promise;
 try{let text='';for(let i=1;i<=pdf.numPages;i++){const page=await pdf.getPage(i);const content=await page.getTextContent();text+=content.items.flatMap(item=>'str'in item?[item.str]:[]).join(' ')+'\n';if(text.length>200000)throw new Error('El texto supera 200.000 caracteres; dividí el documento.');}if(text.trim().length<30)throw new Error('El PDF no contiene texto extraíble. Pegá una transcripción revisada.');return text;}finally{await pdf.destroy();}
}
