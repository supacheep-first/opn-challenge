import { Injectable } from '@nestjs/common';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartsService {
  private discountCode = [
    {
      code: 'DISCOUNT200',
      discritpion: {
        value: 200,
        type: 'amount',
        maxDiscount: 200,
      },
    },
    {
      code: 'DISCOUNTP10',
      discritpion: {
        value: 10,
        type: 'percent',
        maxDiscount: 100,
      },
    },
  ];

  private carts: Array<{
    id: number;
    status: string;
    products: Array<{
      id: number;
      productName: string;
      price: number;
      variant: {
        productId: number;
        value: string;
        quantity: number;
      };
    }>;
    uniqueItems: number;
    price: number;
    discountCode?: string;
  }> = [];

  private freebieItem = {
    id: 99,
    productName: 'Product freebieItem',
    price: 0,
    variant: {
      productId: 99,
      value: 'XL',
      quantity: 1,
    },
  };

  private freebieConditions = {
    productIds: [1, 2, 3],
  };

  create() {
    this.unActiveCarts();
    const newCart = {
      id: this.carts.length + 1,
      status: 'active',
      products: [],
      uniqueItems: 0,
      price: 0,
    };
    this.carts.push(newCart);
    return newCart;
  }

  saveProduct(updateCartDto: UpdateCartDto) {
    let cart = this.carts.findLast((cart) => cart.status === 'active');
    if (!cart) {
      cart = this.create();
    }
    for (const product of updateCartDto.products) {
      if (!cart.products) {
        cart.products = [];
      }

      // chekc duplicate product
      const duplicateProduct = cart.products.find((p) => p.id === product.id);

      if (duplicateProduct) {
        duplicateProduct.variant.quantity += product.variant.quantity;
        duplicateProduct.price += product.price;
      } else {
        cart.products.push(product);
        this.applyFreebieItem();
      }
      cart.price = this.calPrice(cart.products);
      cart.uniqueItems = cart.products.length;
    }
    cart.discountCode = updateCartDto.discountCode;
    this.applyDiscount();
    return `Product added to cart ${cart.id}`;
  }

  findAll() {
    return this.carts;
  }

  findActiveCart() {
    return this.carts.find((cart) => cart.status === 'active');
  }

  findOne(id: number) {
    return this.carts.find((cart) => cart.id === id);
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    const cart = this.carts.find((cart) => cart.id === id);
    if (cart) {
      Object.assign(cart, updateCartDto);
    }
    return cart;
  }

  remove(id: number) {
    const cartIndex = this.carts.findIndex((cart) => cart.id === id);
    if (cartIndex !== -1) {
      this.carts.splice(cartIndex, 1);
      return `Cart ${id} removed successfully`;
    }
    return `Cart ${id} not found`;
  }

  removeProduct(id: number) {
    const cart = this.carts.find((cart) => cart.status === 'active');
    if (cart) {
      const productIndex = cart.products.findIndex(
        (product) => product.id === id,
      );
      if (productIndex !== -1) {
        cart.products.splice(productIndex, 1);
        cart.price = this.calPrice(cart.products);
        this.applyDiscount();
        this.applyFreebieItem();
        cart.uniqueItems = cart.products.length;
        return `Product ${id} removed successfully`;
      }
      return `Product ${id} not found`;
    }
    return 'Cart not found';
  }

  private unActiveCarts() {
    return this.carts.map((cart) => {
      if (cart.status === 'active') {
        cart.status = 'inactive';
      }
      return cart;
    });
  }

  private calPrice(products: Array<{ price: number }>) {
    return products.reduce((acc, product) => acc + product.price, 0);
  }

  private applyDiscount() {
    const cart = this.carts.find((cart) => cart.status === 'active');
    if (cart) {
      const discount = this.discountCode.find(
        (discount) => discount.code === cart.discountCode,
      );
      if (discount) {
        if (discount.discritpion.type === 'amount') {
          cart.price -= discount.discritpion.value;
        } else {
          const discountValue = (cart.price * discount.discritpion.value) / 100;
          console.log(discountValue);
          console.log(discount.discritpion.maxDiscount);
          if (discountValue > discount.discritpion.maxDiscount) {
            cart.price -= discount.discritpion.maxDiscount;
          } else {
            cart.price -= discountValue;
          }
        }
      }

      if (cart.price < 0) {
        cart.price = 0;
      }
    }
  }

  private applyFreebieItem() {
    const cart = this.carts.find((cart) => cart.status === 'active');
    if (cart) {
      const freebieExists = cart.products.some((product) =>
        this.freebieConditions.productIds.includes(product.id),
      );
      if (freebieExists) {
        cart.products.push(this.freebieItem);
        cart.uniqueItems = cart.products.length;
      } else {
        const freebieIndex = cart.products.findIndex(
          (product) => product.id === this.freebieItem.id,
        );
        if (freebieIndex !== -1) {
          cart.products.splice(freebieIndex, 1);
          cart.uniqueItems = cart.products.length;
        }
      }
    }
  }
}
