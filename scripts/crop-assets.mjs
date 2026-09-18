import sharp from 'sharp'
import {mkdir} from 'node:fs/promises'

const sources=[
 ['C:/Users/Administrator/.codex/generated_images/01a04b64-6005-7563-894c-aeaed5bbed4f/exec-8dd1bb74-c99c-4c71-a4dd-b241a5763d3f.png',1],
 ['C:/Users/Administrator/.codex/generated_images/01a04b64-6005-7563-894c-aeaed5bbed4f/exec-d987eef0-06b1-48dd-b01b-15455cfaf677.png',11],
 ['C:/Users/Administrator/.codex/generated_images/01a04b64-6005-7563-894c-aeaed5bbed4f/exec-418ba49f-6db9-4248-a5b8-a5e89efe37a7.png',21],
 ['C:/Users/Administrator/.codex/generated_images/01a04b64-6005-7563-894c-aeaed5bbed4f/exec-096e9ecd-db37-482a-b89d-c7a9e0316563.png',31]
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
