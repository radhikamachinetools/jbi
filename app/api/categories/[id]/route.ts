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
    const body = await request.json();
    const { name, status, displayOrder } = body;

    if (!name) {
      return NextResponse.json({ success: false, error: 'Category name is required' }, { status: 400 });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const { db } = await connectToDatabase();

    const updateData = { name, slug, status, displayOrder: parseInt(displayOrder) || 0, updatedAt: new Date() };

    const result = await db.collection('jbi_categories').updateOne(buildIdFilter(id), { $set: updateData });

    if (result.matchedCount > 0) {
      return NextResponse.json({ success: true, category: normalizeMongoDocument({ _id: id, ...updateData }) });
    }
    return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ success: false, error: 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await getAdminSession())) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { db } = await connectToDatabase();

    const result = await db.collection('jbi_categories').deleteOne(buildIdFilter(id));

    if (result.deletedCount > 0) {
      return NextResponse.json({ success: true, message: 'Category deleted successfully' });
    }
    return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete category' }, { status: 500 });
  }
}
