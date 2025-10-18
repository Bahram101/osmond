// api/category/create
export async function POST(req: Request){
  try{
    const data = await req.json()
    console.log("ddd",data);
  }catch(e){

  }
}