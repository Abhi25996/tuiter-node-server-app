import * as tuitsDao from '../../tuits/tuits-dao.js'

const createTuit = async (req, res) => {
    const tuits = await tuitsDao.findTuits()
    const newTuit = req.body;
    newTuit._id = (new Date()).getTime()+'';
    newTuit.likes = 0;
    newTuit.liked = false;
    newTuit.replies = 0;
    newTuit.retuits=0;
    newTuit.image = "spacex.png";
    newTuit.topic =  "Space";
    newTuit.time =  "2h";
    newTuit.username = "nasa"
    newTuit.handle="nasa"
    newTuit.title = newTuit.tuit.substring(0,newTuit.tuit.length>50? 50: newTuit.tuit.length)
    tuits.push(newTuit);
    const insertedTuit = await tuitsDao
        .createTuit(newTuit);
    res.json(insertedTuit);
}
const findTuits  = (req, res) => {
    res.json(tuits);
}


const updateTuit = async(req, res) => {
    const tuitdIdToUpdate = req.params.tid;
    const updates = req.body;
    const status = await tuitsDao
        .updateTuit(tuitdIdToUpdate,
            updates);
    res.sendStatus(200);
    res.json(status);

}
const deleteTuit = async(req, res) => {
    const tuitdIdToDelete = req.params.tid;
    const status = await tuitsDao
        .deleteTuit(tuitdIdToDelete);
    res.sendStatus(200);
    res.json(status);
}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}
