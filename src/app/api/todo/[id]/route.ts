import { NextRequest, NextResponse } from "next/server";
import { createTodo } from "@/schema/todo"; 
import { prisma } from "@/lib/prisma";

export async function GET(
    request:NextRequest,
    {params}:{params:Promise<{id:string}>}
){
  try{
    const strid =await params;
    const id=Number(strid.id)
    const data=await prisma.todo.findUnique({where:{id}})
    if (!data){
        return NextResponse.json({ error: `the ${id} is not found` }, { status: 404 });
    }
    return NextResponse.json(data)
   }catch{
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function PUT(
    request:NextRequest,
    {params}:{params:Promise<{id:string}>}
){
    try{
        const strid =await params;
        const id=Number(strid.id)
       
       const body = await request.json();
       const validate = createTodo.safeParse(body);

      if (!validate.success) {
          return NextResponse.json(
        { errors: validate.error.flatten().fieldErrors },
        { status: 400 }
      ); }

       const ExisingData=await prisma.todo.findUnique({where:{id}})
       if (! ExisingData){
        return NextResponse.json({ error: `the ${id} is not found` }, { status: 404 });
       }
       const updateData=await prisma.todo.update({where:{id},data:validate.data})

       return NextResponse.json(updateData)
    

    }catch{
        return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
    }
}

export async function DELETE(
     request:NextRequest,
    {params}:{params:Promise<{id:string}>}
){ 
    try{
    const strid =await params;
    const id=Number(strid.id)

     const ExisingData=await prisma.todo.findUnique({where:{id}})

       if (! ExisingData){
        return NextResponse.json({ error: `the ${id} is not found` }, { status: 404 });
       }
    
       const deleteData = await prisma.todo.delete({where:{id}})
       return  NextResponse.json({ message: `the ${id} is deleted` }, { status: 200 })

        }catch{        
           return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
        }
}