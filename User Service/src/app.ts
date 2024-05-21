import express , { Express, Request, Response} from 'express';

const app:Express = express();
app.use(express.json())

const PORT = process.env.PORT || 3012;

app.get('/', (req:Request, res:Response) => {
    res.send('Hello World');
})

try {
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    })
} catch (error) {
    console.error(error);
}
