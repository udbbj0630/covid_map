import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function CaseCard(props) {
  return (
    <Card sx={{ minWidth: 200 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.title}
        </Typography>
        <Typography variant="h5" component="div">
          {props.subTitle}
        </Typography>
        <Typography variant="body2">Confirmed: {props.confirmed}</Typography>
        <Typography variant="body2">Deahts:{props.death}</Typography>
      </CardContent>
    </Card>
  );
}
