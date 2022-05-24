import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
function PageBreadCrumbs({ page }) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/">
        Home
      </Link>
      <Typography color="text.primary">{page}</Typography>
    </Breadcrumbs>
  );
}

export default PageBreadCrumbs;
