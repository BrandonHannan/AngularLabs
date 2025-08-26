module.exports = {
    listen: function(app, express, http, port){
        app.use(express.static(__dirname + '/'));
        http.listen(port, () => {
            console.log('Server is listening on PORT: ' + port);
        });
    }
}