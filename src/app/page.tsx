import PageContent from "./components/PageContent";
import SideBarMenu from "./components/SideBarMenu";
import styles from "./page.module.css";
import { Container, Typography, Box } from "@mui/material";

export default function Home() {
  return (
    <main>
      <Box sx={{ bgcolor: "snow", display: "flex", p: 0, m: 0 }}>
        <SideBarMenu></SideBarMenu>
        <Container sx={{ height: "100vh" }}>
          <PageContent></PageContent>
        </Container>
      </Box>
    </main>
  );
}
