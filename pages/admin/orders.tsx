import { ConfirmationNumberOutlined } from "@mui/icons-material";
import { Chip, Grid, Link } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import useSWR from "swr";

import { AdminLayout } from "../../components/layouts";
import { FullScreenLoading } from "../../components/ui";
import { useOrders } from "../../hooks/useOrders";
import { IOrder, IUser } from "../../interfaces";
import NextLink from "next/link";

const columns: GridColDef[] = [
  { field: "id", headerName: "Orden ID", width: 250 },
  { field: "email", headerName: "Correo", width: 250 },
  { field: "name", headerName: "Nombre Completo", width: 300 },
  { field: "total", headerName: "Monto total", width: 300 },
  {
    field: "isPaid",
    headerName: "Pagada",
    renderCell: ({ row }: GridRenderCellParams) => {
      return row.isPaid ? (
        <Chip variant="outlined" label="Pagada" color="success" />
      ) : (
        <Chip variant="outlined" label="Pendiente" color="error" />
      );
    },
  },
  {
    field: "noProducts",
    headerName: "No.Productos",
    align: "center",
    width: 150,
  },
  {
    field: "check",
    headerName: "Ver orden",
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink href={`/orders?p=${params.row.orderId}`} passHref>
          <Link underline="always">Ver orden</Link>
        </NextLink>
      );
    },
  },
  { field: "createdAt", headerName: "Creada en", width: 300 },
];

{
  /* <a href={`/orders?p=${row.id}`} target="_blank" rel="noreferrer">
          Ver orden
        </a> */
}
const OrdersPage = () => {
  /* const { data, error } = useSWR<IOrder[]>('/api/admin/orders'); */

  const [orders, getOrders] = useOrders(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/all`
  );

  /* if ( !data && !error ) return (<></>); */

  const rows = orders!.map((order, idx) => ({
    id: idx + 1,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.total,
    isPaid: order.isPaid,
    noProducts: order.numberOfItems,
    createdAt: order.createdAt,
    orderId: order._id,
  }));

  /*  if (orders[0]?.orderItems[0]?._id === "") {
    console.log("Pantalla de login", orders);
    return <FullScreenLoading />;
  } */

  return (
    <AdminLayout
      title={"Ordenes"}
      subTitle={"Mantenimiento de ordenes"}
      icon={<ConfirmationNumberOutlined />}
    >
      {orders[0]?.orderItems[0]?._id === "" ? (
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

export default OrdersPage;
