import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import rootPath from 'app-root-path';

const app = express();

app.use(morgan('dev'));

app.use(cors());

console.log(rootPath.toString());

app.use(express.static(rootPath + '/data'));

app.listen(3142, (error) => {
  if (error) {
    console.log(error);
  }
  console.log('listening in port 3142');
});
