export class Coffee {
  id: string;
  name: string;
  brand: string;
  flavors: string[];

  constructor(id: string, name: string, brand: string, flavors: string[]) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.flavors = flavors;
  }
}
