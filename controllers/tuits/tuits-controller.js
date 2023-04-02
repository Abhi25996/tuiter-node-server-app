import posts from "./tuits.js";
let tuits = posts;

const createTuit = (req, res) => {
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
    res.json(newTuit);
}
const findTuits  = (req, res) => {
    res.json(tuits);
}


const updateTuit = (req, res) => {
    const tuitdIdToUpdate = req.params.tid;
    const updates = req.body;
    const tuitIndex = tuits.findIndex(
        (t) => t._id === tuitdIdToUpdate)
    tuits[tuitIndex] =
        {...tuits[tuitIndex], ...updates};
    res.sendStatus(200);
}
const deleteTuit = (req, res) => {
    const tuitdIdToDelete = req.params.tid;
    tuits = tuits.filter((t) =>
        t._id !== tuitdIdToDelete);
    res.sendStatus(200);
}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}
