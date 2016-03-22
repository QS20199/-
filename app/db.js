// @usage: mod.update({title: 'world'}, {a:1});

var MongoClient = require('mongodb').MongoClient;
var dbConfig = require('../config/serverConfig.js').mongodb;
var assert = require("assert");
var mod = {};

mod.update = (selector, collectionName, data) => {
	MongoClient.connect(dbConfig.mongoUrl + dbConfig.dbName, (err, db) => {
		assert.equal(null, err);

		db.createCollection(collectionName, {
			safe: true
		}, (err, collection) => {
			assert.equal(null, err);
			// 新增数据
			// var tmp1 = {id:'1',title:'hello',number:1};
			// collection.insert(tmp1,{safe:true},(err, result) =>{
			//     console.log(result);
			// }); 

			// 更新数据
			collection.update(selector, {
				$set: data
			}, {
				safe: true,
				upsert: true
			}, (err, result) => {
				assert.equal(null, err);
			});

			collection.find().toArray((err, docs) => {
				console.log(docs);
			});

			//    删除数据
			//        collection.remove({title:'hello'},{safe:true},(err,result) =>{
			//           console.log(result);
			//       });

			// 查询数据
			// collection.find().toArray((err, docs) => {
			// 	console.log('find');
			// 	console.log(docs);
			// });
			// collection.findOne((err, doc) => {
			// 	console.log('findOne');
			// 	console.log(doc);
			// });
		});
		// //删除Collection
		// db.dropCollection('mycoll',{safe:true},(err,result) =>{
		//     if(err){
		//         console.logs('err:');
		//         console.log(err);
		//     }else{
		//         console.log('ok:');
		//         console.log(result);
		//     
		// }); 
	});
}


module.exports = mod;