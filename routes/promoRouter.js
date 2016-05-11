
    var express = require('express');
    var bodyParser = require('body-parser');
    var mongoose = require('mongoose');

    var Promotiones = require('../models/promotion');
    var promoRouter = express.Router();
         
        promoRouter.use(bodyParser.json());
    
        promoRouter.route('/')
        /*.all(function(req,res,next) {
              res.writeHead(200, { 'Content-Type': 'text/plain' });
              next();
        })*/

        .get(function(req,res,next){
              //res.end('Will send all the promotions to you!');
              Promotiones.find({}, function (err, promo) {
               if (err) throw err;
               res.json(promo);
              }); 
        })

        .post(function(req, res, next){
            //res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);  
            Promotiones.create(req.body, function (err, promo) {
               if (err) throw err;
               console.log('Promotion created!');
               var id = promo._id;

               res.writeHead(200, {
                  'Content-Type': 'text/plain'
               });
               res.end('Added the promotion with id: ' + id);
            });
        })

        .delete(function(req, res, next){
                //res.end('Deleting all promotions');
                Promotiones.remove({}, function (err, promo) {
                    if (err) throw err;
                     res.json(promo);
                }); 
        });

        promoRouter.route('/:promoId')
        /*.all(function(req,res,next) {
              res.writeHead(200, { 'Content-Type': 'text/plain' });
              next();
        })*/

        .get(function(req,res,next){
                //res.end('Will send details of the promotion: ' + req.params.promoId +' to you!');
                Promotiones.findById(req.params.promoId, function (err, promo) {
                  if (err) throw err;
                  res.json(promo);
                });
        })

        .put(function(req, res, next){
                //res.write('Updating the promotion: ' + req.params.promoId + '\n');
                //res.end('Will update the promotion: ' + req.body.name + 
                //     ' with details: ' + req.body.description);
                 Promotiones.findByIdAndUpdate(req.params.promoId, {
                     $set: req.body
                 }, {
                     new: true
                 }, function (err, promo) {
                      if (err) throw err;
                      res.json(promo);
                 });
        })

        .delete(function(req, res, next){
                //res.end('Deleting promotion: ' + req.params.promoId);
                Promotiones.findByIdAndRemove(req.params.promoId, function (err, promo) {
                  if (err) throw err;
                  res.json(promo);
                });
        });
    //express().use('/dishes',dishRouter);
    
  module.exports = promoRouter;