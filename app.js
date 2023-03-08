const express = require('express');
const prisma_client = require('@prisma/client')

const app = express();
const prisma = new prisma_client.PrismaClient()
const urlencodedParser = express.urlencoded({extended: false});

app.get('/', (req, res) => {
    res.send('<h1>Its working!</h1>');
});

app.get('/users/list/', async (req, res) => {
    const all_users = await prisma.user.findMany()
    res.json(all_users)
})

app.get("/user/create", (req, res) => {
    res.sendFile(__dirname + "/templates/create_user.html");
});

app.post('/user/create/', urlencodedParser, async (req, res) => {
    if(!req.body) return res.sendStatus(400);
    await prisma.user.create({
        data: {
            name: req.body.userName,
            email: req.body.userEmail,
            posts: {
                create: { title: 'Hello World' },
            },
            profile: {
                create: { bio: 'I like turtles' },
            },
        }
    });
    const user = prisma.user.findMany({
        where: {
            email: {
                equals: req.body.userEmail,
            },
            name: {
                equals: req.body.userName,
            },
        }
    });
    res.send(`${req.body.userName} - ${req.body.userEmail}`)
    res.json(user);
})


app.listen(3000, () => {
    console.log("App running on port 3000...");
    console.log("Url: http://127.0.0.1:3000")
});
