const Stats = require('./stats');
const Images = require('./images');
const Comments = require('./comments');

module.exports = async viewModel => {

    await Promise.all([
        Stats(),
        Images.popular(),
        Comments.newest()
    ]);

    viewModel.sidebar = {
        status: results[0],
        popular: results[1],
        comments: results[2]
    };

    return viewModel;
}