import Data from "../model/data.model.js";

export async function Table(req, res) {
    try {
        const response = await Data.find({});

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        console.error("Failed to fetch data", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch data",
            error: error.message
        });
    }
}

export async function BarChart(req, res) {
    try {
        const result = await Data.aggregate([
            {
                $match: {
                    pestle: { $ne: "" },
                    intensity: { $ne: "" }
                }
            },
            {
                $group: {
                    _id: { pestle: "$pestle", intensity: "$intensity" },
                }
            },
            {
                $limit: 7
            },
            {
                $project: {
                    _id: 0,
                    pestle: "$_id.pestle",
                    intensity: "$_id.intensity"
                }
            }
        ])

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        console.error("Failed to Bar Chart Data", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to Bar Chart Data",
            error: error.message
        });
    }
}

export async function LineChart(req, res) {
    try {
        const { from, to } = req.query;

        const fromYear = parseInt(from) || 2000;
        const toYear = parseInt(to) || 2050;

        const response = await Data.aggregate([
            {
                $match: {
                    start_year: { $gte: fromYear, $lte: toYear }
                }
            },
            {
                $group: {
                    _id: { start_year: "$start_year", likelihood: "$likelihood" },
                },
            },
            {
                $project: {
                    _id: 0,
                    start_year: "$_id.start_year",
                    likelihood: "$_id.likelihood"
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: response
        });

    } catch (error) {
        console.error("Failed to get Line Chart Data", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to get Line Chart Data",
            error: error.message
        });
    }
}


export async function PieChart(req, res) {
    try {
        const response = await Data.aggregate([
            {
                $match: {
                    sector: { $ne: "" }
                }
            },
            {
                $group: {
                    _id: { sector: "$sector" },
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $limit: 8
            },
            {
                $project: {
                    _id: 0,
                    count: 1,
                    sector: "$_id.sector"
                }
            }
        ])

        res.status(200).json({
            success: true,
            data: response
        });

    } catch (error) {
        console.error("Failed to Bar Chart Data", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to Bar Chart Data",
            error: error.message
        });
    }
}

export async function ScatterChart(req, res) {
    try {
        const response = await Data.aggregate([
            {
                $group: {
                    _id: { intensity: "$intensity", relevance: "$relevance" }
                }
            },
            {
                $project: {
                    _id: 0,
                    intensity: "$_id.intensity",
                    relevance: "$_id.relevance"
                }
            }
        ])

        res.status(200).json({
            success: true,
            data: response
        });

    } catch (error) {
        console.error("Failed to Bar Chart Data", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to Bar Chart Data",
            error: error.message
        });
    }
}

export async function CountryMap(req, res) {
    try {
        const response = await Data.aggregate([
            {
                $group: {
                    _id: { country: "$country" },
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    count: 1,
                    _id: 0,
                    country: "$_id.country"
                }
            }
        ])

        res.status(200).json({
            success: true,
            data: response
        });

    } catch (error) {
        console.error("Failed to Bar Chart Data", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to Bar Chart Data",
            error: error.message
        });
    }
}