import sharp from 'sharp'
import {mkdir} from 'node:fs/promises'

const sources=[
 ['C:/Users/Administrator/.codex/generated_images/01a04b64-6005-7563-894c-aeaed5bbed4f/exec-92fc6cb2-a5b5-4671-86fe-1940f5cec639.png',1],
 ['C:/Users/Administrator/.codex/generated_images/01a04b64-6005-7563-894c-aeaed5bbed4f/exec-9bad8b92-d475-40fd-9e8e-5cd47230ec20.png',11],
 ['C:/Users/Administrator/.codex/generated_images/01a04b64-6005-7563-894c-aeaed5bbed4f/exec-9644a166-a797-4e30-9826-2922fe281f7c.png',21],
 ['C:/Users/Administrator/.codex/generated_images/01a04b64-6005-7563-894c-aeaed5bbed4f/exec-feb35b4b-b9da-443b-a6f2-5ed239e3c9f9.png',31]
]
await mkdir('public/products',{recursive:true})
for(const [source,start] of sources){
 const meta=await sharp(source).metadata(); const tileW=Math.floor(meta.width/5); const tileH=Math.floor(meta.height/2)
 for(let i=0;i<10;i++){
  const left=(i%5)*tileW, top=Math.floor(i/5)*tileH
  await sharp(source).extract({left,top,width:tileW,height:tileH}).resize(720,720,{fit:'cover'}).webp({quality:86}).toFile(`public/products/product-${String(start+i).padStart(2,'0')}.webp`)
 }
}
console.log('Generated 40 WebP product assets')
