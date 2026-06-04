import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../lib/db';
import { getAdminSession } from '../../lib/admin-session';
import { normalizeMongoDocuments } from '../../lib/mongo-utils';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const certificates = await db.collection('jbi_certificates')
      .find({})
      .sort({ displayOrder: 1 })
      .toArray();

    return NextResponse.json({ success: true, certificates: normalizeMongoDocuments(certificates) });
  } catch (error) {
    console.error('GET certificates error:', error);
    return NextResponse.json({ success: false, certificates: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!(await getAdminSession())) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const certificateData = await request.json();
    const { db } = await connectToDatabase();

    const newCertificate = {
      title: certificateData.title || '',
      description: certificateData.description || '',
      imageUrl: certificateData.imageUrl,
      displayOrder: parseInt(certificateData.displayOrder) || 1,
      status: certificateData.status || 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('jbi_certificates').insertOne(newCertificate);
    const createdCertificate = { ...newCertificate, _id: result.insertedId.toString(), id: result.insertedId.toString() };
    return NextResponse.json({ success: true, certificate: createdCertificate });
  } catch (error) {
    console.error('POST certificates error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create certificate' }, { status: 500 });
  }
}
