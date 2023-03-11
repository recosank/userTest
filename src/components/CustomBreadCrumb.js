import React from "react";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

const CustomBreadCrumb = ({ crumbData }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{}}>
      {crumbData.map((val, key) => {
        return (
          <Link
            color={val.last ? "#49274a" : "inherit"}
            underline="hover"
            href={val.href}
            key={key}
          >
            {val.title}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default CustomBreadCrumb;
