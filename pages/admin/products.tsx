import NextLink from "next/link";
import { AddOutlined, CategoryOutlined } from "@mui/icons-material";
import { Box, Button, CardMedia, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import useSWR from "swr";

import { AdminLayout } from "../../components/layouts";
import { IProduct } from "../../interfaces";
import { useAllProducts } from "../../hooks/useAllProducts";
import { FullScreenLoading } from "../../components/ui";

const columns: GridColDef[] = [
  {
    field: "img",
    headerName: "Foto",
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/product/${row.slug}`} target="_blank" rel="noreferrer">
          <CardMedia
            component="img"
            alt={row.title}
            className="fadeIn"
            image={
              row.img?.includes("cloudinary") ? row.img : `/products/${row.img}`
            }
          />
        </a>
      );
    },
  },
  {
    field: "title",
    headerName: "Title",
    width: 250,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <NextLink href={`/admin/product?slug=${row.slug}`} passHref>
          <Link underline="always">{row.title}</Link>
        </NextLink>
      );
    },
  },
  { field: "gender", headerName: "Género" },
  { field: "type", headerName: "Tipo" },
  { field: "inStock", headerName: "Inventario" },
  { field: "price", headerName: "Precio" },
  { field: "sizes", headerName: "Tallas", width: 250 },
];

const ProductsPage = () => {
  /*  const { data, error } = useSWR<IProduct[]>('/api/admin/products'); */

  const [products, getProducts] = useAllProducts(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/all`
  );

  /* if ( !data && !error ) return (<></>); */

  const rows = products.map((product) => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes?.join(", "),
    slug: product.slug,
  }));

  /* if(products[0]._id === ''){
        return <FullScreenLoading/>
    } */

  /*  const newProduct = 'new' */

  return (
    <AdminLayout
      title={`Productos (${products.length})`}
      subTitle={"Mantenimiento de productos"}
      icon={<CategoryOutlined />}
    >
      <Box display="flex" justifyContent="end">
        <NextLink href={`/admin/product?slug=new`} passHref>
          <Box
            display="flex"
            justifyContent="center"
            sx={{
              mb: 2,
              padding: 0.5,
              bgcolor: "#3A64D8",
              cursor: "pointer",
              width: "150px",
              borderRadius: "10px",
              '&:hover': {
                /* backgroundColor: 'primary.main', */
                opacity: 0.3,
                transition: 'all 0.3s ease-in-out'
              },
            }}
          >
            <Link>
              <Typography sx={{ color: "white" }}>Crear producto</Typography>
            </Link>

            {/* main: '#3A64D8' */}
            {/*  href={`/admin/product?slug=${newProduct}`}
        <Button
          startIcon={<AddOutlined />}
          color="secondary"
        >
          Crear producto
        </Button> */}
          </Box>
        </NextLink>
      </Box>
      {products[0]._id === "" ? (
        <FullScreenLoading />
      ) : (
        <Grid container className="fadeIn">
          <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          </Grid>
        </Grid>
      )}
    </AdminLayout>
  );
};

export default ProductsPage;
