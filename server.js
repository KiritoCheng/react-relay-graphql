var express = require('express');
var graphqlHTTP = require('express-graphql');
import path from 'path';
import webpack from 'webpack';
import webpackDevSercer from 'webpack-dev-server';
import { schema } from './data/schema';

const APP_PORT = 4000;


var cmd=process.platform=='win32'?'netstat -ano':'ps aux';
var exec = require('child_process').exec;

exec(cmd, function(err, stdout, stderr) {
    if(err){ return console.log(err); }
    
    stdout.split('\n').filter(function(line){        
        var p=line.trim().split(/\s+/); 
        var address=p[1];        

        if(address!=undefined){        
            if(address.split(':')[1]==APP_PORT)
            {                
                exec('taskkill /F /pid '+p[4],function(err, stdout, stderr){
                    if(err){
                        return console.log('释放指定端口失败！！');    
                    }
                    
                    console.log('占用指定端口的程序被成功杀掉！');
                });
            }
        }                          
    });
});

const compiler = webpack({
    mode: 'development',
    entry: ['whatwg-fetch', path.resolve(__dirname, 'js', 'app.js')],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /\/node_moduls\//,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    output: {
        path: '/',
        filename: 'app.js',
    },
});

const app = new webpackDevSercer(compiler, {
    contentBase: '/public/',
    publicPath: '/js/',
    stats: { colors: true },
});

app.use('/', express.static(path.resolve(__dirname, 'public')));


// // Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// // The root provides a resolver function for each API endpoint
// var root = {
//     hello: () => {
//         return 'Hello world!';
//     },
// };

app.use('/graphql', graphqlHTTP({
    schema: schema,
    pretty: true,
}));

app.listen(APP_PORT, () => {
    console.log(`Running a GraphQL API server at localhost:${APP_PORT}/graphql`);
});