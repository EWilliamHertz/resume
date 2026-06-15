import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { adminKey } = await req.json();

    if (!adminKey) {
      return NextResponse.json(
        { authenticated: false, error: 'Missing admin key' },
        { status: 400 }
      );
    }

    // Compare with backend secret (never exposed to frontend)
    const validKey = process.env.ADMIN_KEY || 'admin123';
    
    if (adminKey === validKey) {
      return NextResponse.json({ authenticated: true }, { status: 200 });
    } else {
      return NextResponse.json(
        { authenticated: false, error: 'Invalid admin key' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { authenticated: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
