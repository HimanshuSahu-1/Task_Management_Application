import { tasks } from '../data';
import { NextResponse } from 'next/server';

// GET /api/tasks/[id]
export async function GET(request, { params }) {
  try {
    const id = await params.id;
    const task = tasks.find(t => t.id === id);
    
    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch task' },
      { status: 500 }
    );
  }
}

// PUT /api/tasks/[id]
export async function PUT(request, { params }) {
  try {
    const id = await params.id;
    const body = await request.json();
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    if (body.title && typeof body.title !== 'string') {
      return NextResponse.json(
        { error: 'Title must be a string' },
        { status: 400 }
      );
    }

    if (body.status && !['pending', 'done'].includes(body.status)) {
      return NextResponse.json(
        { error: 'Status must be either "pending" or "done"' },
        { status: 400 }
      );
    }
    
    const updatedTask = {
      ...tasks[taskIndex],
      title: body.title ? body.title.trim() : tasks[taskIndex].title,
      status: body.status ?? tasks[taskIndex].status
    };
    
    tasks[taskIndex] = updatedTask;
    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

// DELETE /api/tasks/[id]
export async function DELETE(request, { params }) {
  try {
    const id = await params.id;
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }
    
    const deletedTask = tasks[taskIndex];
    tasks.splice(taskIndex, 1);
    return NextResponse.json(deletedTask);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
} 