import { NextResponse } from 'next/server';
import { getAdminSession } from '../../../lib/admin-session';

export async function GET() {
  const isAuthenticated = await getAdminSession();
  return NextResponse.json({ authenticated: isAuthenticated });
}
