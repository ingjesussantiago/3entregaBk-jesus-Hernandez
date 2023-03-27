import express from "express"
import managerProducto from "./managerProducto.js"


const app = express()

const ManagerProducto = new managerProducto("./productos.json")


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get ("/", async (req,res) =>{
    res.send("bienvenidos inicio")
})

app.get("/producto", async (req, res) => {
    const productos = await ManagerProducto.getProduct()
    res.json({ productos })
})

app.post("/producto", async (req, res)=>{
    const producto=req.body
    const nuevoProducto= await ManagerProducto.addProduct(producto)
    res.json({message:"Prodcuto creado", producto:nuevoProducto})
})

app.get("/producto/:idProducto", async (req, res)=>{
    const {idProducto}=req.params
    const producto = await ManagerProducto.getProductoById(+idProducto)
    res.json({producto})
})

app.delete("/producto", async(req, res)=>{
    const message = await ManagerProducto.delateProduct()
    res.json({message})
})

app.delete("/producto/:idProducto",async(req, res)=>{
    const {idProducto} = req.params
    const message =await ManagerProducto.delateProductById(+idProducto)
    res.json({message})
})

app.put("/producto/:idProducto", async (req,res)=>{
    const {idProducto} =req.params
    const productoup=req.body
    const producto = await ManagerProducto.upDateProduc(+idProducto,productoup)
    res.json({producto})
})



app.listen(8080, () => {
    console.log("escuchando puerto");
})