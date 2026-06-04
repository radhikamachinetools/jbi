import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db';
import { getAdminSession } from '../../../lib/admin-session';
import { buildIdFilter, normalizeMongoDocument } from '../../../lib/mongo-utils';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await getAdminSession())) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const certificateData = await request.json();
    const { db } = await connectToDatabase();

    const updateData = {
      title: certificateData.title || '',
      description: certificateData.description || '',
      imageUrl: certificateData.imageUrl,
      displayOrder: parseInt(certificateData.displayOrder) || 1,
      status: certificateData.status || 'active',
      updatedAt: new Date()
    };

    const result = await db.collection('jbi_certificates').updateOne(buildIdFilter(id), { $set: updateData });

    if (result.matchedCount > 0) {
      return NextResponse.json({ success: true, certificate: normalizeMongoDocument({ _id: id, ...updateData }) });
    }
    return NextResponse.json({ success: false, error: 'Certificate not found' }, { status: 404 });
  } catch (error) {
    console.error('Error updating certificate:', error);
    return NextResponse.json({ success: false, error: 'Failed to update certificate' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await getAdminSession())) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { db } = await connectToDatabase();

    const result = await db.collection('jbi_certificates').deleteOne(buildIdFilter(id));

    if (result.deletedCount > 0) {
      return NextResponse.json({ success: true, message: 'Certificate deleted successfully' });
    }
    return NextResponse.json({ success: false, error: 'Certificate not found' }, { status: 404 });
  } catch (error) {
    console.error('Error deleting certificate:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete certificate' }, { status: 500 });
  }
}
