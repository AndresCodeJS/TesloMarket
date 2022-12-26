import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { jwt } from '../../utils';


export async function middleware( req: NextRequest | any, ev: NextFetchEvent ) {

    const { token = "" } = req.cookies;

    const {userId, role} = await jwt.isValidToken(token)

    if ( !userId ) {
        const requestedPage = req.page.name;
        return NextResponse.redirect(`/auth/login?p=${ requestedPage }`);
    }

    const validRoles = ['admin','super-user','SEO'];

    if ( !validRoles.includes( role ) ) {
        return NextResponse.redirect('/');
    }



   /*  const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if ( !session ) {
        const requestedPage = req.page.name;
        return NextResponse.redirect(`/auth/login?p=${ requestedPage }`);
    }

    const validRoles = ['admin','super-user','SEO'];

    if ( !validRoles.includes( session.user.role ) ) {
        return NextResponse.redirect('/');
    }
 */

    return NextResponse.next();



}


