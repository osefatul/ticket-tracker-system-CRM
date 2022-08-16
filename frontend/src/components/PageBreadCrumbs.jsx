import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
function PageBreadCrumbs({ page }) {
  return (
    <Breadcrumbs aria-label="breadcrumb" className="pb-1">
      <Link className="text-[12px]" underline="hover" color="inherit" href="/">
        Home
      </Link>
      <Typography className="text-[12px]" style={{ fontSize: "12px" }} color="text.primary">
        {page}
      </Typography>
    </Breadcrumbs>
  );
}

export default PageBreadCrumbs;
