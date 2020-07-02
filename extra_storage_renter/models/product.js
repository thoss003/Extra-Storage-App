// Characteristics of the product
class Product {
  constructor(id, ownerId, title, imageUrl, description, price,quantityNeeded,lat,lng) {
    this.id = id;
    //Userid who created the product
    this.ownerId = ownerId;
    this.imageUrl = imageUrl;
    this.title = title;
    this.description = description;
    this.price = price;
    this.quantityNeeded = quantityNeeded;
    this.lat = lat;
    this.lng = lng;
  }
}

export default Product;
