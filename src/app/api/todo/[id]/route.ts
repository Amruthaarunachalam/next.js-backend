import { NextRequest, NextResponse } from "next/server";
import { createTodo } from "@/schema/todo"; 
import { db } from "@/db/pg/client";
import { eq } from 'drizzle-orm';
import { todo } from "@/db/schema/todo";

export async function GET(
    request:NextRequest,
    {params}:{params:Promise<{id:string}>}
){
  try{
    const strid =await params;
    const id=Number(strid.id)
    const data=await db.select().from(todo).where(eq(todo.id,id))
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

       const ExisingData=await db.select().from(todo).where(eq(todo.id,id))
       if (! ExisingData){
        return NextResponse.json({ error: `the ${id} is not found` }, { status: 404 });
       }
       const updateData=await db.update(todo).set(validate.data).where(eq(todo.id,id)).returning()

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

     const ExisingData=await db.select().from(todo).where(eq(todo.id,id))

       if (! ExisingData){
        return NextResponse.json({ error: `the ${id} is not found` }, { status: 404 });
       }
    
       const deleteData = await db.delete(todo).where(eq(todo.id,id))
       return  NextResponse.json({ message: `the ${id} is deleted` }, { status: 200 })

        }catch{        
           return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
        }
}