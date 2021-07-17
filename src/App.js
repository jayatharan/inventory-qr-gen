import React,{useState} from 'react'
import axios from 'axios'
import QRCode from "react-qr-code";

import { Container, Form, InputGroup, Button, FormGroup, FormControl } from 'react-bootstrap'

function App() {
    const [domain,setDomain] = useState("")
    const [products,setProducts] = useState([])
    const [productId,setProductId] = useState("")

    const getProducts = ()=>{
        axios({
            method: "GET",
            url: `${domain}/product`
        }).then((response) => {
            setProducts(response.data)
        })
    }

    return (
        <Container>
            <div className="w-100">
                <h5>Qr Generator</h5>
                <InputGroup className="mb-1">
                    <FormControl
                    value={domain}
                    onChange={(e)=>setDomain(e.target.value)}
                    size="sm"
                    placeholder="Domain name"
                    />
                    <InputGroup.Append>
                    <Button size="sm" variant="outline-secondary" onClick={getProducts} >Get Products</Button>
                    </InputGroup.Append>
                </InputGroup>
                <div>
                    <Form.Control size="sm" type="text" value={productId} onChange={(e)=>setProductId(e.target.value)}  placeholder="Product ID" />
                </div>
                <div>
                    <Form.Group className="mt-1">
                        <Form.Control size="sm" as="select" value={productId} onChange={(e)=>setProductId(e.target.value)}>
                        <option></option>
                        {products.map((product, idx) => (
                            <option key={idx} value={product._id}>{product.name}</option>
                        ))}
                        </Form.Control>
                    </Form.Group>
                </div>
                <div className="mt-3 d-flex justify-content-center">
                    <QRCode value={productId} />
                </div>
            </div>
        </Container>
    )
}

export default App
