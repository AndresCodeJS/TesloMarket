import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { jwt } from '../../../utils';


export async function middleware( req: NextRequest | any, ev: NextFetchEvent ) {

    const { token = "" } = req.cookies;

    const {userId, role} = await jwt.isValidToken(token)

    if(!userId){
        return new Response( JSON.stringify({ message: 'No autorizado' }), {
            status: 401,
            headers: {
                'Content-Type':'application/json'
            }
        });
    }

    const validRoles = ['admin','super-user','SEO'];
    if ( !validRoles.includes( role ) ) {
        return new Response( JSON.stringify({ message: 'No autorizado' }), {
            status: 401,
            headers: {
                'Content-Type':'application/json'
            }
        });
    }



   /*  const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if ( !session ) {
        return new Response( JSON.stringify({ message: 'No autorizado' }), {
            status: 401,
            headers: {
                'Content-Type':'application/json'
            }
        });
    }

    const validRoles = ['admin','super-user','SEO'];
    if ( !validRoles.includes( session.user.role ) ) {
        return new Response( JSON.stringify({ message: 'No autorizado' }), {
            status: 401,
            headers: {
                'Content-Type':'application/json'
            }
        });
    } */


    return NextResponse.next();

}


