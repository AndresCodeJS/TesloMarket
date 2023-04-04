import type { NextPage, GetServerSideProps } from 'next';
import { Typography,Box } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';
import {useSearch} from '../../hooks/index'

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';
import { useRouter } from 'next/router';
import { FullScreenLoading } from '../../components/ui';


/* interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query: string;
} */


/* const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => { */
    const SearchPage: NextPage = () => {

        const router = useRouter()
        const { searchTerm } = router.query

const [products,searching] = useSearch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/search/${searchTerm}`, searchTerm)

  return (
    <ShopLayout title={'Teslo-Market - Search'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
        <Typography variant='h1' component='h1'>Buscar productos</Typography>

        {searching?<FullScreenLoading/>:
            products.length>0 
                ? <><Typography variant='h2' sx={{ mb: 1 }} textTransform="capitalize">Término: { searchTerm }</Typography>
                  <ProductList products={ products } />
                  </>
                : (
                    <Box display='flex'>
                        <Typography variant='h2' sx={{ mb: 1 }}>No encontramos ningún produto</Typography>
                        <Typography variant='h2' sx={{ ml: 1 }} color="secondary" textTransform="capitalize">{ searchTerm }</Typography>
                    </Box>
                )
        }
        
    </ShopLayout>
  )
}



// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
/* export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
    const { query = '' } = params as { query: string };

    if ( query.length === 0 ) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    // y no hay productos
    let products = await dbProducts.getProductsByTerm( query );
    const foundProducts = products.length > 0;

    // TODO: retornar otros productos
    if ( !foundProducts ) {
        // products = await dbProducts.getAllProducts(); 
        products = await dbProducts.getProductsByTerm('shirt');
    }

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
} */


export default SearchPage
