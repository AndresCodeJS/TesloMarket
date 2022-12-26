import jwt from 'jsonwebtoken';


export const signToken = ( _id: string, email: string, role:string ) => {

    if ( !process.env.JWT_SECRET_SEED ) {
        throw new Error('No hay semilla de JWT - Revisar variables de entorno');
    }

    return jwt.sign(
        // payload
        { _id, email, role },

        // Seed
        process.env.JWT_SECRET_SEED,

        // Opciones
        { expiresIn: '30d' }
    )

}



export const isValidToken = ( token: string ):Promise<{userId:string,role:string}> => {
    console.log('entro en isvalidtoken')
    if ( !process.env.JWT_SECRET_SEED ) {
        throw new Error('No hay semilla de JWT - Revisar variables de entorno');
    }

    if ( token.length <= 10 ) {
        return Promise.reject('JWT no es válido');
    }

    return new Promise( (resolve, reject) => {

        console.log('pasa por la promesa, con el token :', token, process.env.JWT_SECRET_SEED)

        try {
             jwt.verify( token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
                if ( err ) return reject('JWT no es válidooo');

                console.log('proceso EXITOSOOO', payload)

                const { _id , role } = payload as { _id: string, role: string};

                resolve({userId: _id, role});

            })
        } catch (error) {
            reject('JWT no es válido');
        }


    })

}

