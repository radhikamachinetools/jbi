import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db';
import { getAdminSession } from '../../../lib/admin-session';
import { buildIdFilter } from '../../../lib/mongo-utils';

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await getAdminSession())) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { db } = await connectToDatabase();
    await db.collection('jbi_contacts').deleteOne(buildIdFilter(id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to delete contact' }, { status: 500 });
  }
}
