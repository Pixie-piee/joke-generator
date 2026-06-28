import express from "express"
import axios from "axios"

const app=express();
const port=3000;
const apiUrl="https://v2.jokeapi.dev/joke/Any?type=single"

app.use(express.static("public"));

app.get("/", (req,res)=>{
    res.render("index.ejs",{
        content: "ckick on get joke to generate a joke, or you can look in the mirror aswell",
    });
});

app.get("/getjoke", async (req,res)=>{
    try{
        const result=await axios.get(apiUrl);
        res.render("index.ejs",{
            content : result.data.joke,
        });
    } catch (error) {
    console.log(error.response?.data);
    console.log(error.message);
    res.status(500).send("Failed to fetch a joke.");
}
});

app.listen(port,()=>{
    console.log(`server running... on port ${port}`);
}); 