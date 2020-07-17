import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.static('data'));

app.listen(3142, (error) => {
  if (error) {
    console.log(error);
  }
  console.log('listening in port 3142');
});
