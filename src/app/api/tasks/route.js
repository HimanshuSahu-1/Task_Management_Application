import { tasks } from './data';
import { NextResponse } from 'next/server';

// GET /api/tasks
export async function GET() {
  try {
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST /api/tasks
export async function POST(request) {
  try {
    const body = await request.json();
    
    if (!body.title || typeof body.title !== 'string') {
      return NextResponse.json(
        { error: 'Title is required and must be a string' },
        { status: 400 }
      );
    }

    const newTask = {
      id: Date.now().toString(),
      title: body.title.trim(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}