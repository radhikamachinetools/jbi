import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../lib/db';
import { getAdminSession } from '../../lib/admin-session';
import { normalizeMongoDocuments } from '../../lib/mongo-utils';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const categories = await db.collection('jbi_categories')
      .find({})
      .sort({ displayOrder: 1 })
      .toArray();

    return NextResponse.json({ success: true, categories: normalizeMongoDocuments(categories) });
  } catch (error) {
    console.error('GET categories error:', error);
    return NextResponse.json({ success: false, categories: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!(await getAdminSession())) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const newCategory = await request.json();
    const slug = newCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const { db } = await connectToDatabase();

    const categoryData = {
      name: newCategory.name,
      slug,
      status: newCategory.status || 'active',
      displayOrder: parseInt(newCategory.displayOrder) || 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('jbi_categories').insertOne(categoryData);
    const createdCategory = { ...categoryData, _id: result.insertedId.toString(), id: result.insertedId.toString() };
    return NextResponse.json({ success: true, category: createdCategory });
  } catch (error) {
    console.error('POST categories error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create category' }, { status: 500 });
  }
}
