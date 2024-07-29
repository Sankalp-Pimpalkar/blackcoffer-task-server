import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { app } from './constants.js';
import connectDB from './db/index.js';
import { Filter } from './controllers/filters.controllers.js';
import { BarChart, CountryMap, LineChart, PieChart, ScatterChart, Table } from './controllers/charts.controllers.js';

app.use(cors())

// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!')
})

app.get('/api/filter', Filter);
app.get('/api/table', Table);
app.get('/api/barchart', BarChart);
app.get('/api/linechart', LineChart);
app.get('/api/piechart', PieChart);
app.get('/api/scatterchart', ScatterChart);
app.get('/api/countrychart', CountryMap);

connectDB();