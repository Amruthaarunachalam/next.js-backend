import { NextRequest, NextResponse } from "next/server";
import { createTodo } from "@/schema/todo"; 
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const todos = await prisma.todo.findMany({orderBy:{id:'asc'}});
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

    const newTodo = await prisma.todo.create({
      data: validate.data,
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 });
  }
}