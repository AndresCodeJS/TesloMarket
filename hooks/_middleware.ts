import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { jwt } from '../utils';

export async function middleware( req: NextRequest | any, ev: NextFetchEvent ) {
    
    return NextResponse.next();

}


