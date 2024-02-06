class ProductManager {
    constructor() {
      this.products = [];
      this.productIdCounter = 1;
    }
  
    addProduct({ title, description, price, thumbnail, code, stock }) {
      // Validar campos obligatorios
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        throw new Error("Todos los campos son obligatorios");
      }
  
      // Validar código único
      if (this.products.some(product => product.code === code)) {
        throw new Error("El código del producto ya está en uso");
      }
  
      const newProduct = {
        id: this.productIdCounter++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
  
      this.products.push(newProduct);
      return newProduct;
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
  
      if (!product) {
        throw new Error("Producto no encontrado");
      }
  
      return product;
    }
  }
  
  // Uso del ProductManager
  const productManager = new ProductManager();
  
  console.log(productManager.getProducts()); // []
  const newProduct = productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  });
  console.log(productManager.getProducts()); // [ { id: 1, title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'abc123', stock: 25 } ]
  
  // Intentar agregar el mismo producto debería arrojar un error
  try {
    productManager.addProduct({
      title: "producto prueba",
      description: "Este es un producto prueba",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 25,
    });
  } catch (error) {
    console.error(error.message); // El código del producto ya está en uso
  }
  
  // Obtener un producto por ID
  try {
    const foundProduct = productManager.getProductById(1);
    console.log(foundProduct); // { id: 1, title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'abc123', stock: 25 }
  } catch (error) {
    console.error(error.message);
  }
  
  // Intentar obtener un producto con un ID no existente debería arrojar un error
  try {
    productManager.getProductById(999);
  } catch (error) {
    console.error(error.message); // Producto no encontrado
  }
  