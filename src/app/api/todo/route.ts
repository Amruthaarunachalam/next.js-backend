import { NextRequest, NextResponse } from "next/server";
import { createTodo } from "@/validation/todo"; 
import { db } from "@/db/pg/client";
import { asc } from 'drizzle-orm';
import { todo } from "@/db/schema/todo";

export async function GET() {
  try {
    const todos = await db.select().from(todo).orderBy(asc(todo.id))
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validate = createTodo.safeParse(body);

    if (!validate.success) {
      return NextResponse.json(
        { errors: validate.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

     const newTodo = await db.insert(todo).values(validate.data).returning();

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 });
  }
}