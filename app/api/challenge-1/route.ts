import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'assets', 'input1.txt');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    return new NextResponse(fileContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    console.error('Error reading file:', error);
    return new NextResponse('Error reading file', { status: 500 });
  }
}
