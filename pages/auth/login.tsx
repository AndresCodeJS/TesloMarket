import { useState, useEffect, useContext } from "react";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import { redirect } from "react-router-dom";
/* import { signIn, getSession, getProviders } from "next-auth/react"; */

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { useForm } from "react-hook-form";

import { AuthLayout } from "../../components/layouts";
import { jwt, validations } from "../../utils";
import { useRouter } from "next/router";
import { AuthContext } from "../../context";
import Cookie from "js-cookie";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  
  const { loginUser } = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(false)


  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);

  /* const [providers, setProviders] = useState<any>({}); */

  useEffect(() => {
    console.log(router.query)
    if (Cookie.get("token")) {
      router.replace("/");
    }
  }, []);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    setIsLoading(true)
    const isValidLogin = await loginUser(email, password);
    if (!isValidLogin) {
      setIsLoading(false)
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    setIsLoading(false)
    // Todo: navegar a la pantalla que el usuario estaba
    const destination = router.query.p?.toString() || "/";
    router.replace(destination);
    /* await signIn('credentials',{ email, password }); */
  };

  if (Cookie.get("token")) {
    return <></>;
  }

  return (
    <AuthLayout title={"Ingresar"}>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Iniciar Sesión
              </Typography>
              <Chip
                label="No reconocemos ese usuario / contraseña"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="email"
                label="Correo"
                variant="filled"
                fullWidth
                {...register("email", {
                  required: "Este campo es requerido",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
                {...register("password", {
                  required: "Este campo es requerido",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
              >
                {isLoading?<CircularProgress/>:'Ingresar'}
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink
                href={
                  router.query.p
                    ? `/auth/register?p=${router.query.p}`
                    : "/auth/register"
                }
                passHref
              >
                <Link underline="always">¿No tienes cuenta?</Link>
              </NextLink>
            </Grid>

            {/*  <Grid
              item
              xs={12}
              display="flex"
              flexDirection="column"
              justifyContent="end"
            >
              <Divider sx={{ width: "100%", mb: 2 }} />
              {Object.values(providers).map((provider: any) => {
                if (provider.id === "credentials")
                  return <div key="credentials"></div>;

                return (
                  <Button
                    key={provider.id}
                    variant="outlined"
                    fullWidth
                    color="primary"
                    sx={{ mb: 1 }}
                    onClick={() => signIn(provider.id)}
                  >
                    {provider.name}
                  </Button>
                );
              })}
            </Grid> */}
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

/* export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { token = "" } = req.cookies;
  const { p = "/" } = query;

  try {
    console.log("ENTRA EN LA VALIDACION");
    console.log("el token es:", token);

    const { role } = await jwt.isValidToken(token);

    if (role) {
      return {
        redirect: {
          destination: p.toString(),
          permanent: false,
        },
      };
    }

  } catch (error) {
    console.log( error);
  } */

/*  const session = await getSession({ req }); */
// console.log({session});

/* const { p = '/' } = query;

    if ( session ) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    } */

/*   return {
    props: {},
  };
}; */

/* export const getServerSideProps: GetServerSideProps = async ({
    req,
    query,
  }) => {

    return {
        props: {},
      };

  } */

export default LoginPage;
