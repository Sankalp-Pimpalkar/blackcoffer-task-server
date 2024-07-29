import Data from "../model/data.model.js";

export async function Filter(req, res) {
    try {
        const { type } = req.query;

        const filterMapping = {
            topics: 'topic',
            sectors: 'sector',
            regions: 'region',
            pestles: 'pestle',
            sources: 'source',
            countries: 'country',
            end_year:'end_year',
        };

        if (!filterMapping[type]) {
            return res.status(400).json({
                success: false,
                message: "Invalid filter type"
            });
        }

        const field = filterMapping[type];

        const filterPipeline = [
            { $match: { [field]: { $ne: null, $ne: "" } } },
            { $group: { _id: null, filters: { $addToSet: `$${field}` } } },
            { $unwind: "$filters" },
            { $sort: { filters: 1 } },
            { $group: { _id: null, filters: { $push: "$filters" } } },
            { $project: { _id: 0, filters: 1 } }
        ];
        

        const filterResult = await Data.aggregate(filterPipeline);

        const filters = filterResult[0]?.filters || [];

        res.status(200).json({
            success: true,
            data: filters
        });

    } catch (error) {
        console.error("Failed to fetch filter", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch filter",
            error: error.message
        });
    }
}