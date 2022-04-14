import React from "react";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function ItemCard(props) {
  return (
    <Grid item xs={12} md={4} lg={3} spacing={3}>
      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Product
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: 10000
          Discount: 10%
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">More</Button>
        <Button size="small">Add to Cart</Button>
      </CardActions>
    </Card>
    </Grid>
  );
}

export default ItemCard;
