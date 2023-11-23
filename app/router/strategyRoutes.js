const express=require('express');

const strategyRoutes=express.Router();

strategyRoutes.post('/v2/strategy/create');

strategyRoutes.get('/v2/strategy/');

strategyRoutes.put('/v2/strategy/');

strategyRoutes.delete('/v2/strategy/delete');

module.exports= strategyRoutes;