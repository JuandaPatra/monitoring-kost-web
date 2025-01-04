// app/api/leads/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  const response = await axios.get('http://localhost:8000/api/leads');
  return NextResponse.json(response.data.data);
}